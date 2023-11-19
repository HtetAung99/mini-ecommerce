import { PrismaClient, Prisma } from '@prisma/client';

import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'phyoUser@gmail.com',
    password: bcrypt.hashSync('asdfqwer', 10),
    name: 'Phyo',
    role: 'USER',
  },
  {
    email: 'phyoAdmin@gmail.com',
    password: bcrypt.hashSync('asdfqwer', 10),
    name: 'Phyo Pyae',
    role: 'ADMIN',
  },
  {
    email: 'htetaung@gmail.com',
    password: bcrypt.hashSync('helloworld', 10),
    name: 'Htet Aung',
    role: 'ADMIN',
  },
  {
    email: 'phyoSuperAdmin@gmail.com',
    password: bcrypt.hashSync('asdfqwer', 10),
    name: 'Phyo Pyae Aung',
    role: 'SUPERADMIN',
  },
];

const categoryData = [
  {
    name: 'Electronics',
    children: {
      create: [
        {
          name: 'Smartphones',
          children: {
            create: [
              {
                name: 'Apple',
                products: {
                  create: [
                    {
                      title: 'Apple iPhone 13',
                      description:
                        'The iPhone 13 offers advanced features and a powerful A15 Bionic chip. With a stunning Super Retina XDR display and improved camera capabilities, it is a flagship smartphone that meets the demands of modern users.',
                      variants: {
                        create: [
                          {
                            attributeValues: {
                              connect: [
                                {
                                  name: 'red',
                                },
                                {
                                  name: '512GB',
                                },
                              ],
                            },
                            price: 1249.99,
                            variantAvailabilities: {
                              create: {
                                store: {
                                  connect: { name: 'store1' },
                                },
                                quantity: 10,
                              },
                            },
                          },
                          {
                            attributeValues: {
                              connect: [
                                {
                                  name: 'blue',
                                },
                                {
                                  name: '256GB',
                                },
                              ],
                            },
                            price: 1249.99,
                            variantAvailabilities: {
                              create: {
                                store: {
                                  connect: { name: 'store2' },
                                },
                                quantity: 10,
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                name: 'Samsung',
                products: {
                  create: [
                    {
                      title: 'Samsung Galaxy S22',
                      description:
                        "The Galaxy S22 offers cutting-edge features and a stunning display. With a powerful Exynos processor and versatile camera system, it's a flagship smartphone for tech enthusiasts.",
                      variants: {
                        create: [
                          {
                            attributeValues: {
                              connect: [{ name: 'black' }, { name: '256GB' }],
                            },
                            price: 1299.99,
                            variantAvailabilities: {
                              create: {
                                store: {
                                  connect: { name: 'store1' },
                                },
                                quantity: 15,
                              },
                            },
                          },
                          {
                            attributeValues: {
                              connect: [{ name: 'silver' }, { name: '512GB' }],
                            },
                            price: 1399.99,
                            variantAvailabilities: {
                              create: {
                                store: {
                                  connect: { name: 'store2' },
                                },
                                quantity: 10,
                              },
                            },
                          },
                          // Add more variants for the Samsung Galaxy S22 as needed.
                        ],
                      },
                    },
                  ],
                },
              },
              // Add more smartphone brands and models as needed
            ],
          },
        },
        {
          name: 'Laptops',
          children: {
            create: [
              {
                name: 'Ultrabooks',
                products: {
                  create: [
                    {
                      title: 'Dell XPS 17',
                      description:
                        "The Dell XPS 17 is a premium ultrabook with a stunning 4K OLED display. It's powered by the latest Intel processors and offers an exceptional computing experience.",
                      variants: {
                        create: [
                          {
                            attributeValues: {
                              connect: [
                                { name: 'rose gold' },
                                { name: '512GB' },
                              ],
                            },
                            price: 1799.99,
                            variantAvailabilities: {
                              create: {
                                store: {
                                  connect: { name: 'store1' },
                                },
                                quantity: 8,
                              },
                            },
                          },
                          // Add more variants for the Dell XPS 17 as needed.
                        ],
                      },
                    },
                    // Add more ultrabook models as needed.
                  ],
                },
              },
              {
                name: 'Gaming Laptops',
                products: {
                  create: [
                    {
                      title: 'ASUS ROG Zephyrus G14',
                      description:
                        'The ASUS ROG Zephyrus G14 is a gaming laptop that combines performance and portability. With a powerful Ryzen processor and dedicated NVIDIA graphics, it delivers impressive gaming experiences in a compact form factor.',
                      variants: {
                        create: [
                          {
                            attributeValues: {
                              connect: [
                                {
                                  name: 'red',
                                },
                                {
                                  name: '256GB',
                                },
                              ],
                            },
                            price: 1249.99,
                            variantAvailabilities: {
                              create: {
                                store: {
                                  connect: { name: 'store1' },
                                },
                                quantity: 10,
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              // Add more laptop categories and products as needed
            ],
          },
        },
        // Add more electronic categories and products as needed
      ],
    },
  },
  {
    name: 'Clothing',
    children: {
      create: [
        {
          name: "Men's Clothing",
          products: {
            create: [
              {
                title: "Men's Casual Shirt",
                description:
                  'A comfortable and stylish shirt for casual occasions.',
                variants: {
                  create: [
                    {
                      attributeValues: {
                        connect: [{ name: 'large' }, { name: 'blue' }],
                      },
                      price: 29.99,
                      variantAvailabilities: {
                        create: {
                          store: {
                            connect: { name: 'store3' },
                          },
                          quantity: 20,
                        },
                      },
                    },
                    // Add more variants for men's shirts as needed.
                  ],
                },
              },
              // Add more men's clothing products as needed.
            ],
          },
        },
        // Add more clothing categories and products as needed.
      ],
    },
  },

  // Add more top-level categories as needed
];

const attributeData = [
  {
    name: 'color',
    attributeValues: {
      create: [
        { name: 'red' },
        { name: 'blue' },
        { name: 'green' },
        { name: 'silver' },
        { name: 'rose gold' },
        { name: 'black' },
      ],
    },
  },
  {
    name: 'size',
    attributeValues: {
      create: [
        { name: 'small' },
        { name: 'medium' },
        { name: 'large' },
        { name: 'x-large' },
      ],
    },
  },
  {
    name: 'storage',
    attributeValues: {
      create: [
        { name: '128GB' },
        { name: '256GB' },
        { name: '512GB' },
        { name: '1TB' },
      ],
    },
  },
];

const storeData = [
  {
    name: 'store1',
    address: '123 Main St',
  },
  {
    name: 'store2',
    address: '456 Elm St',
  },
  {
    name: 'store3',
    address: '789 Oak St',
  },
  // Add more store entries as needed
];

async function main() {
  console.log(`Start seeding ...`);
  await seedStores();
  await seedAttributes();
  await seedCategories();
  await seedUsers();
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
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
