import prisma from "../../../lib/prisma";
import { VariantWithAttributeValues } from "../types";

export const attributesValuesByProductId = async (productId: number) => {
  const productVariants = await prisma.variant.findMany({
    where: { productId: productId },
    include: { attributeValues: { include: { attribute: true } } },
  });

  return retrieveAttributesObject(productVariants);
};

export const variantById = async (variantId: number) => {
  const variant = await prisma.variant.findUnique({
    where: { id: variantId },
    include: {
      product: true,
      attributeValues: { include: { attribute: true } },
    },
  });
  return variant;
};

export const retrieveAttributesObject = (variants: any) => {
  const reducedVariants = variants.reduce((prev: any, current: any) => {
    current.attributeValues.forEach((av: any) => {
      if (prev[av.attribute.name]) {
        prev[av.attribute.name].add(
          JSON.stringify({
            id: av.id,
            name: av.name,
            attributeId: av.attributeId,
          }),
        );
      } else {
        prev[av.attribute.name] = new Set([
          JSON.stringify({
            id: av.id,
            name: av.name,
            attributeId: av.attributeId,
          }),
        ]);
      }
    });
    return prev;
  }, {});

  return reducedVariants;
};
