import { cache } from "react";
import prisma from "../../../lib/prisma";
import { CategoryWithChild } from "../types";

export const getCategories = cache(async () => {
  const categories: CategoryWithChild[] = await prisma.category.findMany({
    include: {
      children: true,
    },
  });

  return categories;
});

export const getCategoriesNested = cache(async () => {
  const categories: CategoryWithChild[] = await prisma.category.findMany({
    include: {
      children: { include: { children: true } },
    },
  });

  return categories;
});

export const getCategoriesFullPath = async () => {
  const categories = await getCategories();

  const normalized: any = categories.reduce(
    (prev, cur) => ({
      ...prev,
      [`${cur.id}`]: cur,
    }),
    {},
  );

  const retrieveParentName = (category: CategoryWithChild): string => {
    const id = category.id;
    const parentId = normalized[`${id}`].parentId;
    if (parentId == null) return `${normalized[`${id}`].name}`;
    return retrieveParentName(normalized[parentId]) + "/" + category.name;
  };

  return categories.map((category: CategoryWithChild) => ({
    id: category.id,
    name: retrieveParentName(category),
  }));
};

export const getCategoryByName = async (name: string) => {
  const category = await prisma.category.findUnique({
    where: {
      name: name,
    },
  });

  return category;
};

export const getCategoryById = async (id: number) => {
  return await prisma.category.findUnique({ where: { id } });
};
