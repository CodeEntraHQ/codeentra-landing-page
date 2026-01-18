import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateString, validateURL, validateNumber, validateBoolean, validateId, validateArray } from "../utils/validation.js";

// Get all active products (public endpoint)
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    where: { isActive: true },
    order: [["orderIndex", "ASC"]],
  });

  return res.status(200).json(
    new ApiResponse(200, products, "Products fetched successfully")
  );
});

// Get all products (admin endpoint)
export const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    order: [["orderIndex", "ASC"], ["createdAt", "DESC"]],
  });

  return res.status(200).json(
    new ApiResponse(200, products, "All products fetched successfully")
  );
});

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, url, icon, features, isActive, orderIndex } = req.body;

  // Validation
  validateString(name, 'Name', { required: true, minLength: 1, maxLength: 255 });
  validateString(description, 'Description', { required: true, minLength: 1, maxLength: 2000 });
  validateURL(url, 'URL', { required: true });
  
  if (icon !== undefined) {
    validateString(icon, 'Icon', { maxLength: 100 });
  }
  
  if (features !== undefined) {
    validateArray(features, 'Features');
    // Validate each feature is a string
    if (features.some(f => typeof f !== 'string')) {
      throw new ApiError(400, 'All features must be strings');
    }
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }

  const featuresArray = Array.isArray(features) ? features.map(f => String(f).trim()).filter(f => f.length > 0) : [];

  const product = await Product.create({
    name: name.trim(),
    description: description.trim(),
    url: url.trim(),
    icon: icon ? icon.trim() : "Sparkles",
    features: featuresArray,
    isActive: isActive !== undefined ? isActive : true,
    orderIndex: orderIndex || 0,
  });

  return res.status(201).json(
    new ApiResponse(201, product, "Product created successfully")
  );
});

// Update a product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, url, icon, features, isActive, orderIndex } = req.body;

  // Validate ID
  validateId(id, 'ID');

  const product = await Product.findByPk(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Validation for update fields
  if (name !== undefined) {
    validateString(name, 'Name', { minLength: 1, maxLength: 255 });
    product.name = name.trim();
  }
  
  if (description !== undefined) {
    validateString(description, 'Description', { minLength: 1, maxLength: 2000 });
    product.description = description.trim();
  }
  
  if (url !== undefined) {
    validateURL(url, 'URL');
    product.url = url.trim();
  }
  
  if (icon !== undefined) {
    validateString(icon, 'Icon', { maxLength: 100 });
    product.icon = icon.trim();
  }
  
  if (features !== undefined) {
    validateArray(features, 'Features');
    if (features.some(f => typeof f !== 'string')) {
      throw new ApiError(400, 'All features must be strings');
    }
    product.features = features.map(f => String(f).trim()).filter(f => f.length > 0);
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
    product.isActive = isActive;
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
    product.orderIndex = orderIndex;
  }

  await product.save();

  return res.status(200).json(
    new ApiResponse(200, product, "Product updated successfully")
  );
});

// Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  validateId(id, 'ID');

  const product = await Product.findByPk(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Product deleted successfully")
  );
});
