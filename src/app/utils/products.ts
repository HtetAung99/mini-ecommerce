import { cache } from "react";
import prisma from "../../../lib/prisma";
import { ProductWithNestedData, ProductWithPromotion } from "../types";
import { Product, Variant } from "@prisma/client";

export const getProductsWithCategories = cache(
  async (): Promise<ProductWithNestedData[]> => {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: {
          include: { attributeValues: { include: { attribute: true } } },
        },
      },
      where: { published: false }, // need to change published to true
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

    let products: ProductWithNestedData[] = [];

    products = await prisma.product.findMany({
      skip: (pageNum - 1) * pageSize,
      take: parseInt(pageSize),
      where: {
        AND: generateFilters(price, categoryIds),
      },
      include: {
        variants: { include: { attributeValues: true } },
        category: true,
      },
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

// export const getProductByFilters = cache(
//   async (filters: any): Promise<ProductWithNestedData[]> => {
//     let products: any = [];
//     let root: any;
//     const { rest, price, categoryId } = filters;
//     if (price) {
//       const [min, max] = price
//         ? price.split("-")
//         : [Number.MIN_VALUE, Number.MAX_VALUE];
//       console.log(min, max);

//       root = await prisma.category.findUnique({
//         where: { id: categoryId },
//         include: {
//           children: {
//             include: {
//               children: {
//                 include: {
//                   products: {
//                     include: { variants: true },
//                     where: {
//                       AND: [
//                         { published: false },
//                         { price: { gte: +min } },
//                         { price: { lte: +max } },
//                       ],
//                     },
//                   },
//                 },
//               },
//               products: {
//                 include: { variants: true },
//                 where: {
//                   AND: [
//                     { published: false },
//                     { price: { gte: +min } },
//                     { price: { lte: +max } },
//                   ],
//                 },
//               },
//             },
//           },
//           products: {
//             include: { variants: true },
//             where: {
//               AND: [
//                 { published: false },
//                 { price: { gte: +min } },
//                 { price: { lte: +max } },
//               ],
//             },
//           },
//         },
//       });
//     } else {
//       root = await prisma.category.findUnique({
//         where: { id: categoryId },
//         include: {
//           children: {
//             include: {
//               children: {
//                 include: { products: { include: { variants: true } } },
//               },
//               products: { include: { variants: true } },
//             },
//           },
//           products: { include: { variants: true } },
//         },
//       });
//     }
//     if (!root) return [];

//     let current = root;
//     let queue: any = [current];
//     while (current) {
//       products = [...products, ...current.products];
//       if (current.children) {
//         queue = [...queue, ...current?.children];
//       }

//       queue.shift();
//       current = queue[0];
//     }

//     return products;
//   }
// );

// export const getProductByCategoryId = cache(
//   async (categoryId: number): Promise<ProductWithNestedData[]> => {
//     const root = await prisma.category.findUnique({
//       where: { id: categoryId },
//       include: {
//         children: {
//           include: {
//             children: {
//               include: { products: { include: { variants: true } } },
//             },
//             products: { include: { variants: true } },
//           },
//         },
//         products: { include: { variants: true } },
//       },
//     });

//     if (!root) return [];
//     let products: any = [];

//     let current = root;
//     let queue: any = [current];
//     while (current) {
//       products = [...products, ...current.products];
//       if (current.children) {
//         queue = [...queue, ...current?.children];
//       }

//       queue.shift();
//       current = queue[0];
//     }
//     return products;
//   }
// );

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
  },
);

export const getBestSellers = cache(async (): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    orderBy: { orderCount: "desc" },
    take: 10,
  });

  return products;
});

export const getNewArrivals = cache(async (): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return products;
});

export const getPromotions = cache(
  async (): Promise<ProductWithPromotion[]> => {
    const promotions = await prisma.promotion.findMany({
      include: { variants: { include: { product: true } } },
      where: { isActive: true },
    });
    let products: ProductWithPromotion[] = [];
    promotions.forEach((promotion) => {
      const tmp: ProductWithPromotion[] = [
        ...promotion.variants.map((variant) => {
          return { ...variant.product, promotion };
        }),
      ];
      products.push(...tmp);
    });
    // it should be set
    return products;
  },
);
