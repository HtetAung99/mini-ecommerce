import { cache } from "react";
import prisma from "../../../lib/prisma";
import { Product } from "@prisma/client";
import { ProductWithNestedData } from "../types";
import { log } from "console";

export const getProductsWithCategories = cache(
  async (): Promise<ProductWithNestedData[]> => {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: {
          include: { attributeValues: { include: { attribute: true } } },
        },
      },
      where: { published: true }, // need to change published to true
    });

    return products;
  }
);

export const getProductByFilters = cache(
  async (filters: any): Promise<ProductWithNestedData[]> => {
    let products: any = [];
    let root: any;
    const { rest, price, categoryId } = filters;
    if (price) {
      const [min, max] = price
        ? price.split("-")
        : [Number.MIN_VALUE, Number.MAX_VALUE];
      console.log(min, max);

      root = await prisma.category.findUnique({
        where: { id: categoryId },
        include: {
          children: {
            include: {
              children: {
                include: {
                  products: {
                    include: { variants: true },
                    where: {
                      AND: [
                        { published: false },
                        { price: { gte: +min } },
                        { price: { lte: +max } },
                      ],
                    },
                  },
                },
              },
              products: {
                include: { variants: true },
                where: {
                  AND: [
                    { published: false },
                    { price: { gte: +min } },
                    { price: { lte: +max } },
                  ],
                },
              },
            },
          },
          products: {
            include: { variants: true },
            where: {
              AND: [
                { published: false },
                { price: { gte: +min } },
                { price: { lte: +max } },
              ],
            },
          },
        },
      });
      console.log(products);
    } else {
      root = await prisma.category.findUnique({
        where: { id: categoryId },
        include: {
          children: {
            include: {
              children: {
                include: { products: { include: { variants: true } } },
              },
              products: { include: { variants: true } },
            },
          },
          products: { include: { variants: true } },
        },
      });
    }
    if (!root) return [];

    let current = root;
    let queue: any = [current];
    while (current) {
      products = [...products, ...current.products];
      if (current.children) {
        queue = [...queue, ...current?.children];
      }

      queue.shift();
      current = queue[0];
    }

    return products;
  }
  // where: {
  //   AND: [
  //     { published: false },
  //     { categoryId },
  //     { price: { gte: +min } },
  //     { price: { lte: +max } },
  //   ],
  // },
);

export const getProductByCategoryId = cache(
  async (categoryId: number): Promise<ProductWithNestedData[]> => {
    const root = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        children: {
          include: {
            children: {
              include: { products: { include: { variants: true } } },
            },
            products: { include: { variants: true } },
          },
        },
        products: { include: { variants: true } },
      },
    });

    if (!root) return [];
    let products: any = [];

    let current = root;
    let queue: any = [current];
    while (current) {
      products = [...products, ...current.products];
      if (current.children) {
        queue = [...queue, ...current?.children];
      }

      queue.shift();
      current = queue[0];
    }
    return products;
  }
);

export const getProductById = cache(
  async (id: number): Promise<ProductWithNestedData | null> => {
    const product = await prisma.product.findFirst({
      include: {
        category: true,
        variants: {
          include: { attributeValues: { include: { attribute: true } } },
        },
      },
      where: { id },
    });

    return product;
  }
);
