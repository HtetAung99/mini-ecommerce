import Link from "next/link";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import { getCategories } from "../utils/categories";
import { CategoryWithChild } from "../types";
import CategoryMenu from "./components/category-menu";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CartProvider } from "./cart-provider";
import CartSpan from "./cart-span";
import UserDropdown from "./components/user-dropdown";
import { $Enums } from "@prisma/client";

export default async function HomeLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
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
          className="w-full flex flex-row bg-[#F8F8F8] py-3 px-[13vw] gap-5 justify-end items-center">
          <Link className={buttonVariants({ variant: "ghost" })} href={""}>
            Customize Your Spec
          </Link>

          <Link className={buttonVariants({ variant: "ghost" })} href={""}>
            Find Your Nearest Store
          </Link>
        </div>
        <div
          id="app-bar"
          className="m-auto my-3 px-[13vw] flex flex-row justify-between py-2 items-center">
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

          <Input
            className="w-[45%]"
            placeholder="Search your items, brands ..."
          />
          <div className="flex-row flex justify-center items-center gap-5">
            {user ? (
              <UserDropdown user={user} />
            ) : (
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "gap-3 text-base"
                )}
                href="/authTab/">
                <User />
                Sign In
              </Link>
            )}
            <div className="h-5  border-slate-600 border-solid border"></div>
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "gap-3 text-base "
              )}
              href="/cart/">
              <CartSpan>
                <ShoppingCart className="" size={"24px"} />
              </CartSpan>
            </Link>
          </div>
        </div>
        <hr className="mx-[13vw]" />
        <main className="px-[13vw] py-5">{children}</main>
      </CartProvider>
      {auth}
    </div>
  );
}
