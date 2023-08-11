const mongoose = require("mongoose");
const { Schema } = mongoose;


const bookSchema = new Schema({
    title: {type: String, required: true},
    commentcount: {type: Number, default: 0},
    comments: [String]

  });
  
  let Book = mongoose.model("Book", bookSchema);
  
  exports.Book = Book;