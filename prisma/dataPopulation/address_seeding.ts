import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

const addressData: Prisma.AddressCreateInput[] = [
  {
    user: { connect: { email: "phyoUser@gmail.com" } },
    name: "Phyo Pyae",
    type: "HOUSE",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    country: "USA",
    postalCode: "12345",
    phoneNumber: "555-1234",
    default: true,
  },
  {
    user: { connect: { email: "phyoUser@gmail.com" } },
    name: "Wai Yan",
    type: "HOUSE",
    address: "456 Oak St",
    city: "Sometown",
    state: "NY",
    country: "USA",
    postalCode: "67890",
    phoneNumber: "555-5678",
    default: false,
  },
  // Add more addresses
  {
    user: { connect: { email: "phyoUser@gmail.com" } },
    name: "Phyo Pyae",
    type: "CONDO",
    address: "789 Pine Ln",
    city: "Villagetown",
    state: "TX",
    country: "USA",
    postalCode: "54321",
    phoneNumber: "555-9876",
    default: false,
  },
  {
    user: { connect: { email: "phyoAdmin@gmail.com" } },
    name: "Phyo Aung",
    type: "HOUSE",
    address: "101 Maple Ave",
    city: "Smallville",
    state: "OH",
    country: "USA",
    postalCode: "98765",
    phoneNumber: "555-4321",
    default: true,
  },
  {
    user: { connect: { email: "phyoAdmin@gmail.com" } },
    name: "Phyo Aung",
    type: "APARTMENT",
    address: "345 Cedar Blvd",
    city: "Cityville",
    state: "FL",
    country: "USA",
    postalCode: "13579",
    phoneNumber: "555-2468",
    default: false,
  },
  {
    user: { connect: { email: "phyoSuperAdmin@gmail.com" } },
    name: "Kanon Imachi",
    type: "HOUSE",
    address: "678 Elm St",
    city: "Metropolis",
    state: "IL",
    country: "USA",
    postalCode: "86420",
    phoneNumber: "555-1357",
    default: true,
  },
  {
    user: { connect: { email: "phyoAdmin@gmail.com" } },
    name: "Wai Yan",
    type: "HOUSE",
    address: "901 Birch Rd",
    city: "Largetown",
    state: "GA",
    country: "USA",
    postalCode: "24680",
    phoneNumber: "555-7890",
    default: false,
  },
  {
    user: { connect: { email: "htetaung@gmail.com" } },
    name: "Htet Aung",
    type: "HOUSE",
    address: "234 Oakwood Dr",
    city: "HOUSEtown",
    state: "CA",
    country: "USA",
    postalCode: "97531",
    phoneNumber: "555-6543",
    default: true,
  },
  {
    user: { connect: { email: "htetaung@gmail.com" } },
    name: "Kaung Sithu",
    type: "HOUSE",
    address: "567 Walnut Ln",
    city: "Newtown",
    state: "NJ",
    country: "USA",
    postalCode: "12309",
    phoneNumber: "555-4321",
    default: false,
  },
  {
    user: { connect: { email: "phyoAdmin@gmail.com" } },
    name: "Kaung Sithu",
    type: "HOUSE",
    address: "890 Pine St",
    city: "Greenvillage",
    state: "WA",
    country: "USA",
    postalCode: "56789",
    phoneNumber: "555-8765",
    default: false,
  },
];

export const seedAddresses = async () => {
  for (const a of addressData) {
    try {
      const address = await prisma.address.create({
        data: a,
      });
      console.log(`Created address with id: ${address.id}`);
    } catch (error: any) {
      console.error(`Error creating address: ${error.message}`);
    }
  }
};
