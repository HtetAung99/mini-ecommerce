import prisma from "../../lib/prisma";

const attributeData = [
  { name: "default", attributeValues: { create: [{ name: "default" }] } },
  {
    name: "color",
    attributeValues: {
      create: [
        { name: "red" },
        { name: "blue" },
        { name: "green" },
        { name: "silver" },
        { name: "rose gold" },
        { name: "black" },
        { name: "white" },
        { name: "gold" },
      ],
    },
  },
  {
    name: "size",
    attributeValues: {
      create: [
        { name: "small" },
        { name: "medium" },
        { name: "large" },
        { name: "x-large" },
        { name: "xx-large" },
      ],
    },
  },
  {
    name: "storage",
    attributeValues: {
      create: [
        { name: "128GB" },
        { name: "256GB" },
        { name: "512GB" },
        { name: "1TB" },
        { name: "2TB" },
      ],
    },
  },
  {
    name: "material",
    attributeValues: {
      create: [
        { name: "leather" },
        { name: "metal" },
        { name: "plastic" },
        { name: "wood" },
        { name: "fabric" },
      ],
    },
  },
  {
    name: "style",
    attributeValues: {
      create: [
        { name: "casual" },
        { name: "formal" },
        { name: "sporty" },
        { name: "vintage" },
        { name: "modern" },
      ],
    },
  },
  {
    name: "resolution",
    attributeValues: {
      create: [
        { name: "HD" },
        { name: "Full HD" },
        { name: "4K" },
        { name: "8K" },
      ],
    },
  },
  {
    name: "fit",
    attributeValues: {
      create: [
        { name: "regular fit" },
        { name: "slim fit" },
        { name: "loose fit" },
        { name: "athletic fit" },
      ],
    },
  },
  {
    name: "weight",
    attributeValues: {
      create: [
        { name: "lightweight" },
        { name: "midweight" },
        { name: "heavyweight" },
      ],
    },
  },
  {
    name: "screen size",
    attributeValues: {
      create: [
        { name: "40-inch" },
        { name: "50-inch" },
        { name: "55-inch" },
        { name: "65-inch" },
        { name: "70-inch" },
      ],
    },
  },
  // Add more attributes and values as needed.
];

// You can continue extending the array with more attributes and values.

export const seedAttributes = async () => {
  for (const a of attributeData) {
    const attribute = await prisma.attribute.create({ data: a });
    console.log(`Created attribute with id: ${attribute.id}`);
  }
};
