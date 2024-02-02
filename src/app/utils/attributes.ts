import { cache } from "react";
import prisma from "../../../lib/prisma";
import { AttributeWithAttributeValue } from "../types";

export const getAttributes = cache(async () => {
  const attributes: AttributeWithAttributeValue[] =
    await prisma.attribute.findMany({
      include: {
        attributeValues: true,
      },
    });

  return attributes;
});
