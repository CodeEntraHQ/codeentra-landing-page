import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import sequelize from "../db/index.js";

const userContact = asyncHandler(async (req, res) => {
  const { fullname, email, subject, message } = req.body;

  if ([fullname, email, subject, message].some((f) => !f || f.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const t = await sequelize.transaction();
  try {
    const contact = await User.create({ fullname, email, subject, message });
    await t.commit();

    return res
      .status(201)
      .json(new ApiResponse(200, contact, "Contact form submitted"));
  } catch (error) {
    await t.rollback();
    throw error;
  }

});
export { userContact };