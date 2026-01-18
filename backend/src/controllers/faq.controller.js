import FAQ from "../models/faq.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import sequelize from "../db/index.js";

const getAllFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.findAll({
    where: { isActive: true },
    order: [['category', 'ASC'], ['createdAt', 'DESC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, faqs, "FAQs fetched successfully"));
});

const getAllFAQsAdmin = asyncHandler(async (req, res) => {
  const faqs = await FAQ.findAll({
    order: [['category', 'ASC'], ['createdAt', 'DESC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, faqs, "All FAQs fetched successfully for admin"));
});

const getFAQById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const faq = await FAQ.findByPk(id);

  if (!faq) {
    throw new ApiError(404, "FAQ not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, faq, "FAQ fetched successfully"));
});

const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, category, isActive } = req.body;

  if (!question || !answer) {
    throw new ApiError(400, "Question and answer are required");
  }

  const t = await sequelize.transaction();
  try {
    const newFAQ = await FAQ.create({
      question,
      answer,
      category: category || "general",
      isActive: isActive !== undefined ? isActive : true,
    }, { transaction: t });

    await t.commit();

    return res
      .status(201)
      .json(new ApiResponse(201, newFAQ, "FAQ created successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error creating FAQ:", error);
    throw error;
  }
});

const updateFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, answer, category, isActive } = req.body;

  if (!question || !answer) {
    throw new ApiError(400, "Question and answer are required");
  }

  const t = await sequelize.transaction();
  try {
    const faq = await FAQ.findByPk(id, { transaction: t });

    if (!faq) {
      throw new ApiError(404, "FAQ not found");
    }

    faq.question = question;
    faq.answer = answer;
    faq.category = category || faq.category;
    faq.isActive = isActive !== undefined ? isActive : faq.isActive;

    await faq.save({ transaction: t });
    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, faq, "FAQ updated successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error updating FAQ:", error);
    throw error;
  }
});

const deleteFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const t = await sequelize.transaction();
  try {
    const faq = await FAQ.findByPk(id, { transaction: t });

    if (!faq) {
      throw new ApiError(404, "FAQ not found");
    }

    await faq.destroy({ transaction: t });
    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "FAQ deleted successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error deleting FAQ:", error);
    throw error;
  }
});

export {
  getAllFAQs,
  getAllFAQsAdmin,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
