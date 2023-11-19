import { cache } from 'react';
import prisma from '../../../lib/prisma';
import { Product } from '@prisma/client';
import { ProductWithNestedData } from '../types';

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
