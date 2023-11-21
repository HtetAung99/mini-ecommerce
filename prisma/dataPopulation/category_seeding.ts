import prisma from "../../lib/prisma";
const categoryData = [
  { name: "Electronics" },
  { name: "Smart Phone", parentId: 1 },
  { name: "Apple", parentId: 2 },
  { name: "Samsung", parentId: 2 },
  { name: "Laptop", parentId: 1 },
  { name: "Gaming Laptop", parentId: 5 },
  { name: "Clothing" },
  { name: "Men's Clothing", parentId: 7 },
  { name: "Women's Clothing", parentId: 7 },
  { name: "Children's Clothing", parentId: 7 },
  { name: "Accessories", parentId: 1 },
  { name: "Headphones", parentId: 10 },
  { name: "Speakers", parentId: 10 },
  { name: "T-Shirts", parentId: 8 },
  { name: "Dresses", parentId: 9 },
  { name: "Sports Wear", parentId: 9 },
  { name: "Appliances" },
  { name: "Kitchen Appliances", parentId: 17 },
  { name: "Refrigerators", parentId: 18 },
  { name: "Washing Machines", parentId: 18 },
  { name: "Furniture" },
  { name: "Living Room Furniture", parentId: 21 },
  { name: "Sofas", parentId: 22 },
  { name: "Tables", parentId: 22 },
  { name: "Bedroom Furniture", parentId: 21 },
  { name: "Beds", parentId: 25 },
  { name: "Dressers", parentId: 25 },
  { name: "Home Decor" },
  { name: "Wall Art", parentId: 28 },
  { name: "Candles", parentId: 28 },
  { name: "Mirrors", parentId: 28 },
];

export const seedCategories = async () => {
  for (const c of categoryData) {
    const category = await prisma.category.create({
      data: c,
    });
    console.log(`Created category with id: ${category.id}`);
  }
};
