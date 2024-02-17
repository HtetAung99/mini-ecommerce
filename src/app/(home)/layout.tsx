import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { getCategories } from "../utils/categories";
import { CategoryWithChild } from "../types";
import CategoryMenu from "./components/category-menu";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CartProvider } from "../context/cart-provider";
import CartSpan from "./cart-span";
import UserDropdown from "./components/user-dropdown";
import { $Enums } from "@prisma/client";
import SearchBar from "./components/search-bar";
import DefaultStore from "./components/default-store";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";

export default async function HomeLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user:
    | {
        name: string;
        role: $Enums.Role;
      }
    | undefined = session?.user;
  const categories: CategoryWithChild[] = await getCategories();

  return (
    <div className="">
      <CartProvider>
        <div
          id="label-bar"
          className="flex flex-row items-center justify-end gap-5 bg-[#F8F8F8] px-[10vw] py-3"
        >
          <Link className={buttonVariants({ variant: "ghost" })} href={""}>
            Customize Your Spec
          </Link>
          <DefaultStore />
        </div>
        <div
          id="app-bar"
          className="m-auto my-3 flex flex-row items-center justify-between px-[10vw] py-2"
        >
          <div className="w-[15vw]">
            <Dialog>
              <DialogTrigger>
                <Menu size={25} />
              </DialogTrigger>
              <DialogContent className="px-[15vw]">
                <CategoryMenu categories={categories} />
              </DialogContent>
            </Dialog>
          </div>

          <SearchBar />
          <div className="flex flex-row items-center justify-center gap-5">
            {user ? (
              <UserDropdown user={user} />
            ) : (
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "gap-3 text-base",
                )}
                href="/authTab/"
              >
                <User />
                Sign In
              </Link>
            )}
            <div className="h-5  border border-solid border-slate-600"></div>
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "gap-3 text-base ",
              )}
              href="/cart/"
            >
              <CartSpan>
                <ShoppingCart className="" size={"24px"} />
              </CartSpan>
            </Link>
          </div>
        </div>
        <hr className="mx-[10vw]" />
        <main className="w-full py-5">{children}</main>
      </CartProvider>
      {auth}
    </div>
  );
}
