import { Router } from "express";
import { 
  getAllNotifications, 
  markNotificationAsRead, 
  deleteNotification,
  clearAllNotifications 
} from "../controllers/notification.controller.js";

const router = Router();

router.route("/").get(getAllNotifications);
router.route("/clear").delete(clearAllNotifications);
router.route("/:id/read").put(markNotificationAsRead);
router.route("/:id").delete(deleteNotification);

export default router;
