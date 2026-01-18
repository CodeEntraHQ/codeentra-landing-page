import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Update from "../models/update.model.js";
import sequelize from "../db/index.js";

const getAllUpdates = asyncHandler(async (req, res) => {
  const updates = await Update.findAll({
    where: { isActive: true },
    order: [["createdAt", "DESC"]],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updates, "Updates fetched successfully"));
});

const getAllUpdatesAdmin = asyncHandler(async (req, res) => {
  const updates = await Update.findAll({
    order: [["createdAt", "DESC"]],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updates, "All updates fetched successfully"));
});

const createUpdate = asyncHandler(async (req, res) => {
  const { title, description, type, isActive } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const t = await sequelize.transaction();
  try {
    const update = await Update.create({
      title,
      description,
      type: type || "announcement",
      isActive: isActive !== undefined ? isActive : true,
    }, { transaction: t });

    await t.commit();

    return res
      .status(201)
      .json(new ApiResponse(201, update, "Update created successfully"));
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

const updateUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, type, isActive } = req.body;

  const t = await sequelize.transaction();
  try {
    const update = await Update.findByPk(id, { transaction: t });

    if (!update) {
      throw new ApiError(404, "Update not found");
    }

    if (title) update.title = title;
    if (description) update.description = description;
    if (type) update.type = type;
    if (isActive !== undefined) update.isActive = isActive;

    await update.save({ transaction: t });
    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, update, "Update updated successfully"));
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

const deleteUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const t = await sequelize.transaction();
  try {
    const update = await Update.findByPk(id, { transaction: t });

    if (!update) {
      throw new ApiError(404, "Update not found");
    }

    await update.destroy({ transaction: t });

    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Update deleted successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error deleting update:", error);
    throw error;
  }
});

export { getAllUpdates, getAllUpdatesAdmin, createUpdate, updateUpdate, deleteUpdate };
