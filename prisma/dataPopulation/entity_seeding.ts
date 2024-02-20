import prisma from "../../lib/prisma";

export const seedEntities = async () => {
  try {
    const entites: any[] =
      await prisma.$queryRaw`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`;

    for (const e of entites) {
      if (!e.table_name.startsWith("_")) {
        const name = e.table_name;
        const entity = await prisma.entity.create({
          data: { name },
        });
        console.log(`Created entity with id: ${entity.id}`);
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
