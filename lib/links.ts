import { Role } from "@prisma/client";

interface NavLinkType {
  name: string;
  href: string;
  access: Role[];
}

const navlinks: NavLinkType[] = [
  {
    name: "Dashboard",
    href: "/",
    access: [
      Role.ADMIN,
      Role.SUPERADMIN,
      Role.GENERAL_MANAGER,
      Role.MANAGER,
      Role.STAFF,
    ],
  },
  {
    name: "Products",
    href: "products",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    name: "Categories",
    href: "categories",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    name: "Attributes",
    href: "attributes",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
  { name: "Stores", href: "stores", access: [Role.SUPERADMIN] },
  {
    name: "Users Management",
    href: "users-management",
    access: [Role.SUPERADMIN],
  },
  { name: "Groups", href: "groups", access: [Role.SUPERADMIN] },
  {
    name: "Orders",
    href: "orders",
    access: [Role.SUPERADMIN, Role.ADMIN, Role.STAFF],
  },
  {
    name: "Settings",
    href: "settings",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
];

export default navlinks;
