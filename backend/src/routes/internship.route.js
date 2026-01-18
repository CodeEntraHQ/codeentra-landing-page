import { Router } from "express";
import { submitInternship, getAllInternships, deleteInternship } from "../controllers/internship.controller.js";

const router = Router();

router.route("/apply").post(submitInternship);
router.route("/all").get(getAllInternships);
router.route("/:id").delete(deleteInternship);

export default router;
