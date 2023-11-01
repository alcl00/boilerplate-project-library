/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const BookModel = require("../model").Book;

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      BookModel.find().then((data) => {
        res.json(data || {});
      });
    })

    .post(async function (req, res) {
      let title = req.body.title;
      if (!title) {
        res.json("missing required field title");
        return;
      }
      let newBook = await BookModel.create({ title: title });

      res.json({ _id: newBook._id, title: newBook.title });
    })

    .delete(function (req, res) {
      BookModel.deleteMany({}).then((data) => {
        res.json("complete delete successful");
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      BookModel.findById(bookid).then((data) => {
        res.json(data || "no book exists");
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        res.json("missing required field comment");
        return;
      }
      BookModel.findByIdAndUpdate(
        bookid,
        { $inc: { commentcount: 1 }, $push: { comments: comment } },
        { new: true }
      ).then((data) => {
        res.json(data || "no book exists");
      });
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      BookModel.findByIdAndDelete(bookid).then((data) => {
        if (!data) {
          res.json("no book exists");
          return;
        }
        res.json("delete successful");
      });
    });
};
