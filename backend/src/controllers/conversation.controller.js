import ConversationFlow from "../models/conversation.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import sequelize from "../db/index.js";
import { validateString, validateArray, validateBoolean, validateNumber, validateId } from "../utils/validation.js";

// Helper function to seed initial data if not exists
const seedInitialData = async () => {
  const existing = await ConversationFlow.findOne({ where: { isInitial: true } });
  
  // If initial question exists, update it to include "Our Products" option if not present
  if (existing) {
    const options = existing.options || [];
    const hasProductsOption = options.some(opt => opt.option === "Our Products");
    
    if (!hasProductsOption) {
      // Add "Our Products" option to existing initial question
      const updatedOptions = [
        { option: "Our Services", answer: "Great! We offer comprehensive technology services. What service interests you?", nextQuestionId: "conv002" },
        { option: "Our Products", answer: "Great! We have developed innovative products to solve real-world problems. Which product interests you?", nextQuestionId: "products" },
        { option: "Internship Program", answer: "Excellent choice! We offer amazing internship opportunities. What would you like to know?", nextQuestionId: "conv003" },
        { option: "About codeEntra", answer: "codeEntra is a leading technology solutions provider founded in 2025. What would you like to know?", nextQuestionId: "conv004" },
        { option: "Contact Us", answer: "You can reach us through our contact form on this page or email us directly. We would love to hear from you!", nextQuestionId: null }
      ];
      
      existing.options = updatedOptions;
      await existing.save();
      console.log('Updated initial question with "Our Products" option');
    }
    return;
  }

  const initialData = [
    {
      id: 'conv001',
      question: 'Hello! I am codeEntra assistant. What would you like to know about?',
      options: [
        { option: "Our Services", answer: "Great! We offer comprehensive technology services. What service interests you?", nextQuestionId: "conv002" },
        { option: "Our Products", answer: "Great! We have developed innovative products to solve real-world problems. Which product interests you?", nextQuestionId: "products" },
        { option: "Internship Program", answer: "Excellent choice! We offer amazing internship opportunities. What would you like to know?", nextQuestionId: "conv003" },
        { option: "About codeEntra", answer: "codeEntra is a leading technology solutions provider founded in 2025. What would you like to know?", nextQuestionId: "conv004" },
        { option: "Contact Us", answer: "You can reach us through our contact form on this page or email us directly. We would love to hear from you!", nextQuestionId: null }
      ],
      isActive: true,
      isInitial: true,
      orderIndex: 1,
    },
    {
      id: 'conv002',
      question: 'Which service interests you?',
      options: [
        { option: "Web Development", answer: "Our Web Development service includes custom websites and web applications built with the latest technologies to create powerful digital experiences tailored to your business needs.", nextQuestionId: null },
        { option: "DevOps Solutions", answer: "DevOps Solutions include streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process and operational efficiency.", nextQuestionId: null },
        { option: "Cloud Services", answer: "We provide expert cloud solutions for AWS, Azure, and GCP to help you scale your infrastructure efficiently and securely.", nextQuestionId: null },
        { option: "UX/UI Design", answer: "UX/UI Design service focuses on user-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers.", nextQuestionId: null },
        { option: "IT Consulting", answer: "IT Consulting provides strategic technology consulting to help your business make the right decisions for sustainable growth and innovation.", nextQuestionId: null },
        { option: "Cybersecurity", answer: "We offer comprehensive security solutions to protect your business from threats and ensure compliance with regulations.", nextQuestionId: null }
      ],
      isActive: true,
      isInitial: false,
      orderIndex: 2,
    },
    {
      id: 'conv003',
      question: 'What would you like to know about our internship program?',
      options: [
        { option: "How to Apply", answer: "You can apply for internships by visiting our Career section on the website. Fill out the internship application form with your details, skills, and preferences.", nextQuestionId: null },
        { option: "Program Duration", answer: "Internship programs are available in various durations (typically 1-6 months) depending on the program. Check our Career section for specific duration options.", nextQuestionId: null },
        { option: "Benefits", answer: "Interns receive continuous learning opportunities, mentorship from industry experts, real project experience, and the chance to build their professional network.", nextQuestionId: null },
        { option: "Requirements", answer: "We look for passionate individuals with basic programming knowledge and eagerness to learn. Check our Career section for specific requirements.", nextQuestionId: null }
      ],
      isActive: true,
      isInitial: false,
      orderIndex: 3,
    },
    {
      id: 'conv004',
      question: 'What would you like to know about codeEntra?',
      options: [
        { option: "Company Overview", answer: "codeEntra is a leading technology solutions provider founded in 2025. We specialize in empowering businesses with innovative technology solutions that drive growth and success.", nextQuestionId: null },
        { option: "Our Mission", answer: "We combine technical expertise with a deep understanding of business needs to deliver solutions that not only solve problems but create opportunities for our clients.", nextQuestionId: null },
        { option: "Our Team", answer: "Our team of dedicated professionals is passionate about technology and committed to excellence in everything we do.", nextQuestionId: null }
      ],
      isActive: true,
      isInitial: false,
      orderIndex: 4,
    },
  ];

  try {
    await ConversationFlow.bulkCreate(initialData, { ignoreDuplicates: true });
    console.log('Initial conversation data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial conversation data:', error);
  }
};

