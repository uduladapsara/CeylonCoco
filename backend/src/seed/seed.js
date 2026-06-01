const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Plantation = require("../models/Plantation");
const Inventory = require("../models/Inventory");
const Product = require("../models/Product");
const Worker = require("../models/Worker");

dotenv.config();

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const seedUsers = async () => {
  const password = await bcrypt.hash("admin123", 10);

  await User.deleteMany({});

  return User.insertMany([
    {
      firstName: "Admin",
      lastName: "User",
      name: "Admin User",
      email: "admin@gmail.com",
      password,
      role: "Admin",
      status: true
    },
    {
      firstName: "Farm",
      lastName: "Manager",
      name: "Farm Manager",
      email: "manager@cocosmart.local",
      password,
      role: "FarmManager",
      status: false
    },
    {
      firstName: "Customer",
      lastName: "User",
      name: "Customer",
      email: "customer@cocosmart.local",
      password,
      role: "Customer",
      status: false
    }
  ]);
};

const seedPlantations = async (adminId) => {
  await Plantation.deleteMany({});

  return Plantation.insertMany([
    {
      name: "Ceylon North Estate",
      location: "Puttalam",
      totalArea: 120,
      treeCount: 5400,
      avgTreeAge: 8,
      treeHealth: "Good",
      createdBy: adminId
    }
  ]);
};

const seedInventory = async (adminId) => {
  await Inventory.deleteMany({});

  return Inventory.insertMany([
    {
      name: "Coconut Oil 1L",
      category: "CoconutOil",
      quantity: 350,
      unit: "bottles",
      minThreshold: 50,
      location: "Main Warehouse",
      createdBy: adminId
    },
    {
      name: "Fertilizer NPK",
      category: "Fertilizer",
      quantity: 1200,
      unit: "kg",
      minThreshold: 200,
      location: "Fertilizer Store",
      createdBy: adminId
    }
  ]);
};

const seedProducts = async (adminId) => {
  await Product.deleteMany({});

  return Product.insertMany([
    {
      name: "Coconut Sugar 500g",
      description: "Organic coconut sugar",
      price: 12.5,
      stock: 500,
      category: "CoconutSugar",
      createdBy: adminId
    },
    {
      name: "Coconut Water 330ml",
      description: "Fresh coconut water",
      price: 2.9,
      stock: 1200,
      category: "CoconutWater",
      createdBy: adminId
    }
  ]);
};

const seedWorkers = async () => {
  await Worker.deleteMany({});

  return Worker.insertMany([
    {
      name: "Sunil Perera",
      phone: "0710000001",
      skills: ["Harvesting", "Irrigation"],
      availability: "Available"
    },
    {
      name: "Kumari Silva",
      phone: "0710000002",
      skills: ["Fertilizer", "Maintenance"],
      availability: "Available"
    }
  ]);
};

const runSeed = async () => {
  try {
    await connect();

    const users = await seedUsers();
    const adminUser = users.find(
      (user) => user.role === "Admin"
    );

    await seedPlantations(adminUser._id);
    await seedInventory(adminUser._id);
    await seedProducts(adminUser._id);
    await seedWorkers();

    console.log("Seed data inserted.");
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

runSeed();
