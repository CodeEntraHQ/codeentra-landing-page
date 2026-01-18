import { ApiError } from "./ApiError.js";

// Validation helper functions
export const validateRequired = (value, fieldName) => {
  if (value === undefined || value === null || value === '') {
    throw new ApiError(400, `${fieldName} is required`);
  }
};

export const validateString = (value, fieldName, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (typeof value !== 'string') {
    throw new ApiError(400, `${fieldName} must be a string`);
  }

  const trimmed = value.trim();
  
  if (options.required && trimmed === '') {
    throw new ApiError(400, `${fieldName} cannot be empty`);
  }

  if (options.minLength && trimmed.length < options.minLength) {
    throw new ApiError(400, `${fieldName} must be at least ${options.minLength} characters long`);
  }

  if (options.maxLength && trimmed.length > options.maxLength) {
    throw new ApiError(400, `${fieldName} must not exceed ${options.maxLength} characters`);
  }
};

export const validateNumber = (value, fieldName, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (typeof value !== 'number' || isNaN(value)) {
    throw new ApiError(400, `${fieldName} must be a valid number`);
  }

  if (options.min !== undefined && value < options.min) {
    throw new ApiError(400, `${fieldName} must be at least ${options.min}`);
  }

  if (options.max !== undefined && value > options.max) {
    throw new ApiError(400, `${fieldName} must not exceed ${options.max}`);
  }

  if (options.integer && !Number.isInteger(value)) {
    throw new ApiError(400, `${fieldName} must be an integer`);
  }
};

export const validateBoolean = (value, fieldName, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (typeof value !== 'boolean') {
    throw new ApiError(400, `${fieldName} must be a boolean`);
  }
};

export const validateArray = (value, fieldName, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (!Array.isArray(value)) {
    throw new ApiError(400, `${fieldName} must be an array`);
  }

  if (options.minLength && value.length < options.minLength) {
    throw new ApiError(400, `${fieldName} must have at least ${options.minLength} items`);
  }

  if (options.maxLength && value.length > options.maxLength) {
    throw new ApiError(400, `${fieldName} must not exceed ${options.maxLength} items`);
  }
};

export const validateURL = (value, fieldName, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (typeof value !== 'string') {
    throw new ApiError(400, `${fieldName} must be a string`);
  }

  const trimmed = value.trim();

  // Allow hash links (#section) or full URLs
  if (trimmed.startsWith('#')) {
    return; // Hash links are valid
  }

  try {
    new URL(trimmed);
  } catch (error) {
    throw new ApiError(400, `${fieldName} must be a valid URL`);
  }
};

export const validateEmail = (value, fieldName, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (typeof value !== 'string') {
    throw new ApiError(400, `${fieldName} must be a string`);
  }

  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    throw new ApiError(400, `${fieldName} must be a valid email address`);
  }
};

export const validateEnum = (value, fieldName, allowedValues, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (!allowedValues.includes(value)) {
    throw new ApiError(400, `${fieldName} must be one of: ${allowedValues.join(', ')}`);
  }
};

export const validatePhone = (value, fieldName, options = {}) => {
  if (value === undefined || value === null) {
    if (options.required) {
      throw new ApiError(400, `${fieldName} is required`);
    }
    return;
  }

  if (typeof value !== 'string') {
    throw new ApiError(400, `${fieldName} must be a string`);
  }

  const trimmed = value.trim();
  // Basic phone validation - allows international format
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

  if (!phoneRegex.test(trimmed)) {
    throw new ApiError(400, `${fieldName} must be a valid phone number`);
  }
};

export const validateId = (value, fieldName) => {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    throw new ApiError(400, `${fieldName} is required and must be a valid ID`);
  }
};
