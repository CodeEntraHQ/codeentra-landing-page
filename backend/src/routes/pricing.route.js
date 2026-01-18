import { Router } from "express";
import { 
  getAllPricings, 
  getAllPricingsAdmin,
  updatePricing, 
  updateMultiplePricings,
  deletePricing
} from "../controllers/pricing.controller.js";

const router = Router();

// Public route for website form
router.route("/").get(getAllPricings);

// Admin routes
router.route("/admin").get(getAllPricingsAdmin);
router.route("/admin").put(updateMultiplePricings);
router.route("/admin/:duration").put(updatePricing);
router.route("/admin/:id").delete(deletePricing);

export default router;
