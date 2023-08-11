/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { Book } = require('../model');

const BookModel = require('../model').Book

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      BookModel.find()
      .then(data => {
        if(!data) {
          res.json({});
        }
        else {
          res.json(data);
        }
      })
      
    })
    
    .post(async function (req, res){
      let title = req.body.title;

      if(!title) {
        res.json('missing required field title')
      }
      else {
        let newBook = await BookModel.create({title: title});

        res.json({ _id: newBook._id, title: newBook.title });
      }
      
    })
    
    .delete(function(req, res){
      BookModel.deleteMany({})
      .then(data => {
        res.json('complete delete successful')
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      BookModel.findById(bookid)
      .then(data => {
        if(!data) {
          res.json('no book exists')
        }
        else {
          res.json(data)
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment) {
        res.json('missing required field comment')
      }
      else {
        BookModel.findByIdAndUpdate(bookid, {$inc: {commentcount: 1}, $push: {comments: comment}}, {new: true})
        .then(data => {
          if(!data) {
            res.json('no book exists')
          }
          else {
            res.json(data)
          }
        })
      }
      
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      BookModel.findByIdAndDelete(bookid)
      .then(data => {
        if(!data) {
          res.json('no book exists');
        }
        else {
          res.json('delete successful')
        }
      })
    });
  
};
