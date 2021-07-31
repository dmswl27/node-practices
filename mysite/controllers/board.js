const models = require('../models');
const moment = require('moment');
const Sequelize = require('sequelize');
const User = require('../models/User');

module.exports = {
    list: async function (req, res, next) {
        let page = req.params.pageNum;
        let totalCount = await models.Board.findAll({
            raw: true,
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('no')), 'totalCount']
            ],
        });
        totalCount = totalCount[0].totalCount;
        let countBoard= 10;                                                     // 글 10개 뽑음
        let countPage = 5;                                                     // 페이지 5개만 보이게
        let totalPage = Math.ceil(totalCount / countBoard);                      // 전체 페이지 개수
        let startCount = Number((page - 1)) * countBoard;                                     // 쿼리 limit에서 사용할 startCount  
        let endCount = page * countBoard;                                         // 쿼리 limit에서 사용할 endCount      ex) limit startCount, endCount
        let firstPageNo = parseInt((parseFloat((page / 10 + 0.9))) - 1) * countBoard + 1;      // 첫 페이지 번호
        let lastPageNo = totalPage;                                             // 마지막 페이지 번호
        let currentPageNo = page;                                              // 현재 페이지
        if (lastPageNo > firstPageNo + 10 - 1) {                                  // 마지막 페이지 번호를 설정해줌 
            lastPageNo = firstPageNo + 10 - 1;
        }
        try { 
            const results = await models.Board.findAll({
                raw: true,
                include: {
                    raw: true,
                    model: models.User, 
                    required: true,
                    attributes: ['no', 'name']
                },
                order: [
                    ['groupNo', 'DESC'],
                    ['orderNo', 'ASC']
                ],
                offset: startCount,
                limit: countBoard
            });
            // console.log(results);
            // console.log(results[0]['User.name']);  // user의 속성 가져오기 
            const pagination = { totalCount, totalPage, startCount, endCount, firstPageNo, lastPageNo, currentPageNo, countPage, countBoard, currentPageNo, page }
            res.render('board/list', {
                board: results,
                pagination : pagination, 
                moment : moment
            });

        } catch(e) {
            next(e);
        }   
         
    },
    write: function (req, res, next) {
        res.render('board/write');
    },
    _write: async function (req, res, next) {
        console.log(req.session.authUser.no);
        try{
            const maxGroupNo = await models.Board.max("group_no");
            const data = Object.assign(req.body,{
                userNo: req.session.authUser.no,
                groupNo: maxGroupNo + 1,
                hit: 0,
                orderNo: 0,
                depth: 0
            });

            const board = await models.Board.create(data);
            console.log(board);

            res.redirect('/board/1');
        } catch (err){
            next(err);
        }
    },
    view: async function (req, res, next) {
        try {
            const results = await models.Board.findOne({
                raw: true,
                attributes : ['title', 'contents', 'no', 'hit'],
                where : {
                   no : req.params.no
                }
            });

            await models.Board.update({
                hit : results.hit +1
                }, {
                where: {
                        no: req.params.no
                    } 
            })
            res.render('board/view', {
                board : results
            });

        } catch (err) {
            next(err);
        }
        
    },
    modify: async function (req,res, next) {
        const results = await models.Board.findOne({
            attributes : ['title', 'contents', 'no'],
                where : {
                   no : req.params.no
                }
        });
        res.render('board/modify', {
            board : results
        });
    },
    _modify: async function (req,res, next) {
        const result = await models.Board.update({
            title: req.body.title,
            contents: req.body.contents,
        },{ where: {no: req.params.no} });
        console.log(result);
        res.redirect('/board/1');
    },
    delete: async function (req, res, next) {
        try { 
            await models.Board.destroy({
                where: {
                    no : req.params.no
                }
            });
            res.redirect('/board/1');
        } catch(e) {
            next(e);
        }   
    },
    comment : async function (req, res, next) {
        const results = await models.Board.findOne({
            attributes : ['no'],
                where : {
                   no : req.params.no
                }
        });
        res.render('board/comment', {
            board : results
        });
    },
    _comment: async function (req, res, next) {
        console.log(req.session.authUser.no);
        try{
            const results = await models.Board.findOne({
                raw : true,
                attributes : ['groupNo', 'orderNo', 'depth'],
                where : {
                    no : req.params.no
                }
            });
            const data = Object.assign(req.body,{
                userNo: req.session.authUser.no,
                groupNo: results.groupNo,
                hit: 0,
                orderNo: results.orderNo +1,
                depth: results.depth +1
            });

            const board = await models.Board.create(data);

            res.redirect('/board/1');
        } catch (err){
            next(err);
        }
    }
}
