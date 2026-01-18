import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Pricing from "../models/pricing.model.js";
import sequelize from "../db/index.js";

const getAllPricings = asyncHandler(async (req, res) => {
  const pricings = await Pricing.findAll({
    where: { isActive: true },
    order: [["duration", "ASC"]],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, pricings, "Pricings fetched successfully"));
});

const getAllPricingsAdmin = asyncHandler(async (req, res) => {
  const pricings = await Pricing.findAll({
    order: [["duration", "ASC"]],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, pricings, "All pricings fetched successfully"));
});

const updatePricing = asyncHandler(async (req, res) => {
  const { duration, price } = req.body;

  if (!duration || price === undefined || price === null) {
    throw new ApiError(400, "Duration and price are required");
  }

  if (price < 0) {
    throw new ApiError(400, "Price cannot be negative");
  }

  const t = await sequelize.transaction();
  try {
    // Check if pricing exists for this duration
    let pricing = await Pricing.findOne({ where: { duration }, transaction: t });

    if (pricing) {
      // Update existing pricing
      pricing.price = price;
      pricing.isActive = true;
      await pricing.save({ transaction: t });
    } else {
      // Create new pricing
      pricing = await Pricing.create({
        duration,
        price,
        isActive: true,
      }, { transaction: t });
    }

    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, pricing, "Pricing updated successfully"));
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

const updateMultiplePricings = asyncHandler(async (req, res) => {
  const { pricings } = req.body;

  if (!Array.isArray(pricings)) {
    throw new ApiError(400, "Pricings must be an array");
  }

  const t = await sequelize.transaction();
  try {
    const updatedPricings = [];

    for (const item of pricings) {
      const { duration, price } = item;

      if (!duration || price === undefined || price === null) {
        throw new ApiError(400, "Each pricing must have duration and price");
      }

      if (price < 0) {
        throw new ApiError(400, "Price cannot be negative");
      }

      let pricing = await Pricing.findOne({ where: { duration }, transaction: t });

      if (pricing) {
        pricing.price = price;
        pricing.isActive = true;
        await pricing.save({ transaction: t });
        updatedPricings.push(pricing);
      } else {
        pricing = await Pricing.create({
          duration,
          price,
          isActive: true,
        }, { transaction: t });
        updatedPricings.push(pricing);
      }
    }

    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, updatedPricings, "Pricings updated successfully"));
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

const deletePricing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const t = await sequelize.transaction();
  try {
    const pricing = await Pricing.findByPk(id, { transaction: t });

    if (!pricing) {
      throw new ApiError(404, "Pricing not found");
    }

    await pricing.destroy({ transaction: t });

    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Pricing deleted successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error deleting pricing:", error);
    throw error;
  }
});

export { getAllPricings, getAllPricingsAdmin, updatePricing, updateMultiplePricings, deletePricing };
