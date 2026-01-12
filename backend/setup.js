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

    // Display summary
    const totalUsers = await User.count();
    console.log(`\n📊 Database Summary:`);
    console.log(`   Total users: ${totalUsers}`);
    
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

