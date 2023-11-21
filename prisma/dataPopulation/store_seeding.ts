import prisma from "../../lib/prisma";

const storeData = [
  {
    name: "store1",
    address: "123 Main St",
  },
  {
    name: "store2",
    address: "456 Elm St",
  },
  {
    name: "store3",
    address: "789 Oak St",
  },
];

export const seedStores = async () => {
  for (const s of storeData) {
    const store = await prisma.store.create({
      data: s,
    });
    console.log(`Created store with id: ${store.id}`);
  }
};
