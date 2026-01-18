import express from "express";
import {
  getAllContactInfo,
  getAllContactInfoAdmin,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from "../controllers/contactInfo.controller.js";

const router = express.Router();

// Public route - get active contact info
router.get("/", getAllContactInfo);

// Admin routes
router.get("/admin", getAllContactInfoAdmin);
router.post("/admin", createContactInfo);
router.put("/admin/:id", updateContactInfo);
router.delete("/admin/:id", deleteContactInfo);

export default router;
