import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

// imports

// Create a new Express application
const app = express();

// Set up the middleware
app.use(bodyParser.json());

// Initialize an empty array to store items
let books = [];

// Create Operation: Set up a POST route that adds a new item to the array
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and Author are required' });
    }

    const newBook = {
        id: uuidv4(), // Generate a unique identifier for each book
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});


// Read Operation: Set up a GET route that returns all items in the array

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Update Operation: Set up a PUT route that updates an existing item in the array

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = books.find(book => book.id === id);
    if (book) {
        if (title) {
            book.title = title;
        }
        if (author) {
            book.author = author;
        }
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Delete Operation: Set up a DELETE route that removes an existing item from the array

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    if (book) {
        books = books.filter(book => book.id!== id);
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


