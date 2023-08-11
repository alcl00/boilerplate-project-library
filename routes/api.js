/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const BookModel = require('../model').Book

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      res.json({});
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      res.json({});
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      res.json({});
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      res.json({})
      //If ID invalid:
      //res.json('no book exists')
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      res.json({})
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      res.json({})
    });
  
};
