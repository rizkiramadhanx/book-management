import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBook = async (req, res) => {
  const { title, authorId, categoryId, genreId } = req.body;
  console.log(title, authorId, categoryId, genreId);
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author: { connect: { id: Number(authorId) } },
        category: { connect: { id: Number(categoryId) } },
        genre: { connect: { id: Number(genreId) } },
      },
    });
    res.status(201).json({
      message: "Book created successfully",
      status: 201,
      data: book,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create book",
      status: 500,
      data: null,
      error: error,
      meta: { count: 0 },
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        category: true,
        genre: true,
      },
    });
    res.json({
      message: "Books fetched successfully",
      status: 200,
      data: books,
      meta: { count: books.length },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        category: true,
        genre: true,
      },
    });
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        status: 404,
        data: null,
        meta: { count: 0 },
      });
    }
    res.json({
      message: "Book fetched successfully",
      status: 200,
      data: book,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch book",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, authorId, categoryId, genreId } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author: { connect: { id: Number(authorId) } },
        category: { connect: { id: Number(categoryId) } },
        genre: { connect: { id: Number(genreId) } },
      },
    });
    res.json({
      message: "Book updated successfully",
      status: 200,
      data: book,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      message: "Book deleted successfully",
      status: 200,
      data: null,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};
