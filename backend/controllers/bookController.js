const Book = require("../models/Book");

// GET all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD book
exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

// FILTER by category
exports.getByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AFTER 2015
exports.getAfter2015 = async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: { $gt: 2015 } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE copies
exports.updateCopies = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.availableCopies += req.body.change;
    if (book.availableCopies < 0)
      return res.status(400).json({ message: "Negative stock not allowed" });

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { category: req.body.category },
      { new: true }
    );
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies !== 0)
      return res.status(400).json({ message: "Copies must be zero to delete" });

    await book.deleteOne();
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
