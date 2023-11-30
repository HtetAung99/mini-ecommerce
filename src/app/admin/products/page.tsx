import Table from "./table";
import MyDropdown from "./components/dropdown";
import Link from "next/link";

export default async function ProductsPage() {
  return (
    <main className="">
      <h1 className="mb-4 text-xl font-semibold">Products</h1>
      <div className="flex w-full items-center justify-between">
        <Link
          href={"/admin/products/addProduct"}
          className="flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-md bg-blue-500 px-2 py-2"
        >
          <span className="rounded-sm bg-white px-1 text-sm font-bold text-blue-500">
            &#43;
          </span>
          <span className="text-xs font-semibold uppercase text-white">
            New Product
          </span>
        </Link>
        <div>
          <MyDropdown />
        </div>
      </div>
      <Table />
    </main>
  );
}
