const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
});

const Book = mongoose.model('Book', bookSchema);


// Initialize Sample Data
router.post('/initialize', async (req, res) => {
  const sampleBooks = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960 },
    { title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
  ];

  try {
    await Book.insertMany(sampleBooks);
    res.json({ message: 'Sample books added to MongoDB' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to initialize sample data' });
  }
});

// Get Titles of All Books
router.get('/titles', async (req, res) => {
  try {
    const books = await Book.find({}, { title: 1, _id: 0 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book titles' });
  }
});

// Get Books by Author
router.get('/author/:author', async (req, res) => {
  const { author } = req.params;
  try {
    const books = await Book.find({ author });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books by author' });
  }
});

// Update Book Genre
router.put('/update-genre', async (req, res) => {
  try {
    await Book.updateOne({ title: '1984' }, { genre: 'Science Fiction' });
    res.json({ message: 'Book genre updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book genre' });
  }
});

// Delete a Book
router.delete('/delete', async (req, res) => {
  try {
    await Book.deleteOne({ title: 'The Hobbit' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;
