import type {
  Attribute,
  Category,
  OrderItem,
  Product,
  Variant,
  Order,
} from "@prisma/client";

export interface CategoryWithChild extends Category {
  children: Category[];
}

export interface CategoryWithParent extends Category {
  parent: Category;
}

export interface ProductWithNestedData extends ProductWithPromotion {
  category: Category;
  variants: VariantWithAttributeValues[];
}

export interface VariantWithAttributeValues extends Variant {
  attributeValues: AttributeValueWithAttribute[];
}
export interface ProductWithImage extends Product {
  imageUrl: string;
}
export interface ProductWithPromotion extends ProductWithImage {
  promotion?: Promotion?;
}

export interface OrderWithItems extends Order {
  orderItems: OrderItem[];
}

export interface VariantWithProductAndAttributeValues
  extends VariantWithAttributeValues {
  product: Product;
}

export interface AttributeValueWithAttribute extends Attribute {
  attributeId: Number;
  attribute: Attribute;
}

export interface CartItem {
  variantId: number;
  price: number;
  priceDiff: number;
  quantity: number;
}
