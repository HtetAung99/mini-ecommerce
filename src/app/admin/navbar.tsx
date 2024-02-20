"use client";

import { Role } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const navlinks: NavLinkType[] = [
  { name: "Dashboard", href: "/", access: [Role.ADMIN, Role.SUPERADMIN] },
  {
    name: "Products",
    href: "/products",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    name: "Categories",
    href: "/categories",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    name: "Attributes",
    href: "/attributes",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
  { name: "Stores", href: "/stores", access: [Role.SUPERADMIN] },
  {
    name: "Users Management",
    href: "/users-management",
    access: [Role.SUPERADMIN],
  },
  { name: "Groups", href: "/groups", access: [Role.SUPERADMIN] },
  { name: "Orders", href: "/orders", access: [Role.SUPERADMIN] },
  {
    name: "Settings",
    href: "/settings",
    access: [Role.ADMIN, Role.SUPERADMIN],
  },
];

interface NavLinkType {
  name: string;
  href: string;
  access: Role[];
}

export default function NavBar() {
  const user = useSession().data?.user;
  const role = user?.role;

  const filteredNavlinks = navlinks.filter((navlink) =>
    navlink.access.includes(role!),
  );

  const pathname = `/${usePathname()!.split("/")[2] || ""}`;
  return (
    <nav className="fixed h-screen w-56 bg-gray-200">
      <ul className="py-8">
        {filteredNavlinks.map((navlink, index) => {
          return (
            <li
              key={index}
              className={cn(
                "mb-8 leading-8",
                pathname == navlink.href && " border-l-4 border-blue-600",
              )}
            >
              <Link
                href={`/admin/${navlink.href}`}
                className={`pl-6 font-semibold ${
                  pathname == navlink.href
                    ? "text-blue-600"
                    : "text-gray-900 hover:text-gray-600"
                }`}
              >
                {navlink.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
