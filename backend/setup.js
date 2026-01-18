import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "node:fs";

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables FIRST before any database imports
const envPath = join(__dirname, ".env");
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`✓ Loaded .env from: ${envPath}`);
} else {
  dotenv.config(); // Try default location
  console.log("⚠ Using default .env location");
}

// Debug: Show database connection details (without password)
console.log("\n📋 Database Configuration:");
console.log(`   DB_HOST: ${process.env.DB_HOST || "NOT SET"}`);
console.log(`   DB_NAME: ${process.env.DB_NAME || "NOT SET"}`);
console.log(`   DB_USERNAME: ${process.env.DB_USERNAME || "NOT SET"}`);
console.log(`   DB_PASSWORD: ${process.env.DB_PASSWORD ? "***" : "NOT SET"}`);

// Validate required environment variables
if (!process.env.DB_NAME || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  console.error("\n❌ Missing required database environment variables!");
  console.error("Please ensure your .env file contains:");
  console.error("  DB_NAME");
  console.error("  DB_USERNAME");
  console.error("  DB_PASSWORD");
  console.error("  DB_HOST");
  process.exit(1);
}

const setupDatabase = async () => {
  // Import database modules after env vars are loaded
  const { default: sequelize } = await import("./src/db/index.js");
  const { default: User } = await import("./src/models/user.model.js");
  const { default: Internship } = await import("./src/models/internship.model.js");
  const { default: Notification } = await import("./src/models/notification.model.js");
  const { default: Pricing } = await import("./src/models/pricing.model.js");
  const { default: Update } = await import("./src/models/update.model.js");
  const { default: Admin } = await import("./src/models/admin.model.js");
  const { default: ContactInfo } = await import("./src/models/contactInfo.model.js");
  const { default: Conversation } = await import("./src/models/conversation.model.js");
  const { default: FAQ } = await import("./src/models/faq.model.js");
  const { default: Footer } = await import("./src/models/footer.model.js");
  const { default: Navbar } = await import("./src/models/navbar.model.js");
  const { default: Product } = await import("./src/models/product.model.js");
  const { default: Service } = await import("./src/models/service.model.js");
  const { default: Testimonial } = await import("./src/models/testimonial.model.js");
  
  try {
    console.log("\nConnecting to database...");
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✓ Database connection established successfully.");

    // Sync all models (create tables if they don't exist)
    console.log("\nSyncing database models...");
    await sequelize.sync({ alter: true });
    console.log("✓ Database models synced successfully.");

    // Check if there are existing users
    const existingUsersList = await User.findAll({ attributes: ["id"] });
    const existingCount = existingUsersList.length;
    
    if (existingCount > 0) {
      console.log(`\n⚠ Found ${existingCount} existing user(s) in database.`);
      console.log("Skipping seed data to avoid duplicates.");
      console.log("To reset and seed fresh data, delete all users first.");
    } else {
      console.log("\nSeeding initial data...");
      
      // Sample initial contact form submissions
      const initialUsers = [
        {
          fullname: "John Doe",
          email: "john.doe@example.com",
          subject: "Website Inquiry",
          message: "I'm interested in learning more about your services. Please contact me at your earliest convenience.",
        },
        {
          fullname: "Jane Smith",
          email: "jane.smith@example.com",
          subject: "Partnership Opportunity",
          message: "We would like to discuss a potential partnership with your company. Let's schedule a meeting.",
        },
        {
          fullname: "Robert Johnson",
          email: "robert.j@example.com",
          subject: "Technical Support",
          message: "I need assistance with your platform. Can someone from your technical team reach out?",
        },
        {
          fullname: "Emily Davis",
          email: "emily.davis@example.com",
          subject: "Product Demo Request",
          message: "I'd like to request a demo of your product. Please let me know your availability.",
        },
        {
          fullname: "Michael Brown",
          email: "michael.brown@example.com",
          subject: "General Inquiry",
          message: "I have some questions about your pricing and features. Could you provide more information?",
        },
      ];

      // Get the current max ID to generate sequential IDs (should be 0 if no users exist)
      const numbers = existingUsersList
        .map((u) => parseInt(u.id?.replace("usr", "")))
        .filter((num) => !isNaN(num));
      const maxId = numbers.length ? Math.max(...numbers) : 0;
      
      // Create users with manually assigned IDs to avoid hook conflicts in batch inserts
      const transaction = await sequelize.transaction();
      
      try {
        for (let i = 0; i < initialUsers.length; i++) {
          const newId = `usr${String(maxId + i + 1).padStart(3, "0")}`;
          await User.create({ ...initialUsers[i], id: newId }, { transaction });
        }
        
        await transaction.commit();
        console.log(`✓ Successfully seeded ${initialUsers.length} initial users.`);
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }

    // Seed default pricing data if not exists
    const existingPricings = await Pricing.findAll();
    if (existingPricings.length === 0) {
      console.log("\nSeeding default pricing data...");
      const defaultPricings = [
        { duration: 1, price: 3000.00, isActive: true },
        { duration: 2, price: 4500.00, isActive: true },
        { duration: 3, price: 6000.00, isActive: true },
        { duration: 4, price: 7500.00, isActive: true },
        { duration: 5, price: 9000.00, isActive: true },
        { duration: 6, price: 10500.00, isActive: true },
      ];

      const transaction = await sequelize.transaction();
      try {
        for (const pricing of defaultPricings) {
          await Pricing.create(pricing, { transaction });
        }
        await transaction.commit();
        console.log(`✓ Successfully seeded ${defaultPricings.length} default pricing plans.`);
      } catch (error) {
        await transaction.rollback();
        console.error("Error seeding pricing data:", error);
      }
    } else {
      console.log(`\n✓ Found ${existingPricings.length} existing pricing plan(s).`);
    }

    // Display summary
    const totalUsers = await User.count();
    const totalInternships = await Internship.count();
    const totalNotifications = await Notification.count();
    const totalPricings = await Pricing.count();
    const totalUpdates = await Update.count();
    const totalAdmins = await Admin.count();
    const totalContactInfo = await ContactInfo.count();
    const totalConversations = await Conversation.count();
    const totalFAQs = await FAQ.count();
    const totalFooter = await Footer.count();
    const totalNavbar = await Navbar.count();
    const totalProducts = await Product.count();
    const totalServices = await Service.count();
    const totalTestimonials = await Testimonial.count();
    
    console.log(`\n📊 Database Summary (All Tables):`);
    console.log(`   ✓ Users: ${totalUsers}`);
    console.log(`   ✓ Internships: ${totalInternships}`);
    console.log(`   ✓ Notifications: ${totalNotifications}`);
    console.log(`   ✓ Pricing Plans: ${totalPricings}`);
    console.log(`   ✓ Updates: ${totalUpdates}`);
    console.log(`   ✓ Admins: ${totalAdmins}`);
    console.log(`   ✓ Contact Info: ${totalContactInfo}`);
    console.log(`   ✓ Conversations: ${totalConversations}`);
    console.log(`   ✓ FAQs: ${totalFAQs}`);
    console.log(`   ✓ Footer Items: ${totalFooter}`);
    console.log(`   ✓ Navbar Items: ${totalNavbar}`);
    console.log(`   ✓ Products: ${totalProducts}`);
    console.log(`   ✓ Services: ${totalServices}`);
    console.log(`   ✓ Testimonials: ${totalTestimonials}`);
    
    // Display all users
    const allUsers = await User.findAll({
      attributes: ["id", "fullname", "email", "subject"],
      order: [["id", "ASC"]],
    });
    
    if (allUsers.length > 0) {
      console.log(`\n📋 Users in database:`);
      allUsers.forEach((user) => {
        console.log(`   ${user.id} - ${user.fullname} (${user.email}) - ${user.subject}`);
      });
    }

    // Display all internships
    const allInternships = await Internship.findAll({
      attributes: ["id", "fullName", "email", "duration", "college"],
      order: [["id", "ASC"]],
    });
    
    if (allInternships.length > 0) {
      console.log(`\n📋 Internship Applications in database:`);
      allInternships.forEach((internship) => {
        console.log(`   ${internship.id} - ${internship.fullName} (${internship.email}) - ${internship.duration} months - ${internship.college}`);
      });
    }

    console.log("\n✅ Database setup completed successfully!");
    
  } catch (error) {
    console.error("\n❌ Error during database setup:");
    console.error(error.message);
    if (error.original) {
      console.error("Original error:", error.original.message);
    }
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log("\nDatabase connection closed.");
  }
};

// Run the setup
setupDatabase();

