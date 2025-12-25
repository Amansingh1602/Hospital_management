import mongoose from "mongoose";
import { User } from "./models/userSchema.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config.env" });

// Admin credentials from environment variables
const adminData = {
  firstName: process.env.ADMIN_FIRST_NAME || "Admin",
  lastName: process.env.ADMIN_LAST_NAME || "User",
  email: process.env.ADMIN_EMAIL,
  phone: process.env.ADMIN_PHONE || "0000000000",
  dob: process.env.ADMIN_DOB || "1990-01-01",
  gender: process.env.ADMIN_GENDER || "Male",
  password: process.env.ADMIN_PASSWORD,
  role: "Admin"
};

// Validate required environment variables
if (!adminData.email || !adminData.password) {
  console.error("❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in config.env");
  process.exit(1);
}

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "hospital_management",
    });
    console.log("Connected to database!");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("❌ Admin already exists with this email!");
      console.log("\nAdmin Credentials:");
      console.log("==================");
      console.log("Email:", adminData.email);
      console.log("Password: [set in config.env]");
      console.log("Role: Admin");
      process.exit(0);
    }

    // Create admin
    const admin = await User.create(adminData);
    
    console.log("✅ Admin created successfully!");
    console.log("\nAdmin Credentials:");
    console.log("==================");
    console.log("Email:", adminData.email);
    console.log("Password: [as set in config.env]");
    console.log("Role: Admin");
    console.log("\nYou can now login to the dashboard at:");
    console.log("http://localhost:5174");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
