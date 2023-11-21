import prisma from "../../lib/prisma";

const productData = [
  {
    price: 1199.99,
    title: "Samsung Galaxy S22",
    categoryId: 4,
    description:
      "The Galaxy S22 offers cutting-edge features and a stunning display. With a powerful Exynos processor and versatile camera system, it's a flagship smartphone for tech enthusiasts.",
  },
  {
    title: "Men's Casual Shirt",
    description: "A comfortable and stylish shirt for casual occasions.",
    price: 29.99,
    categoryId: 8,
  },
  {
    title: "ASUS ROG Zephyrus G14",
    price: 1399.99,
    categoryId: 6,
    description:
      "The ASUS ROG Zephyrus G14 is a gaming laptop that combines performance and portability. With a powerful Ryzen processor and dedicated NVIDIA graphics, it delivers impressive gaming experiences in a compact form factor.",
  },
  {
    title: "Dell XPS 17",
    description:
      "The Dell XPS 17 is a premium ultrabook with a stunning 4K OLED display. It's powered by the latest Intel processors and offers an exceptional computing experience.",
    price: 1799.99,
    categoryId: 5,
  },
  {
    title: "Apple iPhone 13",
    price: 1249.99,
    categoryId: 3,
    description:
      "The iPhone 13 offers advanced features and a powerful A15 Bionic chip. With a stunning Super Retina XDR display and improved camera capabilities, it is a flagship smartphone that meets the demands of modern users.",
  },
  // Additional products
  {
    price: 599.99,
    title: "Sony Bravia 4K Smart TV",
    categoryId: 1,
    description:
      "Experience cinematic visuals with the Sony Bravia 4K Smart TV. Enjoy vibrant colors and smart features for an immersive entertainment experience.",
  },
  {
    title: "Women's Running Shoes",
    description:
      "High-performance running shoes for women, designed for comfort and durability.",
    price: 79.99,
    categoryId: 9,
  },
  {
    title: "Lenovo Legion Y540 Gaming Desktop",
    price: 1699.99,
    categoryId: 6,
    description:
      "Immerse yourself in gaming with the Lenovo Legion Y540 Gaming Desktop. Packed with powerful hardware, it delivers a smooth gaming experience.",
  },
  {
    title: "Modern Coffee Table",
    description:
      "Enhance your living room with this modern coffee table. Sleek design and ample storage space.",
    price: 249.99,
    categoryId: 22,
  },
  {
    title: "Canon EOS R5 Mirrorless Camera",
    price: 2999.99,
    categoryId: 4,
    description:
      "Capture stunning images and videos with the Canon EOS R5 Mirrorless Camera. It features a high-resolution sensor and advanced autofocus technology.",
  },
  {
    price: 49.99,
    title: "Wireless Earbuds",
    categoryId: 10,
    description:
      "Enjoy the freedom of wireless audio with these high-quality earbuds. They provide clear sound and a comfortable fit for all-day use.",
  },
  {
    title: "Smart Thermostat",
    description:
      "Control your home's temperature from anywhere with this smart thermostat. Energy-efficient and easy to use.",
    price: 129.99,
    categoryId: 1,
  },
  {
    title: "Outdoor Camping Tent",
    description:
      "Explore the great outdoors with this durable and spacious camping tent. Perfect for weekend getaways.",
    price: 179.99,
    categoryId: 15,
  },
  {
    title: "LG UltraWide Gaming Monitor",
    price: 899.99,
    categoryId: 1,
    description:
      "Elevate your gaming setup with the LG UltraWide Gaming Monitor. Its immersive display and high refresh rate provide a competitive edge.",
  },
  {
    title: "Leather Office Chair",
    description:
      "Upgrade your workspace with this ergonomic leather office chair. Comfortable and stylish for long hours of work.",
    price: 249.99,
    categoryId: 21,
  },
  {
    title: "Fitness Tracker",
    description:
      "Monitor your fitness goals with this advanced fitness tracker. It tracks steps, heart rate, and sleep patterns for a healthier lifestyle.",
    price: 79.99,
    categoryId: 10,
  },
  {
    title: "Portable Bluetooth Speaker",
    description:
      "Take your music anywhere with this portable Bluetooth speaker. It delivers crisp sound and long battery life.",
    price: 59.99,
    categoryId: 10,
  },
  {
    title: "Ultra-Thin Laptop Sleeve",
    description:
      "Protect your laptop in style with this ultra-thin laptop sleeve. Sleek design and padded interior for maximum protection.",
    price: 29.99,
    categoryId: 5,
  },
  {
    title: "Smart Home Security Camera",
    price: 149.99,
    categoryId: 1,
    description:
      "Keep your home secure with this smart home security camera. It offers high-definition video and real-time alerts for peace of mind.",
  },
  {
    title: "Classic Men's Watch",
    description:
      "Enhance your style with this classic men's watch. Timeless design and reliable precision for any occasion.",
    price: 129.99,
    categoryId: 10,
  },
  {
    title: "Yoga Mat",
    description:
      "Practice yoga comfortably with this high-quality yoga mat. Non-slip surface and easy to clean for a perfect workout.",
    price: 34.99,
    categoryId: 9,
  },
  {
    title: "Wireless Charging Pad",
    description:
      "Charge your devices wirelessly with this sleek charging pad. Compatible with a variety of smartphones and accessories.",
    price: 19.99,
    categoryId: 1,
  },
  {
    title: "Backpack with USB Charging Port",
    description:
      "Stay connected on the go with this backpack featuring a built-in USB charging port. Stylish and functional for daily use.",
    price: 49.99,
    categoryId: 1,
  },
  {
    title: "Powerful Blender",
    description:
      "Create delicious smoothies and soups with this powerful blender. High-speed motor and durable blades for optimal blending.",
    price: 89.99,
    categoryId: 1,
  },
  {
    title: "Digital Drawing Tablet",
    price: 199.99,
    categoryId: 1,
    description:
      "Unleash your creativity with this digital drawing tablet. Pressure-sensitive stylus and customizable controls for precise digital art.",
  },
  {
    title: "Portable External Hard Drive",
    description:
      "Expand your storage space with this portable external hard drive. High capacity and fast data transfer for your digital files.",
    price: 129.99,
    categoryId: 1,
  },
  {
    title: "Stylish Sunglasses",
    description:
      "Protect your eyes in style with these fashionable sunglasses. UV-resistant lenses for a comfortable and clear vision.",
    price: 39.99,
    categoryId: 10,
  },
];

// You can continue extending the array with more products as needed.

export const seedProducts = async () => {
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created category with id: ${product.id}`);
  }
};
