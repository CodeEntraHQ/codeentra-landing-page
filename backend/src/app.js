import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT;

import sequelize from "./db/index.js";

// routes import
import userRouter from "./routes/user.route.js";
import internshipRouter from "./routes/internship.route.js";
import notificationRouter from "./routes/notification.route.js";
import pricingRouter from "./routes/pricing.route.js";
import updateRouter from "./routes/update.route.js";
import faqRouter from "./routes/faq.route.js";
import conversationRouter from "./routes/conversation.route.js";
import productRouter from "./routes/product.route.js";
import serviceRouter from "./routes/service.route.js";
import testimonialRouter from "./routes/testimonial.route.js";
import contactInfoRouter from "./routes/contactInfo.route.js";
import footerRouter from "./routes/footer.route.js";
import navbarRouter from "./routes/navbar.route.js";
import adminRouter from "./routes/admin.route.js";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from uploads directory
app.use("/uploads", express.static(join(__dirname, "../uploads")));

// database relation

// routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/internship", internshipRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/pricing", pricingRouter);
app.use("/api/v1/updates", updateRouter);
app.use("/api/v1/faqs", faqRouter);
app.use("/api/v1/conversation", conversationRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/testimonials", testimonialRouter);
app.use("/api/v1/contact-info", contactInfoRouter);
app.use("/api/v1/footer", footerRouter);
app.use("/api/v1/navbar", navbarRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello belal World!");
});

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error("Error middleware caught:", err);
  console.error("Error stack:", err.stack);
  
  // Check if it's an ApiError (has statusCode property)
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || "Something went wrong",
      errors: err.errors || [],
      data: null,
    });
  }

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors?.map(e => e.message) || [err.message],
      data: null,
    });
  }

  // Handle Sequelize database errors
  if (err.name === "SequelizeDatabaseError" || err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Database error",
      errors: [err.message],
      data: null,
    });
  }

  // Default error response
  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
    errors: [],
    data: null,
  });
});

// Import models to ensure they're registered with Sequelize
import "./models/product.model.js";
import "./models/service.model.js";
import "./models/testimonial.model.js";
import "./models/contactInfo.model.js";
import "./models/footer.model.js";
import "./models/navbar.model.js";
import "./models/admin.model.js";

// Import and seed conversation data after sync
import { seedInitialData } from "./controllers/conversation.controller.js";
import Product from "./models/product.model.js";
import Service from "./models/service.model.js";
import Testimonial from "./models/testimonial.model.js";
import ContactInfo from "./models/contactInfo.model.js";
import Footer from "./models/footer.model.js";
import Navbar from "./models/navbar.model.js";
import Admin from "./models/admin.model.js";

// Seed initial product data
const seedProductData = async () => {
  const existing = await Product.findOne({ where: { id: 'prod001' } });
  if (existing) {
    console.log('Product data already exists, skipping seed');
    return;
  }

  try {
    await Product.create({
      id: 'prod001',
      name: 'ExamEntra',
      description: 'A comprehensive examination management platform designed to streamline the entire exam process. From creation to evaluation, ExamEntra makes exam management effortless and efficient.',
      url: 'https://examentra.homelabcraft.ovh/',
      icon: 'Sparkles',
      features: ['Easy Exam Creation', 'Automated Evaluation', 'Real-time Analytics', 'Secure Platform'],
      isActive: true,
      orderIndex: 1,
    });
    console.log('Initial product data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial product data:', error);
  }
};

