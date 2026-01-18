import express from "express";
import {
  adminLogin,
  getAdminProfile,
  changePassword,
  updateAdminEmail,
  uploadProfilePhoto,
  deleteProfilePhoto,
} from "../controllers/admin.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Admin routes
router.post("/login", adminLogin);
router.get("/profile", getAdminProfile);
router.put("/change-password", changePassword);
router.put("/update-email", updateAdminEmail);
router.post("/upload-photo", upload.single("photo"), uploadProfilePhoto);
router.delete("/delete-photo", deleteProfilePhoto);

export default router;
