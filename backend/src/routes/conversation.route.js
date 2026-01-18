import { Router } from "express";
import {
  getInitialQuestion,
  getQuestionById,
  getAllQuestions,
  getAllQuestionsAdmin,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/conversation.controller.js";

const router = Router();

// Admin routes (must come before /:id to avoid route conflicts)
router.route("/admin").get(getAllQuestionsAdmin).post(createQuestion);
router.route("/admin/:id").put(updateQuestion).delete(deleteQuestion);

// Public routes for website
router.route("/initial").get(getInitialQuestion);
router.route("/").get(getAllQuestions);
router.route("/:id").get(getQuestionById);

export default router;
