import { Router } from "express";
import {
  getAllTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller.js";

const router = Router();

// Public route
router.route("/").get(getAllTestimonials);

// Admin routes
router.route("/admin").get(getAllTestimonialsAdmin).post(createTestimonial);
router.route("/admin/:id").put(updateTestimonial).delete(deleteTestimonial);

export default router;
