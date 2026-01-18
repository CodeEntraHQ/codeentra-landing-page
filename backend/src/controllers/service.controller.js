import Service from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateString, validateNumber, validateBoolean, validateId } from "../utils/validation.js";

// Get all active services (public endpoint)
export const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.findAll({
    where: { isActive: true },
    order: [["orderIndex", "ASC"]],
  });

  return res.status(200).json(
    new ApiResponse(200, services, "Services fetched successfully")
  );
});

// Get all services (admin endpoint)
export const getAllServicesAdmin = asyncHandler(async (req, res) => {
  const services = await Service.findAll({
    order: [["orderIndex", "ASC"], ["createdAt", "DESC"]],
  });

  return res.status(200).json(
    new ApiResponse(200, services, "All services fetched successfully")
  );
});

// Create a new service
export const createService = asyncHandler(async (req, res) => {
  const { title, description, fullDescription, icon, isActive, orderIndex } = req.body;

  // Validation
  validateString(title, 'Title', { required: true, minLength: 1, maxLength: 255 });
  validateString(description, 'Description', { required: true, minLength: 1, maxLength: 500 });
  
  if (fullDescription !== undefined && fullDescription !== null) {
    validateString(fullDescription, 'Full Description', { maxLength: 5000 });
  }
  
  if (icon !== undefined) {
    validateString(icon, 'Icon', { maxLength: 100 });
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }

  const service = await Service.create({
    title: title.trim(),
    description: description.trim(),
    fullDescription: fullDescription ? fullDescription.trim() : null,
    icon: icon ? icon.trim() : "code",
    isActive: isActive !== undefined ? isActive : true,
    orderIndex: orderIndex || 0,
  });

  return res.status(201).json(
    new ApiResponse(201, service, "Service created successfully")
  );
});

// Update a service
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, fullDescription, icon, isActive, orderIndex } = req.body;

  // Validate ID
  validateId(id, 'ID');

  const service = await Service.findByPk(id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  // Validation for update fields
  if (title !== undefined) {
    validateString(title, 'Title', { minLength: 1, maxLength: 255 });
    service.title = title.trim();
  }
  
  if (description !== undefined) {
    validateString(description, 'Description', { minLength: 1, maxLength: 500 });
    service.description = description.trim();
  }
  
  if (fullDescription !== undefined) {
    if (fullDescription === null) {
      service.fullDescription = null;
    } else {
      validateString(fullDescription, 'Full Description', { maxLength: 5000 });
      service.fullDescription = fullDescription.trim();
    }
  }
  
  if (icon !== undefined) {
    validateString(icon, 'Icon', { maxLength: 100 });
    service.icon = icon.trim();
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
    service.isActive = isActive;
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
    service.orderIndex = orderIndex;
  }

  await service.save();

  return res.status(200).json(
    new ApiResponse(200, service, "Service updated successfully")
  );
});

// Delete a service
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  validateId(id, 'ID');

  const service = await Service.findByPk(id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  await service.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Service deleted successfully")
  );
});
