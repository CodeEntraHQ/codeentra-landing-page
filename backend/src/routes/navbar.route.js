import express from "express";
import {
  getAllNavbar,
  getAllNavbarAdmin,
  createNavbar,
  updateNavbar,
  deleteNavbar,
} from "../controllers/navbar.controller.js";

const router = express.Router();

// Public route - get active navbar items
router.get("/", getAllNavbar);

// Admin routes
router.get("/admin", getAllNavbarAdmin);
router.post("/admin", createNavbar);
router.put("/admin/:id", updateNavbar);
router.delete("/admin/:id", deleteNavbar);

export default router;
