import prisma from "../../lib/prisma";

const storeData = [
  {
    name: "London store",
    lat: 51.5072,
    long: 0.1276,
    phone: "123-456-7890",
    address: "123 Main St",
  },
  {
    name: "Los Angeles store",
    lat: 34.0522,
    long: 118.2437,
    phone: "123-456-9872",
    address: "456 Elm St",
  },
  {
    name: "Egham store",
    lat: 51.42,
    long: 0.57,
    phone: "343-422-7890",
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