// Seed initial testimonials data
const seedTestimonialData = async () => {
  const existing = await Testimonial.findOne({ where: { id: 'tst001' } });
  if (existing) {
    console.log('Testimonial data already exists, skipping seed');
    return;
  }

  try {
    const initialTestimonials = [
      {
        id: 'tst001',
        quote: 'codeEntra transformed our outdated systems into a streamlined, modern infrastructure. Their expertise in DevOps was invaluable, and the results have significantly improved our productivity.',
        name: 'Abhishek',
        title: 'Principal',
        company: 'University partner',
        rating: 5,
        isActive: true,
        orderIndex: 1,
      },
      {
        id: 'tst002',
        quote: 'Working with codeEntra on our web application was a game-changer. Their team delivered beyond our expectations, creating an intuitive platform that our users love.',
        name: 'Suhani',
        title: 'HOD',
        company: 'EcoSolutions',
        rating: 5,
        isActive: true,
        orderIndex: 2,
      },
      {
        id: 'tst003',
        quote: 'The cloud migration support from codeEntra was excellent. Their team guided us through every step with clear communication and technical expertise.',
        name: 'Sourabh',
        title: 'HOC',
        company: 'Global client Partners',
        rating: 4,
        isActive: true,
        orderIndex: 3,
      },
    ];

    for (const testimonial of initialTestimonials) {
      await Testimonial.create(testimonial);
    }
    console.log('Initial testimonials data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial testimonials data:', error);
  }
};

// Seed initial services data
const seedServiceData = async () => {
  const existing = await Service.findOne({ where: { id: 'srv001' } });
  if (existing) {
    console.log('Service data already exists, skipping seed');
    return;
  }

  try {
    const initialServices = [
      {
        id: 'srv001',
        title: 'Web Development',
        description: 'Custom websites and web applications built with the latest technologies to create powerful digital experiences.',
        fullDescription: null,
        icon: 'code',
        isActive: true,
        orderIndex: 1,
      },
      {
        id: 'srv002',
        title: 'DevOps Solutions',
        description: 'Streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process.',
        fullDescription: null,
        icon: 'settings',
        isActive: true,
        orderIndex: 2,
      },
      {
        id: 'srv003',
        title: 'Cloud Services',
        description: 'Expert cloud solutions for AWS, Azure, and GCP to help you scale your infrastructure efficiently and securely.',
        fullDescription: null,
        icon: 'cloud',
        isActive: true,
        orderIndex: 3,
      },
      {
        id: 'srv004',
        title: 'UX/UI Design',
        description: 'User-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers.',
        fullDescription: null,
        icon: 'design',
        isActive: true,
        orderIndex: 4,
      },
      {
        id: 'srv005',
        title: 'IT Consulting',
        description: 'Strategic technology consulting to help your business make the right decisions for sustainable growth and innovation.',
        fullDescription: null,
        icon: 'consulting',
        isActive: true,
        orderIndex: 5,
      },
      {
        id: 'srv006',
        title: 'Cybersecurity',
        description: 'Comprehensive security solutions to protect your business from threats and ensure compliance with regulations.',
        fullDescription: null,
        icon: 'security',
        isActive: true,
        orderIndex: 6,
      },
      {
        id: 'srv007',
        title: 'IT Staffing Solutions',
        description: 'Expert IT professionals and technical talent on-demand. We provide skilled employees to companies needing qualified staff for their projects and operations.',
        fullDescription: null,
        icon: 'staffing',
        isActive: true,
        orderIndex: 7,
      },
      {
        id: 'srv008',
        title: 'Website Maintenance & Support',
        description: 'Comprehensive website maintenance services including updates, security patches, performance optimization, and ongoing support for colleges, institutions, and businesses.',
        fullDescription: null,
        icon: 'maintenance',
        isActive: true,
        orderIndex: 8,
      },
      {
        id: 'srv009',
        title: 'Marketing & Advertisement Services',
        description: 'Comprehensive marketing and promotional services for your business or college. We organize seminars, workshops, and promotional events in other institutions and schools to expand your reach and visibility.',
        fullDescription: 'We provide end-to-end marketing and advertisement solutions tailored for businesses and educational institutions. Our services include organizing seminars and workshops in partner institutions and schools, creating promotional campaigns, managing event logistics, and ensuring maximum visibility for your brand. Whether you\'re a college looking to attract students or a business seeking to expand your market presence, we help you connect with your target audience through strategic marketing initiatives.',
        icon: 'marketing',
        isActive: true,
        orderIndex: 9,
      },
    ];

    for (const service of initialServices) {
      await Service.create(service);
    }
    console.log('Initial services data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial services data:', error);
  }
};

