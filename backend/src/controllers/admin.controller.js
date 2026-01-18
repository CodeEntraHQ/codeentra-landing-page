import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { validateString, validateEmail } from "../utils/validation.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Admin login
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  validateEmail(email, 'Email', { required: true });
  validateString(password, 'Password', { required: true, minLength: 1 });

  const admin = await Admin.findOne({ where: { email: email.trim().toLowerCase() } });

  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Return admin info (without password)
  const adminData = {
    id: admin.id,
    email: admin.email,
    profilePhoto: admin.profilePhoto,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, adminData, "Login successful"));
});

// Get admin profile
const getAdminProfile = asyncHandler(async (req, res) => {
  // In a real app, you'd get admin ID from JWT token
  // For now, we'll get the first admin (assuming single admin)
  try {
    const admin = await Admin.findOne({
      order: [['createdAt', 'ASC']],
      attributes: { exclude: ['password'] },
    });

    if (!admin) {
      // If no admin exists, create a default one
      console.log('No admin found, creating default admin...');
      const defaultAdmin = await Admin.create({
        id: 'admin001',
        email: 'codeentrasocial10@gmail.com',
        password: 'password', // Will be hashed by beforeCreate hook
      });
      
      const adminData = {
        id: defaultAdmin.id,
        email: defaultAdmin.email,
        profilePhoto: defaultAdmin.profilePhoto || null,
        createdAt: defaultAdmin.createdAt,
        updatedAt: defaultAdmin.updatedAt,
      };
      
      return res
        .status(200)
        .json(new ApiResponse(200, adminData, "Admin profile fetched successfully"));
    }

    const adminData = {
      id: admin.id,
      email: admin.email,
      profilePhoto: admin.profilePhoto || null,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, adminData, "Admin profile fetched successfully"));
  } catch (error) {
    console.error('Error in getAdminProfile:', error);
    throw new ApiError(500, "Failed to fetch admin profile: " + error.message);
  }
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validation
  validateString(currentPassword, 'Current Password', { required: true, minLength: 1 });
  validateString(newPassword, 'New Password', { required: true, minLength: 6 });
  validateString(confirmPassword, 'Confirm Password', { required: true, minLength: 1 });

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "New password and confirm password do not match");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  // Get admin (assuming single admin for now)
  const admin = await Admin.findOne({
    order: [['createdAt', 'ASC']],
  });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);

  if (!isCurrentPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  // Check if new password is same as current
  const isSamePassword = await bcrypt.compare(newPassword, admin.password);

  if (isSamePassword) {
    throw new ApiError(400, "New password must be different from current password");
  }

  // Update password (will be hashed by beforeUpdate hook)
  admin.password = newPassword;
  await admin.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});

// Update admin email
const updateAdminEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  validateEmail(email, 'Email', { required: true });
  validateString(password, 'Password', { required: true, minLength: 1 });

  // Get admin
  const admin = await Admin.findOne({
    order: [['createdAt', 'ASC']],
  });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password is incorrect");
  }

  // Check if email already exists
  const existingAdmin = await Admin.findOne({ 
    where: { 
      email: email.trim().toLowerCase(),
      id: { [Op.ne]: admin.id }
    } 
  });

  if (existingAdmin) {
    throw new ApiError(400, "Email already exists");
  }

  // Update email
  admin.email = email.trim().toLowerCase();
  await admin.save();

  const adminData = {
    id: admin.id,
    email: admin.email,
    profilePhoto: admin.profilePhoto,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, adminData, "Email updated successfully"));
});

// Upload profile photo
const uploadProfilePhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  try {
    // Get admin
    const admin = await Admin.findOne({
      order: [['createdAt', 'ASC']],
    });

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    // Delete old photo if exists
    if (admin.profilePhoto) {
      try {
        const oldPhotoPath = path.join(__dirname, "../../uploads/profile-pictures", path.basename(admin.profilePhoto));
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      } catch (deleteError) {
        console.error('Error deleting old photo:', deleteError);
        // Continue even if old photo deletion fails
      }
    }

    // Save new photo path (relative to uploads folder)
    const photoPath = `/uploads/profile-pictures/${req.file.filename}`;
    
    // Use set() to explicitly mark the field as changed
    admin.set('profilePhoto', photoPath);
    
    // Save with explicit field update
    await admin.save({ fields: ['profilePhoto', 'updatedAt'] });
    
    // Reload to get fresh data
    await admin.reload();

    const adminData = {
      id: admin.id,
      email: admin.email,
      profilePhoto: admin.profilePhoto || null,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, adminData, "Profile photo uploaded successfully"));
  } catch (error) {
    console.error('Error in uploadProfilePhoto:', error);
    // If it's a database error about column not existing, provide helpful message
    if (error.message && error.message.includes('column') && error.message.includes('profilePhoto')) {
      throw new ApiError(500, "Database column 'profilePhoto' does not exist. Please run database migration.");
    }
    throw new ApiError(500, "Failed to upload profile photo: " + error.message);
  }
});

// Delete profile photo
const deleteProfilePhoto = asyncHandler(async (req, res) => {
  // Get admin
  const admin = await Admin.findOne({
    order: [['createdAt', 'ASC']],
  });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  if (!admin.profilePhoto) {
    throw new ApiError(400, "No profile photo to delete");
  }

  // Delete photo file
  const photoPath = path.join(__dirname, "../../uploads/profile-pictures", path.basename(admin.profilePhoto));
  if (fs.existsSync(photoPath)) {
    fs.unlinkSync(photoPath);
  }

  // Remove photo path from database
  admin.profilePhoto = null;
  await admin.save();

  const adminData = {
    id: admin.id,
    email: admin.email,
    profilePhoto: null,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, adminData, "Profile photo deleted successfully"));
});

export {
  adminLogin,
  getAdminProfile,
  changePassword,
  updateAdminEmail,
  uploadProfilePhoto,
  deleteProfilePhoto,
};
