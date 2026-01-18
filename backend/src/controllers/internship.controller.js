import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Internship from "../models/internship.model.js";
import Notification from "../models/notification.model.js";
import sequelize from "../db/index.js";

const submitInternship = asyncHandler(async (req, res) => {
  const { fullName, email, phone, college, course, year, duration, skills, resume, coverLetter, price } = req.body;

  console.log("Received internship application:", {
    fullName,
    email,
    phone,
    college,
    course,
    year,
    duration,
    skills,
    resume: resume ? "provided" : "missing",
    coverLetter: coverLetter ? "provided" : "missing"
  });

  // Validate required fields
  if ([fullName, email, phone, college, course, year, duration, skills, resume].some((f) => !f || f.trim() === "")) {
    console.error("Validation failed: Missing required fields");
    throw new ApiError(400, "All required fields must be filled");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // Validate duration (should be 1-6 months)
  const durationNum = parseInt(duration);
  if (isNaN(durationNum) || durationNum < 1 || durationNum > 6) {
    throw new ApiError(400, "Duration must be between 1 and 6 months");
  }

  // Validate resume URL
  try {
    new URL(resume);
  } catch (error) {
    throw new ApiError(400, "Invalid resume URL format");
  }

  const t = await sequelize.transaction();
  try {
    console.log("Creating internship record in database...");
    const internship = await Internship.create({
      fullName,
      email,
      phone,
      college,
      course,
      year,
      duration: durationNum,
      skills,
      resume,
      coverLetter: coverLetter || null,
      price: price ? parseFloat(price) : null,
    }, { transaction: t });

    // Create notification
    await Notification.create({
      type: "internship",
      message: `${fullName} applied for internship`,
      referenceId: internship.id,
      isRead: false,
    }, { transaction: t });

    await t.commit();
    console.log("Internship application created successfully:", internship.id);

    return res
      .status(201)
      .json(new ApiResponse(200, internship, "Internship application submitted successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error creating internship:", error);
    throw error;
  }
});

const getAllInternships = asyncHandler(async (req, res) => {
  const internships = await Internship.findAll({
    order: [["createdAt", "DESC"]],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, internships, "All internships fetched successfully"));
});

const deleteInternship = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const internship = await Internship.findByPk(id);
  if (!internship) {
    throw new ApiError(404, "Internship not found");
  }

  // Also delete related notification if exists
  await Notification.destroy({
    where: {
      type: "internship",
      referenceId: id,
    },
  });

  await internship.destroy();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Internship deleted successfully"));
});

export { submitInternship, getAllInternships, deleteInternship };