// Seed initial contact info data
const seedContactInfoData = async () => {
  const existing = await ContactInfo.findOne({ where: { id: 'cont001' } });
  if (existing) {
    console.log('Contact info data already exists, skipping seed');
    return;
  }

  try {
    const initialContactInfo = [
      {
        id: 'cont001',
        type: 'office',
        label: 'Our Office',
        value: 'CodeEntra Unlocking Solutions Pvt. Ltd.\nKhata No. 64, Bhagwat Nag, Adarsh Colony, Kumhrar, Patna- 800026, Bihar',
        orderIndex: 1,
        isActive: true,
      },
      {
        id: 'cont002',
        type: 'email',
        label: 'Email Us',
        value: 'info@codeentra.com',
        orderIndex: 2,
        isActive: true,
      },
      {
        id: 'cont003',
        type: 'phone',
        label: 'Call Us',
        value: '+(91) 8105791804',
        orderIndex: 3,
        isActive: true,
      },
    ];

    for (const contactInfo of initialContactInfo) {
      await ContactInfo.create(contactInfo);
    }
    console.log('Initial contact info data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial contact info data:', error);
  }
};

// Seed initial footer data
const seedFooterData = async () => {
  const existing = await Footer.findOne({ where: { id: 'foot001' } });
  if (existing) {
    console.log('Footer data already exists, skipping seed');
    return;
  }

  try {
    const initialFooter = [
      {
        id: 'foot001',
        section: 'company',
        title: 'codeEntra',
        content: 'Providing innovative tech unlocking solutions to help your business grow and succeed in the digital landscape.',
        url: null,
        icon: null,
        orderIndex: 1,
        isActive: true,
      },
      {
        id: 'foot002',
        section: 'services',
        title: 'Services',
        content: 'Web Development',
        url: '#',
        icon: null,
        orderIndex: 1,
        isActive: true,
      },
      {
        id: 'foot003',
        section: 'services',
        title: 'Services',
        content: 'DevOps Solutions',
        url: '#',
        icon: null,
        orderIndex: 2,
        isActive: true,
      },
      {
        id: 'foot004',
        section: 'services',
        title: 'Services',
        content: 'Cloud Services',
        url: '#',
        icon: null,
        orderIndex: 3,
        isActive: true,
      },
      {
        id: 'foot005',
        section: 'services',
        title: 'Services',
        content: 'UX/UI Design',
        url: '#',
        icon: null,
        orderIndex: 4,
        isActive: true,
      },
      {
        id: 'foot006',
        section: 'companyLinks',
        title: 'Company',
        content: 'About Us',
        url: '#about',
        icon: null,
        orderIndex: 1,
        isActive: true,
      },
      {
        id: 'foot007',
        section: 'companyLinks',
        title: 'Company',
        content: 'Our Team',
        url: '#',
        icon: null,
        orderIndex: 2,
        isActive: true,
      },
      {
        id: 'foot008',
        section: 'companyLinks',
        title: 'Company',
        content: 'Careers',
        url: '#',
        icon: null,
        orderIndex: 3,
        isActive: true,
      },
      {
        id: 'foot009',
        section: 'companyLinks',
        title: 'Company',
        content: 'Contact Us',
        url: '#contact',
        icon: null,
        orderIndex: 4,
        isActive: true,
      },
      {
        id: 'foot010',
        section: 'social',
        title: 'Connect',
        content: null,
        url: 'https://www.facebook.com/people/codeEntra/61577066431979/?sk=about',
        icon: 'facebook',
        orderIndex: 1,
        isActive: true,
      },
      {
        id: 'foot011',
        section: 'social',
        title: 'Connect',
        content: null,
        url: 'https://x.com/codeentra?s=21',
        icon: 'twitter',
        orderIndex: 2,
        isActive: true,
      },
      {
        id: 'foot012',
        section: 'social',
        title: 'Connect',
        content: null,
        url: 'https://www.instagram.com/codeentra?igsh=MWtqbHk0eHJ2cnZobA%3D%3D&utm_source=qr',
        icon: 'instagram',
        orderIndex: 3,
        isActive: true,
      },
      {
        id: 'foot013',
        section: 'social',
        title: 'Connect',
        content: null,
        url: 'https://www.linkedin.com/company/codeentra/',
        icon: 'linkedin',
        orderIndex: 4,
        isActive: true,
      },
      {
        id: 'foot014',
        section: 'copyright',
        title: null,
        content: '© 2025 codeEntra. All rights reserved.',
        url: null,
        icon: null,
        orderIndex: 1,
        isActive: true,
      },
    ];

    for (const footerItem of initialFooter) {
      await Footer.create(footerItem);
    }
    console.log('Initial footer data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial footer data:', error);
  }
};

