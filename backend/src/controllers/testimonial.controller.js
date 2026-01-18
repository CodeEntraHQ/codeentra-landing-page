import Testimonial from "../models/testimonial.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateString, validateNumber, validateBoolean, validateId } from "../utils/validation.js";

// Get all active testimonials (public endpoint)
export const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.findAll({
    where: { isActive: true },
    order: [["orderIndex", "ASC"]],
  });

  return res.status(200).json(
    new ApiResponse(200, testimonials, "Testimonials fetched successfully")
  );
});

// Get all testimonials (admin endpoint)
export const getAllTestimonialsAdmin = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.findAll({
    order: [["orderIndex", "ASC"], ["createdAt", "DESC"]],
  });

  return res.status(200).json(
    new ApiResponse(200, testimonials, "All testimonials fetched successfully")
  );
});

// Create a new testimonial
export const createTestimonial = asyncHandler(async (req, res) => {
  const { quote, name, title, company, rating, isActive, orderIndex } = req.body;

  // Validation
  validateString(quote, 'Quote', { required: true, minLength: 1, maxLength: 2000 });
  validateString(name, 'Name', { required: true, minLength: 1, maxLength: 255 });
  validateString(title, 'Title', { required: true, minLength: 1, maxLength: 255 });
  validateString(company, 'Company', { required: true, minLength: 1, maxLength: 255 });
  
  if (rating !== undefined) {
    validateNumber(rating, 'Rating', { integer: true, min: 1, max: 5 });
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }

  const ratingValue = rating !== undefined ? parseInt(rating) : 5;

  const testimonial = await Testimonial.create({
    quote: quote.trim(),
    name: name.trim(),
    title: title.trim(),
    company: company.trim(),
    rating: ratingValue,
    isActive: isActive !== undefined ? isActive : true,
    orderIndex: orderIndex || 0,
  });

  return res.status(201).json(
    new ApiResponse(201, testimonial, "Testimonial created successfully")
  );
});

// Update a testimonial
export const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quote, name, title, company, rating, isActive, orderIndex } = req.body;

  // Validate ID
  validateId(id, 'ID');

  const testimonial = await Testimonial.findByPk(id);

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  // Validation for update fields
  if (quote !== undefined) {
    validateString(quote, 'Quote', { minLength: 1, maxLength: 2000 });
    testimonial.quote = quote.trim();
  }
  
  if (name !== undefined) {
    validateString(name, 'Name', { minLength: 1, maxLength: 255 });
    testimonial.name = name.trim();
  }
  
  if (title !== undefined) {
    validateString(title, 'Title', { minLength: 1, maxLength: 255 });
    testimonial.title = title.trim();
  }
  
  if (company !== undefined) {
    validateString(company, 'Company', { minLength: 1, maxLength: 255 });
    testimonial.company = company.trim();
  }
  
  if (rating !== undefined) {
    validateNumber(rating, 'Rating', { integer: true, min: 1, max: 5 });
    testimonial.rating = parseInt(rating);
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
    testimonial.isActive = isActive;
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
    testimonial.orderIndex = orderIndex;
  }

  await testimonial.save();

  return res.status(200).json(
    new ApiResponse(200, testimonial, "Testimonial updated successfully")
  );
});

// Delete a testimonial
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  validateId(id, 'ID');

  const testimonial = await Testimonial.findByPk(id);

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  await testimonial.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Testimonial deleted successfully")
  );
});
