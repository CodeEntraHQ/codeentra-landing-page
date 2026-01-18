import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ContactInfo from "../models/contactInfo.model.js";
import { validateString, validateEnum, validateNumber, validateBoolean, validateId, validateEmail, validatePhone } from "../utils/validation.js";

// Get all contact information
const getAllContactInfo = asyncHandler(async (req, res) => {
  const contactInfo = await ContactInfo.findAll({
    where: { isActive: true },
    order: [['orderIndex', 'ASC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, contactInfo, "Contact information fetched successfully"));
});

// Get all contact information (admin - includes inactive)
const getAllContactInfoAdmin = asyncHandler(async (req, res) => {
  const contactInfo = await ContactInfo.findAll({
    order: [['orderIndex', 'ASC'], ['createdAt', 'DESC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, contactInfo, "Contact information fetched successfully"));
});

// Create contact information
const createContactInfo = asyncHandler(async (req, res) => {
  const { type, label, value, orderIndex, isActive } = req.body;

  // Validation
  validateEnum(type, 'Type', ['office', 'email', 'phone'], { required: true });
  validateString(label, 'Label', { required: true, minLength: 1, maxLength: 255 });
  validateString(value, 'Value', { required: true, minLength: 1, maxLength: 1000 });
  
  // Type-specific validation
  if (type === 'email') {
    validateEmail(value, 'Value');
  } else if (type === 'phone') {
    validatePhone(value, 'Value');
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }

  const contactInfo = await ContactInfo.create({
    type,
    label: label.trim(),
    value: value.trim(),
    orderIndex: orderIndex || 0,
    isActive: isActive !== undefined ? isActive : true,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, contactInfo, "Contact information created successfully"));
});

// Update contact information
const updateContactInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type, label, value, orderIndex, isActive } = req.body;

  // Validate ID
  validateId(id, 'ID');

  const contactInfo = await ContactInfo.findByPk(id);

  if (!contactInfo) {
    throw new ApiError(404, "Contact information not found");
  }

  // Validation for update fields
  if (type !== undefined) {
    validateEnum(type, 'Type', ['office', 'email', 'phone']);
    contactInfo.set('type', type);
  }
  
  if (label !== undefined) {
    validateString(label, 'Label', { minLength: 1, maxLength: 255 });
    contactInfo.set('label', label.trim());
  }
  
  if (value !== undefined) {
    validateString(value, 'Value', { minLength: 1, maxLength: 1000 });
    
    // Type-specific validation
    const currentType = type || contactInfo.type;
    if (currentType === 'email') {
      validateEmail(value, 'Value');
    } else if (currentType === 'phone') {
      validatePhone(value, 'Value');
    }
    
    contactInfo.set('value', value.trim());
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
    contactInfo.set('orderIndex', orderIndex);
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
    contactInfo.set('isActive', isActive);
  }

  await contactInfo.save();
  
  // Reload to get fresh data
  await contactInfo.reload();

  return res
    .status(200)
    .json(new ApiResponse(200, contactInfo, "Contact information updated successfully"));
});

// Delete contact information
const deleteContactInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  validateId(id, 'ID');

  const contactInfo = await ContactInfo.findByPk(id);

  if (!contactInfo) {
    throw new ApiError(404, "Contact information not found");
  }

  await contactInfo.destroy();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Contact information deleted successfully"));
});

export {
  getAllContactInfo,
  getAllContactInfoAdmin,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
};
