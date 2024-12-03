import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const genre = await prisma.genre.create({
      data: { name },
    });
    res.status(201).json({
      message: "Genre created successfully",
      status: 201,
      data: genre,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create genre",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const getAllGenres = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany();
    res.json({
      message: "Genres fetched successfully",
      status: 200,
      data: genres,
      meta: { count: genres.length },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch genres",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await prisma.genre.findUnique({
      where: { id: parseInt(id) },
    });
    if (!genre) {
      return res.status(404).json({
        message: "Genre not found",
        status: 404,
        data: null,
        meta: { count: 0 },
      });
    }
    res.json({
      message: "Genre fetched successfully",
      status: 200,
      data: genre,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch genre",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const genre = await prisma.genre.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json({
      message: "Genre updated successfully",
      status: 200,
      data: genre,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update genre",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.genre.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      message: "Genre deleted successfully",
      status: 200,
      data: null,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete genre",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};
