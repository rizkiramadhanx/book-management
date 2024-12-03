import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "./controller/category.controller.js";

import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./controller/book.controller.js";

import { authenticate } from "./middleware/auth.js";
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
} from "./controller/genre.controller.js";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "./controller/author.controller.js";
import { login, register } from "./controller/user.controller.js";

const app = express();

const router = express.Router();

// category
app.use("/category", authenticate);
router.post("/category", createCategory);
router.get("/category", getAllCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

// book
app.use("/book", authenticate);
router.post("/book", createBook);
router.get("/book", getAllBooks);
router.get("/book/:id", getBookById);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

// genre
app.use("/genre", authenticate);
router.post("/genre", createGenre);
router.get("/genre", getAllGenres);
router.get("/genre/:id", getGenreById);
router.put("/genre/:id", updateGenre);
router.delete("/genre/:id", deleteGenre);

// author
app.use("/author", authenticate);
router.post("/author", createAuthor);
router.get("/author", getAllAuthors);
router.get("/author/:id", getAuthorById);
router.put("/author/:id", updateAuthor);
router.delete("/author/:id", deleteAuthor);

// user
app.use("/auth", authenticate);
router.post("/auth/register", register);
router.post("/auth/login", login);
// server
const PORT = process.env.PORT || 3000;

router.get("/", (req, res) => res.send("Hello World!"));
app.use(express.json()); // Parse JSON request bodies
app.use(router); // Use the router for handling requests

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
