const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const collection = () => getDB().collection("books");

// CREATE
exports.addBook = async (req, res) => {
  const book = req.body;

  if (book.availableCopies < 0) {
    return res.status(400).json({ message: "Negative stock not allowed" });
  }

  await collection().insertOne(book);
  res.status(201).json(book);
};

// READ – all books
exports.getAllBooks = async (req, res) => {
  const books = await collection().find().toArray();
  res.json(books);
};

// READ – by category
exports.getByCategory = async (req, res) => {
  const books = await collection()
    .find({ category: req.params.category })
    .toArray();
  res.json(books);
};

// READ – published after 2015
exports.getAfter2015 = async (req, res) => {
  const books = await collection()
    .find({ publishedYear: { $gt: 2015 } })
    .toArray();
  res.json(books);
};

// UPDATE – increase/decrease copies
exports.updateCopies = async (req, res) => {
  const { change } = req.body;
  const book = await collection().findOne({ _id: new ObjectId(req.params.id) });

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies + change < 0) {
    return res.status(400).json({ message: "Negative stock not allowed" });
  }

  await collection().updateOne(
    { _id: book._id },
    { $inc: { availableCopies: change } }
  );

  res.json({ message: "Copies updated" });
};

// UPDATE – change category
exports.updateCategory = async (req, res) => {
  const result = await collection().updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { category: req.body.category } }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({ message: "Category updated" });
};

// DELETE – only if copies = 0
exports.deleteBook = async (req, res) => {
  const book = await collection().findOne({ _id: new ObjectId(req.params.id) });

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies !== 0) {
    return res.status(400).json({ message: "Cannot delete book with copies" });
  }

  await collection().deleteOne({ _id: book._id });
  res.json({ message: "Book deleted" });
};
