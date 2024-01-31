import { cache } from "react";
import prisma from "../../../lib/prisma";
import {
  ProductWithImage,
  ProductWithNestedData,
  ProductWithPromotion,
} from "../types";
import { Variant } from "@prisma/client";

export const getProductsWithCategories = cache(
  async (): Promise<ProductWithNestedData[]> => {
    const res = await prisma.product.findMany({
      include: {
        category: true,
        variants: {
          include: {
            attributeValues: { include: { attribute: true } },
            promotion: true,
          },
        },
      },
      where: { published: false }, // need to change published to true
    });
    const products = res.map((product: any) => {
      const imageUrl =
        product.variants[0].imageUrls[0] || "default-product-image.jpg";
      return {
        ...product,
        imageUrl,
        promotion: product.variants.map((v: Variant) => v.promotionId)[0]
          ?.promotionId,
      };
    });

    return products;
  },
); // main Page

export const getProductByFilters = cache(
  async (filters: any): Promise<[ProductWithNestedData[], number]> => {
    const { rest, price, categoryId, pageNum = 1, pageSize = 9 } = filters;
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { children: { include: { children: true } } },
    });

    let current = category;
    let categoryIds: number[] = [];
    let queue: any = [current];
    while (current) {
      categoryIds.push(current.id);
      if (current.children) {
        queue = [...queue, ...current?.children];
      }
      queue.shift();
      current = queue[0];
    }

    const res = await prisma.product.findMany({
      skip: (pageNum - 1) * pageSize,
      take: parseInt(pageSize),
      where: {
        AND: generateFilters(price, categoryIds),
      },
      include: {
        variants: { include: { attributeValues: true, promotion: true } },
        category: true,
      },
    });

    const products = res.map((product: any) => {
      return {
        ...product,
        imageUrl:
          product.variants[0].imageUrls[0] || "default-product-image.jpg",
        promotion: product.variants.filter((v: Variant) => v.promotionId)[0]
          ?.promotionId,
      };
    });

    const count = await prisma.product.count({
      where: { AND: generateFilters(price, categoryIds) },
    });

    return [products, count];
  },
);

const generateFilters = (price: string, categoryIds: number[]) => {
  const [min, max] = price
    ? price.split("-")
    : [Number.MIN_VALUE, Number.MAX_VALUE];
  return [
    { categoryId: { in: categoryIds } },
    { published: false },
    { price: { gte: +min } },
    { price: { lte: +max } },
  ];
};

export const getProductById = cache(
  async (id: number): Promise<ProductWithNestedData | null> => {
    const product: any = await prisma.product.findFirst({
      include: {
        category: true,
        variants: {
          include: {
            attributeValues: { include: { attribute: true } },
            promotion: true,
          },
        },
      },
      where: { id },
    });

    return {
      ...product,
      promotion: product?.variants.map((v: any) => v.promotion),
      imageUrl:
        product?.variants[0].imageUrls[0] || "default-product-image.jpg",
    };
  },
);

export const getBestSellers = cache(async (): Promise<ProductWithImage[]> => {
  const products = await prisma.product.findMany({
    orderBy: { orderCount: "desc" },
    take: 10,
    include: { variants: true },
  });

  return products.map((product: any) => {
    const imageUrl =
      product.variants[0].imageUrls[0] || "default-product-image.jpg";
    console.log("BestSellers", imageUrl);
    return {
      ...product,
      imageUrl,
    };
  });
});

export const getNewArrivals = cache(async (): Promise<ProductWithImage[]> => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { variants: true },
  });
  return products.map((product: any) => {
    const imageUrl =
      product.variants[0].imageUrls[0] || "default-product-image.jpg";
    console.log("NewArrivals", imageUrl);
    return {
      ...product,
      imageUrl,
    };
  });
});

export const getProductsWithPromotions = cache(
  async (): Promise<ProductWithPromotion[]> => {
    const promotions = await prisma.promotion.findMany({
      include: { variants: { include: { product: true } } },
      where: { isActive: true },
    });
    let products: ProductWithPromotion[] = [];
    promotions.forEach((promotion) => {
      const tmp: ProductWithPromotion[] = [
        ...promotion.variants.map((variant) => {
          const imageUrl = variant.imageUrls[0] || "default-product-image.jpg";
          console.log("Promotions", imageUrl);
          return {
            ...variant.product,
            promotion: promotion.id,
            imageUrl,
          };
        }),
      ];
      products.push(...tmp);
    });
    // it should be set
    return products;
  },
);