const getInitialQuestion = asyncHandler(async (req, res) => {
  // Try to seed data if not exists
  await seedInitialData();

  const initialQuestion = await ConversationFlow.findOne({
    where: { isInitial: true, isActive: true },
    order: [['orderIndex', 'ASC']],
  });

  if (!initialQuestion) {
    throw new ApiError(404, "Initial question not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, initialQuestion, "Initial question fetched successfully"));
});

const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate ID
  validateId(id, 'ID');

  // Special handling for products question - fetch products dynamically
  if (id === 'products') {
    const products = await Product.findAll({
      where: { isActive: true },
      order: [["orderIndex", "ASC"]],
    });

    if (products.length === 0) {
      return res.status(200).json(
        new ApiResponse(200, {
          id: 'products',
          question: 'Our Products',
          options: [
            {
              option: 'No products available',
              answer: 'We are currently working on exciting new products. Please check back soon!',
              nextQuestionId: null
            }
          ],
          isActive: true,
          isInitial: false,
          orderIndex: 5,
        }, "Products question fetched successfully")
      );
    }

    // Convert products to conversation options
    const productOptions = products.map((product) => {
      const featuresText = Array.isArray(product.features) && product.features.length > 0
        ? `\n\nKey Features:\n${product.features.map(f => `• ${f}`).join('\n')}`
        : '';
      
      return {
        option: product.name,
        answer: `${product.description}${featuresText}\n\n🔗 Explore: ${product.url}`,
        nextQuestionId: null,
        productUrl: product.url, // Store URL for frontend to handle links
      };
    });

    return res.status(200).json(
      new ApiResponse(200, {
        id: 'products',
        question: 'Which product would you like to know more about?',
        options: productOptions,
        isActive: true,
        isInitial: false,
        orderIndex: 5,
      }, "Products question fetched successfully")
    );
  }

  // Regular question lookup
  const question = await ConversationFlow.findByPk(id);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  // Only return active questions for public API (admin can see all)
  // Note: This check is removed for admin endpoints, but kept for public endpoints
  // Since this is called from getQuestionById which can be used by both, we'll return it
  // The frontend chatbot will handle filtering if needed

  return res
    .status(200)
    .json(new ApiResponse(200, question, "Question fetched successfully"));
});

