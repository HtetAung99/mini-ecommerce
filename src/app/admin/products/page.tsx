import Table from "./table";
import MyDropdown from "./components/dropdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";

export default async function ProductsPage() {
  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <Button className="mx-2 flex flex-row items-center gap-3 bg-blue-500 text-sm font-semibold hover:bg-blue-700">
          <PlusSquare size={18} />
          <Link href={"/admin/products/addProduct"}>Add New Product</Link>
        </Button>
        <div>
          <MyDropdown />
        </div>
      </div>
      <Table />
    </main>
  );
}
