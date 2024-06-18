import { connect } from "http2";
import prisma from "../../lib/prisma";

export const seedComputerComponents = async () => {
  // categories
  await prisma.category.create({
    data: {
      name: "Computer Components",
      children: {
        create: [
          { name: "Cases" },
          {
            name: "Storage",
            children: { create: [{ name: "SSDs" }, { name: "HDDs" }] },
          },
          {
            name: "CPUs",
            children: {
              create: [{ name: "Intel CPUs" }, { name: "AMD CPUs" }],
            },
          },
          {
            name: "Motherboards",
            children: {
              create: [
                { name: "ASUS Motherboards" },
                { name: "MSI Motherboards" },
              ],
            },
          },
          {
            name: "GPUs",
            children: {
              create: [{ name: "NVIDIA GPUs" }, { name: "AMD GPUs" }],
            },
          },
          {
            name: "RAM",
            children: {
              create: [{ name: "Corsair RAMs" }, { name: "G.Skill RAMs" }],
            },
          },
          {
            name: "Power Supplies",
            children: {
              create: [
                { name: "Corsair Power Supplies" },
                { name: "EVGA Power Supplies" },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Populated Computer Components Categories");

  // Example Products for each Category
  const products = [
    {
      title: "Intel Core i9 11900K",
      category: { connect: { name: "Intel CPUs" } },
      description: "Intel Core i9, 11th Gen, High Performance",
      price: 549.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/i911900k.jpg"],
            attributeValues: {
              connect: [
                { name: "LGA1200" },
                { name: "5.0 GHz" },
                { name: "8 cores" },
              ],
            },
          },
        ],
      },
    },
    {
      title: "AMD Ryzen 9 5950X",
      category: { connect: { name: "AMD CPUs" } },
      description: "AMD Ryzen 9, 16-core, 32-thread",
      price: 799.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/ryzen95950x.jpg"],
            attributeValues: {
              connect: [
                { name: "AM4" },
                { name: "4.0 GHz" },
                { name: "16 cores" },
              ],
            },
          },
        ],
      },
    },
    {
      title: "NVIDIA RTX 3090",
      category: { connect: { name: "NVIDIA GPUs" } },
      description: "NVIDIA GeForce RTX 3090, Ultimate Gaming Experience",
      price: 1499.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/rtx3090.jpg"],
            attributeValues: {
              connect: [{ name: "NVIDIA RTX" }, { name: "32 GB" }],
            },
          },
        ],
      },
    },
    {
      title: "Corsair 32GB RAM Kit",
      category: { connect: { name: "Corsair RAMs" } },
      description: "Corsair Vengeance LPX 32GB, High-speed DDR4",
      price: 164.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/corsair32gb.jpg"],
            attributeValues: { connect: [{ name: "DDR4" }, { name: "32 GB" }] },
          },
        ],
      },
    },
    {
      title: "Corsair 850W PSU",
      category: { connect: { name: "Corsair Power Supplies" } },
      description: "Corsair RM850x, 850W, Fully Modular, 80 Plus Gold",
      price: 139.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/corsair850w.jpg"],
            attributeValues: { connect: [{ name: "850W" }] },
          },
        ],
      },
    },
  ];

  const newProducts = [
    {
      title: "AMD Ryzen 7 5800X",
      category: { connect: { name: "AMD CPUs" } },
      description: "AMD Ryzen 7, 8-core, 16-thread, high-performance processor",
      price: 449.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/ryzen75800x.jpg"],
            attributeValues: {
              connect: [
                { name: "AM4" },
                { name: "4.0 GHz" },
                { name: "8 cores" },
              ],
            },
          },
        ],
      },
    },
    {
      title: "ASUS ROG Strix Z590-E Motherboard",
      category: { connect: { name: "ASUS Motherboards" } },
      description:
        "ASUS ROG Strix, Intel Z590 chipset, supports up to 128GB DDR4",
      price: 299.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/asusrogz590e.jpg"],
            attributeValues: {
              connect: [{ name: "LGA1200" }, { name: "ATX" }],
            },
          },
        ],
      },
    },
    {
      title: "NVIDIA RTX 3080 Ti",
      category: { connect: { name: "NVIDIA GPUs" } },
      description:
        "NVIDIA GeForce RTX 3080 Ti, excellent for high-end gaming and creative work",
      price: 1199.99,
      variants: {
        create: [
          {
            priceDiff: 0,
            imageUrls: ["https://example.com/rtx3080ti.jpg"],
            attributeValues: {
              connect: [{ name: "NVIDIA RTX" }, { name: "12 GB" }],
            },
          },
        ],
      },
    },
    {
      title: "Samsung 970 EVO Plus 1TB NVMe SSD",
      category: { connect: { name: "Storage" } },
      description:
        "Samsung 970 EVO Plus, NVMe M.2 SSD, 3500/3300 MB/s read/write",
      price: 169.99,
      variants: {
        create: {
          priceDiff: 0,
          imageUrls: ["https://example.com/samsung970evo.jpg"],
          attributeValues: {
            connect: [{ name: "NVMe SSD" }, { name: "1TB" }],
          },
        },
      },
    },
    {
      title: "Corsair RM1000x Power Supply",
      category: { connect: { name: "Power Supplies" } },
      description:
        "Corsair RM1000x, 1000W, Fully Modular, 80 Plus Gold certified",
      price: 189.99,
      variants: {
        create: {
          priceDiff: 0,
          imageUrls: ["https://example.com/corsairrm1000x.jpg"],
          attributeValues: { connect: { name: "1000W" } },
        },
      },
    },
    {
      title: "Kingston HyperX Predator 64GB RAM Kit",
      category: { connect: { name: "RAM" } },
      description:
        "Kingston HyperX Predator, 64GB DDR4 RAM, high-performance memory",
      price: 354.99,
      variants: {
        create: {
          priceDiff: 0,
          imageUrls: ["https://example.com/kingstonhyperx64gb.jpg"],
          attributeValues: { connect: [{ name: "DDR4" }, { name: "64 GB" }] },
        },
      },
    },
    {
      title: "Cooler Master MasterCase H500",
      category: { connect: { name: "Cases" } },
      description:
        "Cooler Master MasterCase H500, Mid-Tower case with dual 200mm ARGB fans",
      price: 119.99,
      variants: {
        create: {
          priceDiff: 0,
          imageUrls: ["https://example.com/coolermasterh500.jpg"],
          attributeValues: { connect: { name: "Mid Tower" } },
        },
      },
    },
    {
      title: "Logitech C920 HD Pro Webcam",
      category: { connect: { name: "Computer Components" } },
      description:
        "Logitech C920 HD Pro, 1080p webcam, perfect for streaming and video conferencing",
      price: 79.99,
      variants: {
        create: {
          priceDiff: 0,
          imageUrls: ["https://example.com/logitechc920.jpg"],
        },
      },
    },
    {
      title: "Dell UltraSharp U2720Q Monitor",
      category: { connect: { name: "Computer Components" } },
      description:
        "Dell UltraSharp U2720Q, 27-inch 4K UHD monitor, USB-C connectivity",
      price: 549.99,
      variants: {
        create: {
          priceDiff: 0,
          imageUrls: ["https://example.com/dellultrasharpu2720q.jpg"],
          attributeValues: { connect: { name: "3840x2160" } }, // 4K resolution
        },
      },
    },
    {
      title: "Razer BlackWidow V3 Mechanical Keyboard",
      category: { connect: { name: "Computer Components" } },
      description:
        "Razer BlackWidow V3, mechanical gaming keyboard with RGB lighting",
      price: 139.99,
      variants: {
        create: {
          priceDiff: 0,
          imageUrls: ["https://example.com/razerblackwidowv3.jpg"],
        },
      },
    },
  ];

  // Create Products and Variants
  for (const product of [...products, ...newProducts]) {
    const createdProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${createdProduct.title} with variants`);
  }
  console.log("Computer Components Categories seeded.");
};