const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await ConversationFlow.findAll({
    where: { isActive: true },
    order: [['orderIndex', 'ASC'], ['createdAt', 'ASC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "All questions fetched successfully"));
});

const getAllQuestionsAdmin = asyncHandler(async (req, res) => {
  const questions = await ConversationFlow.findAll({
    order: [['orderIndex', 'ASC'], ['createdAt', 'ASC']],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "All questions fetched successfully for admin"));
});

const createQuestion = asyncHandler(async (req, res) => {
  const { question, options, isActive, isInitial, orderIndex } = req.body;

  // Validation
  validateString(question, 'Question', { required: true, minLength: 1, maxLength: 1000 });
  validateArray(options, 'Options', { required: true, minLength: 1 });
  
  // Validate each option structure
  options.forEach((opt, index) => {
    if (!opt || typeof opt !== 'object') {
      throw new ApiError(400, `Option at index ${index} must be an object`);
    }
    if (!opt.option || typeof opt.option !== 'string' || opt.option.trim() === '') {
      throw new ApiError(400, `Option at index ${index} must have a valid 'option' string`);
    }
    if (!opt.answer || typeof opt.answer !== 'string' || opt.answer.trim() === '') {
      throw new ApiError(400, `Option at index ${index} must have a valid 'answer' string`);
    }
    validateString(opt.option, `Option ${index} option`, { maxLength: 255 });
    validateString(opt.answer, `Option ${index} answer`, { maxLength: 2000 });
    if (opt.nextQuestionId !== undefined && opt.nextQuestionId !== null) {
      validateString(opt.nextQuestionId, `Option ${index} nextQuestionId`, { maxLength: 255 });
    }
  });
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }
  
  if (isInitial !== undefined) {
    validateBoolean(isInitial, 'Is Initial');
  }

  const t = await sequelize.transaction();
  try {
    const newQuestion = await ConversationFlow.create({
      question: question.trim(),
      options: options.map(opt => ({
        option: opt.option.trim(),
        answer: opt.answer.trim(),
        nextQuestionId: opt.nextQuestionId ? opt.nextQuestionId.trim() : null,
      })),
      isActive: isActive !== undefined ? isActive : true,
      isInitial: isInitial !== undefined ? isInitial : false,
      orderIndex: orderIndex || 0,
    }, { transaction: t });

    await t.commit();

    return res
      .status(201)
      .json(new ApiResponse(201, newQuestion, "Question created successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error creating question:", error);
    throw error;
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, options, isActive, isInitial, orderIndex } = req.body;

  // Validate ID
  validateId(id, 'ID');
  
  // Validation
  validateString(question, 'Question', { required: true, minLength: 1, maxLength: 1000 });
  validateArray(options, 'Options', { required: true, minLength: 1 });
  
  // Validate each option structure
  options.forEach((opt, index) => {
    if (!opt || typeof opt !== 'object') {
      throw new ApiError(400, `Option at index ${index} must be an object`);
    }
    if (!opt.option || typeof opt.option !== 'string' || opt.option.trim() === '') {
      throw new ApiError(400, `Option at index ${index} must have a valid 'option' string`);
    }
    if (!opt.answer || typeof opt.answer !== 'string' || opt.answer.trim() === '') {
      throw new ApiError(400, `Option at index ${index} must have a valid 'answer' string`);
    }
    validateString(opt.option, `Option ${index} option`, { maxLength: 255 });
    validateString(opt.answer, `Option ${index} answer`, { maxLength: 2000 });
    if (opt.nextQuestionId !== undefined && opt.nextQuestionId !== null) {
      validateString(opt.nextQuestionId, `Option ${index} nextQuestionId`, { maxLength: 255 });
    }
  });
  
  if (orderIndex !== undefined) {
    validateNumber(orderIndex, 'Order Index', { integer: true, min: 0 });
  }
  
  if (isActive !== undefined) {
    validateBoolean(isActive, 'Is Active');
  }
  
  if (isInitial !== undefined) {
    validateBoolean(isInitial, 'Is Initial');
  }

  const t = await sequelize.transaction();
  try {
    const conversation = await ConversationFlow.findByPk(id, { transaction: t });

    if (!conversation) {
      throw new ApiError(404, "Question not found");
    }

    console.log("Found conversation:", conversation.id);
    console.log("Current options:", JSON.stringify(conversation.options));
    console.log("New options to save:", JSON.stringify(options));

    // Use set() to explicitly mark fields as changed
    conversation.set('question', question.trim());
    const formattedOptions = options.map(opt => ({
      option: opt.option.trim(),
      answer: opt.answer.trim(),
      nextQuestionId: opt.nextQuestionId ? opt.nextQuestionId.trim() : null,
    }));
    conversation.set('options', formattedOptions);
    if (isActive !== undefined) conversation.set('isActive', isActive);
    if (isInitial !== undefined) conversation.set('isInitial', isInitial);
    if (orderIndex !== undefined) conversation.set('orderIndex', orderIndex);

    console.log("Before save - conversation.options:", JSON.stringify(conversation.options));
    console.log("Changed fields:", conversation.changed());
    
    await conversation.save({ transaction: t });
    
    // Reload to get the saved data from database
    await conversation.reload({ transaction: t });
    
    console.log("After save and reload - conversation.options:", JSON.stringify(conversation.options));
    
    await t.commit();

    console.log("Question updated successfully:", conversation.id);
    console.log("Final saved options:", JSON.stringify(conversation.options));

    return res
      .status(200)
      .json(new ApiResponse(200, conversation, "Question updated successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error updating question:", error);
    console.error("Error stack:", error.stack);
    throw error;
  }
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate ID
  validateId(id, 'ID');

  const t = await sequelize.transaction();
  try {
    const conversation = await ConversationFlow.findByPk(id, { transaction: t });

    if (!conversation) {
      throw new ApiError(404, "Question not found");
    }

    await conversation.destroy({ transaction: t });
    await t.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Question deleted successfully"));
  } catch (error) {
    await t.rollback();
    console.error("Error deleting question:", error);
    throw error;
  }
});

export {
  getInitialQuestion,
  getQuestionById,
  getAllQuestions,
  getAllQuestionsAdmin,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  seedInitialData,
};
