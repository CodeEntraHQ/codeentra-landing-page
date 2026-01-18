import { Router } from "express";
import {
  getAllFAQs,
  getAllFAQsAdmin,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faq.controller.js";

const router = Router();

// Public route for website
router.route("/").get(getAllFAQs);
router.route("/:id").get(getFAQById);

// Admin routes
router.route("/admin").get(getAllFAQsAdmin).post(createFAQ);
router.route("/admin/:id").put(updateFAQ).delete(deleteFAQ);

export default router;
