import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAuthor = async (req, res) => {
  const { name, bio } = req.body;
  try {
    const author = await prisma.author.create({
      data: { name, bio },
    });
    res.status(201).json({
      message: "Author created successfully",
      status: 201,
      data: author,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create author",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json({
      message: "Authors fetched successfully",
      status: 200,
      data: authors,
      meta: { count: authors.length },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch authors",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id: parseInt(id) },
    });
    if (!author) {
      return res.status(404).json({
        message: "Author not found",
        status: 404,
        data: null,
        meta: { count: 0 },
      });
    }
    res.json({
      message: "Author fetched successfully",
      status: 200,
      data: author,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch author",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    const author = await prisma.author.update({
      where: { id: parseInt(id) },
      data: { name, bio },
    });
    res.json({
      message: "Author updated successfully",
      status: 200,
      data: author,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update author",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.author.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      message: "Author deleted successfully",
      status: 200,
      data: null,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete author",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};
