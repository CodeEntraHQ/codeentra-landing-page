import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import sequelize from "../db/index.js";

const userContact = asyncHandler(async (req, res) => {
  const { fullname, email, subject, message } = req.body;

  if ([fullname, email, subject, message].some((f) => !f || f.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const t = await sequelize.transaction();
  try {
    const contact = await User.create({ fullname, email, subject, message }, { transaction: t });
    
    // Create notification
    await Notification.create({
      type: "contact",
      message: `${fullname} submitted contact form`,
      referenceId: contact.id,
      isRead: false,
    }, { transaction: t });

    await t.commit();

    return res
      .status(201)
      .json(new ApiResponse(200, contact, "Contact form submitted"));
  } catch (error) {
    await t.rollback();
    throw error;
  }

});

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await User.findAll({
    order: [["createdAt", "DESC"]],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, contacts, "All contacts fetched successfully"));
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await User.findByPk(id);
  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  // Also delete related notification if exists
  await Notification.destroy({
    where: {
      type: "contact",
      referenceId: id,
    },
  });

  await contact.destroy();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Contact deleted successfully"));
});

export { userContact, getAllContacts, deleteContact };