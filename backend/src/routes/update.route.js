import { Router } from "express";
import { 
  getAllUpdates, 
  getAllUpdatesAdmin,
  createUpdate,
  updateUpdate,
  deleteUpdate
} from "../controllers/update.controller.js";

const router = Router();

// Public route for website
router.route("/").get(getAllUpdates);

// Admin routes
router.route("/admin").get(getAllUpdatesAdmin);
router.route("/admin").post(createUpdate);
router.route("/admin/:id").put(updateUpdate);
router.route("/admin/:id").delete(deleteUpdate);

export default router;
