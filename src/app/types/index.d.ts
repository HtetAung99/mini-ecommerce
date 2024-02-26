import type {
  Attribute,
  Category,
  OrderItem,
  Product,
  Variant,
  Order,
  User,
  Address,
  Role,
  PermissionRole,
  Permission,
  Entity,
  Group,
} from "@prisma/client";

import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface UserWithoutCredentials {
  id: string;
  email: string;
  name: string;
  role: Role;
}
export interface OrderWithCustomer extends OrderWithItems {
  customer: UserWithoutCredentials;
}

export interface OrderWithAllDetails extends OrderWithCustomer {
  address: Address;
}

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
  stocks: Stock[];
}
export interface ProductWithImage extends Product {
  imageUrl: string;
}
export interface ProductWithPromotion extends ProductWithImage {
  promotion?: number?;
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

export interface AttributeWithAttributeValue extends Attribute {
  attributeValues: AttributeValue[];
}

export interface PermissionWithEntity extends Permission {
  entity: Entity;
}

export interface PermissionRoleWithNestedData extends PermissionRole {
  permissions: PermissionWithEntity[];
}

export interface GroupWithNestedData extends Group {
  permissions: PermissionWithEntity[];
}

export interface SessionUser {
  id: string;
  name: string;
  role: Role;
  addresses: Address[];
  groups: GroupWithNestedData[];
  permissionRoles: PermissionRoleWithNestedData[];
  selectedAddress: Address;
  storeAccesses: number[];
}
