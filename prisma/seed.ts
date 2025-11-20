import { PrismaClient } from "../app/generated/prisma/index.js";

const prisma = new PrismaClient();

const PRODUCT_NAMES = [
  "Ergonomic Wireless Mouse",
  "Mechanical Gaming Keyboard",
  "4K UHD LED Monitor 27\"",
  "Noise-Cancelling Headphones",
  "Portable Bluetooth Speaker",
  "USB-C Docking Station",
  "External Solid State Drive 1TB",
  "Mesh Wi-Fi Router System",
  "Premium Leather Notebook A5",
  "Gel Ink Pen Set (12 Colors)",
  "Heavy Duty Filing Cabinet",
  "Thermal Label Printer",
  "Security Camera Kit (4 pack)",
  "Smart Home Thermostat",
  "Robot Vacuum Cleaner",
  "Electric Stand Mixer",
  "Stainless Steel Water Bottle 24oz",
  "Digital Kitchen Scale",
  "High-Speed Blender",
  "Premium Drip Coffee Maker",
  "Fitness Tracker Watch",
  "Yoga Mat Extra Thick",
  "Resistance Band Set (5 levels)",
  "Insulated Lunch Bag",
  "Rechargeable LED Flashlight",
];

async function main() {
  const demoUserId = "03f1deb4-3fbc-41cc-8397-f741371fff18";
  
  // Ensure the list has the correct length
  if (PRODUCT_NAMES.length !== 25) {
      console.error("Error: PRODUCT_NAMES list must contain exactly 25 items.");
      process.exit(1);
  }

  // Seed the database with initial data
  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: PRODUCT_NAMES[i], // 👈 Using specific product names
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20) + 1,
      lowStockAt: 5,
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24),
    })),
    skipDuplicates: true,
  });
  console.log("Seed data created successfully");
  console.log(`Created 25 unique products for user ID: ${demoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });