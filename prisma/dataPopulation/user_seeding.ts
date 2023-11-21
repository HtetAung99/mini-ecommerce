import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
const userData: Prisma.UserCreateInput[] = [
  {
    email: "phyoUser@gmail.com",
    password: bcrypt.hashSync("asdfqwer", 10),
    name: "Phyo",
    role: "USER",
  },
  {
    email: "phyoAdmin@gmail.com",
    password: bcrypt.hashSync("asdfqwer", 10),
    name: "Phyo Pyae",
    role: "ADMIN",
  },
  {
    email: "htetaung@gmail.com",
    password: bcrypt.hashSync("helloworld", 10),
    name: "Htet Aung",
    role: "ADMIN",
  },
  {
    email: "phyoSuperAdmin@gmail.com",
    password: bcrypt.hashSync("asdfqwer", 10),
    name: "Phyo Pyae Aung",
    role: "SUPERADMIN",
  },
];

export const seedUsers = async () => {
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
};
