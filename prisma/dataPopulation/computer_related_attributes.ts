import prisma from "../../lib/prisma";

const computerAttributes = [
  {
    name: "Socket Type",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "LGA1151" }, create: { name: "LGA1151" } },
        { where: { name: "AM4" }, create: { name: "AM4" } },
        { where: { name: "LGA1200" }, create: { name: "LGA1200" } },
        { where: { name: "TR4" }, create: { name: "TR4" } },
      ],
    },
  },
  {
    name: "RAM Type",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "DDR4" }, create: { name: "DDR4" } },
        { where: { name: "DDR3" }, create: { name: "DDR3" } },
        { where: { name: "DDR5" }, create: { name: "DDR5" } },
      ],
    },
  },
  {
    name: "GPU Type",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "NVIDIA RTX" }, create: { name: "NVIDIA RTX" } },
        { where: { name: "AMD Radeon" }, create: { name: "AMD Radeon" } },
        { where: { name: "NVIDIA GTX" }, create: { name: "NVIDIA GTX" } },
        { where: { name: "AMD RX" }, create: { name: "AMD RX" } },
      ],
    },
  },
  {
    name: "Power Supply Wattage",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "650W" }, create: { name: "650W" } },
        { where: { name: "750W" }, create: { name: "750W" } },
        { where: { name: "850W" }, create: { name: "850W" } },
        { where: { name: "1000W" }, create: { name: "1000W" } },
        { where: { name: "1200W" }, create: { name: "1200W" } },
      ],
    },
  },
  {
    name: "CPU Core Count",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "4 cores" }, create: { name: "4 cores" } },
        { where: { name: "6 cores" }, create: { name: "6 cores" } },
        { where: { name: "8 cores" }, create: { name: "8 cores" } },
        { where: { name: "12 cores" }, create: { name: "12 cores" } },
        { where: { name: "16 cores" }, create: { name: "16 cores" } },
      ],
    },
  },
  {
    name: "GPU Memory",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "4 GB" }, create: { name: "4 GB" } },
        { where: { name: "6 GB" }, create: { name: "6 GB" } },
        { where: { name: "8 GB" }, create: { name: "8 GB" } },
        { where: { name: "12 GB" }, create: { name: "12 GB" } },
        { where: { name: "16 GB" }, create: { name: "16 GB" } },
      ],
    },
  },
  {
    name: "RAM Capacity",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "8 GB" }, create: { name: "8 GB" } },
        { where: { name: "16 GB" }, create: { name: "16 GB" } },
        { where: { name: "32 GB" }, create: { name: "32 GB" } },
        { where: { name: "64 GB" }, create: { name: "64 GB" } },
      ],
    },
  },
  {
    name: "Motherboard Form Factor",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "ATX" }, create: { name: "ATX" } },
        { where: { name: "Micro ATX" }, create: { name: "Micro ATX" } },
        { where: { name: "Mini ITX" }, create: { name: "Mini ITX" } },
      ],
    },
  },
  {
    name: "RAM Slots",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "2 slots" }, create: { name: "2 slots" } },
        { where: { name: "4 slots" }, create: { name: "4 slots" } },
        { where: { name: "8 slots" }, create: { name: "8 slots" } },
      ],
    },
  },
  {
    name: "Storage Type",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "HDD" }, create: { name: "HDD" } },
        { where: { name: "SSD" }, create: { name: "SSD" } },
        { where: { name: "NVMe SSD" }, create: { name: "NVMe SSD" } },
      ],
    },
  },
  {
    name: "Storage Capacity",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "256GB" }, create: { name: "256GB" } },
        { where: { name: "512GB" }, create: { name: "512GB" } },
        { where: { name: "1TB" }, create: { name: "1TB" } },
        { where: { name: "2TB" }, create: { name: "2TB" } },
      ],
    },
  },
  {
    name: "CPU Speed",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "2.3 GHz" }, create: { name: "2.3 GHz" } },
        { where: { name: "3.6 GHz" }, create: { name: "3.6 GHz" } },
        { where: { name: "4.0 GHz" }, create: { name: "4.0 GHz" } },
        { where: { name: "5.0 GHz" }, create: { name: "5.0 GHz" } },
      ],
    },
  },
  {
    name: "Monitor Resolution",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "1920x1080" }, create: { name: "1920x1080" } },
        { where: { name: "2560x1440" }, create: { name: "2560x1440" } },
        { where: { name: "3840x2160" }, create: { name: "3840x2160" } }, // 4K
      ],
    },
  },
  {
    name: "Case Size",
    attributeValues: {
      connectOrCreate: [
        { where: { name: "Mini Tower" }, create: { name: "Mini Tower" } },
        { where: { name: "Mid Tower" }, create: { name: "Mid Tower" } },
        { where: { name: "Full Tower" }, create: { name: "Full Tower" } },
      ],
    },
  },
];

export const seedComputerAttributes = async () => {
  for (const attribute of computerAttributes) {
    await prisma.attribute.create({
      data: attribute,
    });
  }
  console.log("Attributes and their values have been populated!");
};