// Seed initial navbar data
const seedNavbarData = async () => {
  const existing = await Navbar.findOne({ where: { id: 'nav001' } });
  if (existing) {
    console.log('Navbar data already exists, skipping seed');
    return;
  }

  try {
    const initialNavbar = [
      {
        id: 'nav001',
        label: 'Services',
        url: '#services',
        orderIndex: 1,
        isActive: true,
      },
      {
        id: 'nav002',
        label: 'About',
        url: '#about',
        orderIndex: 2,
        isActive: true,
      },
      {
        id: 'nav003',
        label: 'Products',
        url: '#products',
        orderIndex: 3,
        isActive: true,
      },
      {
        id: 'nav004',
        label: 'Testimonials',
        url: '#testimonials',
        orderIndex: 4,
        isActive: true,
      },
      {
        id: 'nav005',
        label: 'Career',
        url: '#career',
        orderIndex: 5,
        isActive: true,
      },
      {
        id: 'nav006',
        label: 'Contact',
        url: '#contact',
        orderIndex: 6,
        isActive: true,
      },
      {
        id: 'nav007',
        label: 'Get Started',
        url: '#contact',
        orderIndex: 7,
        isActive: true,
      },
    ];

    for (const navbarItem of initialNavbar) {
      await Navbar.create(navbarItem);
    }
    console.log('Initial navbar data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial navbar data:', error);
  }
};

sequelize
  .sync({ alter: true }) // Use alter: true to add missing columns
//  .sync({force:true})
  .then(async () => {
    // Seed conversation data after sync
    try {
      await seedInitialData();
    } catch (error) {
      console.error("Error seeding conversation data:", error);
    }
    
    // Seed product data after sync
    try {
      await seedProductData();
    } catch (error) {
      console.error("Error seeding product data:", error);
    }
    
    // Seed services data after sync
    try {
      await seedServiceData();
    } catch (error) {
      console.error("Error seeding services data:", error);
    }
    
    // Seed testimonials data after sync
    try {
      await seedTestimonialData();
    } catch (error) {
      console.error("Error seeding testimonials data:", error);
    }
    
    // Seed contact info data after sync
    try {
      await seedContactInfoData();
    } catch (error) {
      console.error("Error seeding contact info data:", error);
    }
    
    // Seed footer data after sync
    try {
      await seedFooterData();
    } catch (error) {
      console.error("Error seeding footer data:", error);
    }
    
    // Seed navbar data after sync
    try {
      await seedNavbarData();
    } catch (error) {
      console.error("Error seeding navbar data:", error);
    }
    
    // Seed admin data after sync
    const seedAdminData = async () => {
      const existing = await Admin.findOne({ where: { id: 'admin001' } });
      if (existing) {
        console.log('Admin data already exists, skipping seed');
        return;
      }

      try {
        // Default password: 'password' (will be hashed by model hook)
        await Admin.create({
          id: 'admin001',
          email: 'codeentrasocial10@gmail.com',
          password: 'password', // Will be hashed by beforeCreate hook
        });
        console.log('Initial admin data seeded successfully');
      } catch (error) {
        console.error('Error seeding initial admin data:', error);
      }
    };
    
    try {
      await seedAdminData();
    } catch (error) {
      console.error("Error seeding admin data:", error);
    }
    
    app.on("error", (error) => {
      console.log("Error Event For App !!", error);
    });
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
