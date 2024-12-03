import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json({
      message: "Category created successfully",
      status: 201,
      data: category,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create category",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json({
      message: "Categories fetched successfully",
      status: 200,
      data: categories,
      meta: { count: categories.length },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        status: 404,
        data: null,
        meta: { count: 0 },
      });
    }
    res.json({
      message: "Category fetched successfully",
      status: 200,
      data: category,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch category",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json({
      message: "Category updated successfully",
      status: 200,
      data: category,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update category",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      message: "Category deleted successfully",
      status: 200,
      data: null,
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
      status: 500,
      data: null,
      meta: { count: 0 },
    });
  }
};
