import { Router } from "express";
import {
  getAllServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

const router = Router();

// Public route
router.route("/").get(getAllServices);

// Admin routes
router.route("/admin").get(getAllServicesAdmin).post(createService);
router.route("/admin/:id").put(updateService).delete(deleteService);

export default router;
