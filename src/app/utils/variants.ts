import prisma from '../../../lib/prisma';
import { VariantWithAttributeValues } from '../types';

export const attributesValuesByProductId = async (productId: number) => {
  const productVariants = await prisma.variant.findMany({
    where: { productId: productId },
    include: { attributeValues: { include: { attribute: true } } },
  });

  return retrieveAttributesObject(productVariants);
};

export const retrieveAttributesObject = (
  variants: VariantWithAttributeValues[]
) => {
  return variants.reduce((prev: any, current) => {
    current.attributeValues.forEach((av) => {
      if (prev[av.attribute.name]) {
        prev[av.attribute.name].push({
          id: av.id,
          name: av.name,
          attributeId: av.attributeId,
        });
      } else {
        prev[av.attribute.name] = [
          {
            id: av.id,
            name: av.name,
            attributeId: av.attributeId,
          },
        ];
      }
    });
    return prev;
  }, {});
};
