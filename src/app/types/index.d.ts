import type { Attribute, Category, Product, Variant } from '@prisma/client';

export interface CategoryWithChild extends Category {
  children: Category[];
}

export interface CategoryWithParent extends Category {
  parent: Category;
}

export interface ProductWithNestedData extends Product {
  category: Category;
  variants: VariantWithAttributeValues[];
}

export interface VariantWithAttributeValues extends Variant {
  attributeValues: AttributeValueWithAttribute[];
}

export interface AttributeValueWithAttribute extends Attribute {
  attributeId: Number;
  attribute: Attribute;
}
