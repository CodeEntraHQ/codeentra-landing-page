import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Footer from "../models/footer.model.js";
import { validateString, validateEnum, validateURL, validateNumber, validateBoolean, validateId } from "../utils/validation.js";

// Get all footer content
const getAllFooter = asyncHandler(async (req, res) => {
  const footer = await Footer.findAll({
    where: { isActive: true },
    order: [['section', 'ASC'], ['orderIndex', 'ASC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, footer, "Footer content fetched successfully"));
});

// Get all footer content (admin - includes inactive)
const getAllFooterAdmin = asyncHandler(async (req, res) => {
  const footer = await Footer.findAll({
    order: [['section', 'ASC'], ['orderIndex', 'ASC'], ['createdAt', 'DESC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, footer, "Footer content fetched successfully"));
});

// Create footer item
const createFooter = asyncHandler(async (req, res) => {
  const { section, title, content, url, icon, orderIndex, isActive } = req.body;

  // Validation
  validateEnum(section, 'Section', ['company', 'services', 'companyLinks', 'social', 'copyright'], { required: true });
  
  if (title !== undefined && title !== null) {
    validateString(title, 'Title', { maxLength: 255 });
  }
  
  if (content !== undefined && content !== null) {
    validateString(content, 'Content', { maxLength: 2000 });
  }
  
  if (url !== undefined && url !== null) {
    validateURL(url, 'URL');
  }
  
  if (icon !== undefined && icon !== null) {
    validateString(icon, 'Icon', { maxLength: 100 });
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }

  const footer = await Footer.create({
    section,
    title: title ? title.trim() : null,
    content: content ? content.trim() : null,
    url: url ? url.trim() : null,
    icon: icon ? icon.trim() : null,
    orderIndex: orderIndex || 0,
    isActive: isActive !== undefined ? isActive : true,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, footer, "Footer item created successfully"));
});

// Update footer item
const updateFooter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { section, title, content, url, icon, orderIndex, isActive } = req.body;

  // Validate ID
  validateId(id, 'ID');

  const footer = await Footer.findByPk(id);

  if (!footer) {
    throw new ApiError(404, "Footer item not found");
  }

  // Validation for update fields
  if (section !== undefined) {
    validateEnum(section, 'Section', ['company', 'services', 'companyLinks', 'social', 'copyright']);
    footer.set('section', section);
  }
  
  if (title !== undefined) {
    if (title === null) {
      footer.set('title', null);
    } else {
      validateString(title, 'Title', { maxLength: 255 });
      footer.set('title', title.trim());
    }
  }
  
  if (content !== undefined) {
    if (content === null) {
      footer.set('content', null);
    } else {
      validateString(content, 'Content', { maxLength: 2000 });
      footer.set('content', content.trim());
    }
  }
  
  if (url !== undefined) {
    if (url === null) {
      footer.set('url', null);
    } else {
      validateURL(url, 'URL');
      footer.set('url', url.trim());
    }
  }
  
  if (icon !== undefined) {
    if (icon === null) {
      footer.set('icon', null);
    } else {
      validateString(icon, 'Icon', { maxLength: 100 });
      footer.set('icon', icon.trim());
    }
  }
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
    footer.set('orderIndex', orderIndex);
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
    footer.set('isActive', isActive);
  }

  // Save with all fields explicitly
  await footer.save();
  
  // Reload to get fresh data from database
  await footer.reload();

  return res
    .status(200)
    .json(new ApiResponse(200, footer, "Footer item updated successfully"));
});

// Delete footer item
const deleteFooter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  validateId(id, 'ID');

  const footer = await Footer.findByPk(id);

  if (!footer) {
    throw new ApiError(404, "Footer item not found");
  }

  await footer.destroy();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Footer item deleted successfully"));
});

export {
  getAllFooter,
  getAllFooterAdmin,
  createFooter,
  updateFooter,
  deleteFooter,
};
