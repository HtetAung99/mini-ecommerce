import { PrismaClient, Prisma } from "@prisma/client";

import bcrypt from "bcrypt";
const prisma = new PrismaClient();

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

const categoryData = [
  { name: "Electronics" },
  { name: "Smart Phone", parentId: 1 },
  { name: "Apple", parentId: 2 },
  { name: "Samsung", parentId: 2 },
  { name: "Laptop", parentId: 1 },
  { name: "Gaming Laptop", parentId: 5 },
  { name: "Clothing" },
  { name: "Men's Clothing", parentId: 7 },
];

const productData = [
  {
    price: 1199.99,
    title: "Samsung Galaxy S22",
    categoryId: 4,
    description:
      "The Galaxy S22 offers cutting-edge features and a stunning display. With a powerful Exynos processor and versatile camera system, it's a flagship smartphone for tech enthusiasts.",
    variants: {
      create: [
        {
          attributeValues: {
            connect: [{ name: "black" }, { name: "256GB" }],
          },
          priceDiff: 0,
          variantAvailabilities: {
            create: {
              store: {
                connect: { name: "store1" },
              },
              quantity: 15,
            },
          },
        },
        {
          attributeValues: {
            connect: [{ name: "silver" }, { name: "512GB" }],
          },
          priceDiff: 150,
          variantAvailabilities: {
            create: {
              store: {
                connect: { name: "store2" },
              },
              quantity: 10,
            },
          },
        },
        // Add more variants for the Samsung Galaxy S22 as needed.
      ],
    },
  },
  {
    title: "Men's Casual Shirt",
    description: "A comfortable and stylish shirt for casual occasions.",
    price: 29.99,
    categoryId: 8,
    variants: {
      create: [
        {
          attributeValues: {
            connect: [{ name: "large" }, { name: "blue" }],
          },
          priceDiff: 5,
          variantAvailabilities: {
            create: {
              store: {
                connect: { name: "store3" },
              },
              quantity: 20,
            },
          },
        },
      ],
    },
  },
  {
    title: "ASUS ROG Zephyrus G14",
    price: 1399.99,
    categoryId: 6,
    description:
      "The ASUS ROG Zephyrus G14 is a gaming laptop that combines performance and portability. With a powerful Ryzen processor and dedicated NVIDIA graphics, it delivers impressive gaming experiences in a compact form factor.",
    variants: {
      create: [
        {
          attributeValues: {
            connect: [
              {
                name: "red",
              },
              {
                name: "256GB",
              },
            ],
          },
          priceDiff: -200,
          variantAvailabilities: {
            create: {
              store: {
                connect: { name: "store1" },
              },
              quantity: 10,
            },
          },
        },
      ],
    },
  },
  {
    title: "Dell XPS 17",
    description:
      "The Dell XPS 17 is a premium ultrabook with a stunning 4K OLED display. It's powered by the latest Intel processors and offers an exceptional computing experience.",
    price: 1799.99,
    categoryId: 5,
    variants: {
      create: [
        {
          attributeValues: {
            connect: [{ name: "rose gold" }, { name: "512GB" }],
          },
          priceDiff: -100,
          variantAvailabilities: {
            create: {
              store: {
                connect: { name: "store1" },
              },
              quantity: 8,
            },
          },
        },
      ],
    },
  },
  {
    title: "Apple iPhone 13",
    price: 1249.99,
    categoryId: 3,
    description:
      "The iPhone 13 offers advanced features and a powerful A15 Bionic chip. With a stunning Super Retina XDR display and improved camera capabilities, it is a flagship smartphone that meets the demands of modern users.",
    variants: {
      create: [
        {
          attributeValues: {
            connect: [
              {
                name: "red",
              },
              {
                name: "512GB",
              },
            ],
          },
          priceDiff: 100,
          variantAvailabilities: {
            create: {
              store: {
                connect: { name: "store1" },
              },
              quantity: 10,
            },
          },
        },
        {
          attributeValues: {
            connect: [
              {
                name: "blue",
              },
              {
                name: "256GB",
              },
            ],
          },
          priceDiff: -10,
          variantAvailabilities: {
            create: {
              store: {
                connect: { name: "store2" },
              },
              quantity: 10,
            },
          },
        },
      ],
    },
  },
];

const attributeData = [
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
      ],
    },
  },
];

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

const orderData: Prisma.OrderCreateInput[] = [
  {
    customer: { connect: { email: "htetaung@gmail.com" } },
    totalAmount: 150.0,
    orderItems: {
      create: [
        { quantity: 2, variantId: 1 },
        { quantity: 1, variantId: 2 },
      ],
    },
  },
  {
    customer: { connect: { email: "phyoUser@gmail.com" } },
    totalAmount: 75.5,
    orderItems: {
      create: [
        { quantity: 1, variantId: 3 },
        { quantity: 3, variantId: 4 },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  await seedStores();
  await seedAttributes();
  await seedCategories();
  await seedUsers();
  await seedProducts();
  await seedOrders();
  console.log(`Seeding finished.`);
}

const seedAttributes = async () => {
  for (const a of attributeData) {
    const attribute = await prisma.attribute.create({ data: a });
    console.log(`Created attribute with id: ${attribute.id}`);
  }
};

const seedUsers = async () => {
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
};

const seedStores = async () => {
  for (const s of storeData) {
    const store = await prisma.store.create({
      data: s,
    });
    console.log(`Created store with id: ${store.id}`);
  }
};

const seedCategories = async () => {
  for (const c of categoryData) {
    const category = await prisma.category.create({
      data: c,
    });
    console.log(`Created category with id: ${category.id}`);
  }
};

const seedProducts = async () => {
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created category with id: ${product.id}`);
  }
};

const seedOrders = async () => {
  for (const o of orderData) {
    const order = await prisma.order.create({
      data: o,
    });
    console.log(`Created order with id: ${order.id}`);
  }
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
