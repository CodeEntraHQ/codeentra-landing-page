import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Notification from "../models/notification.model.js";
import sequelize from "../db/index.js";

const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.findAll({
    order: [["createdAt", "DESC"]],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByPk(id);
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  notification.isRead = true;
  await notification.save();

  return res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification marked as read"));
});

const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByPk(id);
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  await notification.destroy();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Notification deleted successfully"));
});

const clearAllNotifications = asyncHandler(async (req, res) => {
  await Notification.destroy({ where: {} });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "All notifications cleared"));
});

export { getAllNotifications, markNotificationAsRead, deleteNotification, clearAllNotifications };
