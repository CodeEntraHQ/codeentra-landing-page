import express from "express";
import {
  getAllFooter,
  getAllFooterAdmin,
  createFooter,
  updateFooter,
  deleteFooter,
} from "../controllers/footer.controller.js";

const router = express.Router();

// Public route - get active footer content
router.get("/", getAllFooter);

// Admin routes
router.get("/admin", getAllFooterAdmin);
router.post("/admin", createFooter);
router.put("/admin/:id", updateFooter);
router.delete("/admin/:id", deleteFooter);

export default router;
