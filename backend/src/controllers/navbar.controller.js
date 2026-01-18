import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Navbar from "../models/navbar.model.js";
import { validateString, validateURL, validateNumber, validateBoolean, validateId } from "../utils/validation.js";

// Get all navbar items
const getAllNavbar = asyncHandler(async (req, res) => {
  const navbar = await Navbar.findAll({
    where: { isActive: true },
    order: [['orderIndex', 'ASC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, navbar, "Navbar items fetched successfully"));
});

// Get all navbar items (admin - includes inactive)
const getAllNavbarAdmin = asyncHandler(async (req, res) => {
  const navbar = await Navbar.findAll({
    order: [['orderIndex', 'ASC'], ['createdAt', 'DESC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, navbar, "Navbar items fetched successfully"));
});

// Create navbar item
const createNavbar = asyncHandler(async (req, res) => {
  const { label, url, orderIndex, isActive } = req.body;

  // Validation
  validateString(label, 'Label', { required: true, minLength: 1, maxLength: 255 });
  validateURL(url, 'URL', { required: true });
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }

  const navbar = await Navbar.create({
    label: label.trim(),
    url: url.trim(),
    orderIndex: orderIndex || 0,
    isActive: isActive !== undefined ? isActive : true,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, navbar, "Navbar item created successfully"));
});

// Update navbar item
const updateNavbar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { label, url, orderIndex, isActive } = req.body;

  // Validate ID
  validateId(id, 'ID');

  const navbar = await Navbar.findByPk(id);

  if (!navbar) {
    throw new ApiError(404, "Navbar item not found");
  }

  // Validation for update fields
  if (label !== undefined) {
    validateString(label, 'Label', { minLength: 1, maxLength: 255 });
    navbar.set('label', label.trim());
  }
  
  if (url !== undefined) {
    validateURL(url, 'URL');
    navbar.set('url', url.trim());
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
    navbar.set('orderIndex', orderIndex);
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
    navbar.set('isActive', isActive);
  }

  await navbar.save();
  
  // Reload to get fresh data from database
  await navbar.reload();

  return res
    .status(200)
    .json(new ApiResponse(200, navbar, "Navbar item updated successfully"));
});

// Delete navbar item
const deleteNavbar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  validateId(id, 'ID');

  const navbar = await Navbar.findByPk(id);

  if (!navbar) {
    throw new ApiError(404, "Navbar item not found");
  }

  await navbar.destroy();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Navbar item deleted successfully"));
});

export {
  getAllNavbar,
  getAllNavbarAdmin,
  createNavbar,
  updateNavbar,
  deleteNavbar,
};
