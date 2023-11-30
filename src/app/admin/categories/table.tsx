import Link from "next/link";
import { getCategories } from "@/app/utils/categories";

export default async function CategoryTable({
  searchParams,
}: {
  searchParams: any;
}) {
  const categories = await getCategories();

  const selectedRoot = Number(searchParams.rootId) || null;
  const selectedFirst = Number(searchParams.firstId) || null;
  const selectedSecond = Number(searchParams.secondId) || null;

  const firstSubs =
    selectedRoot != null
      ? categories.filter((category) => category.parentId === selectedRoot)
      : [];

  const secondSubs =
    selectedFirst != null
      ? categories.filter((category) => category.parentId === selectedFirst)
      : [];

  const rootCategories = categories.filter(
    (category) => category.parentId === null,
  );

  return (
    <div className="mt-16 grid grid-cols-3">
      <div className="flex h-96 flex-col gap-2 overflow-y-scroll rounded-l-md border border-r-0 border-gray-400 bg-gray-100">
        <Link
          href={`/admin/categories/addCategory`}
          className="cursor-pointer py-2 pl-2.5 pt-2.5 font-mono font-semibold text-blue-700 hover:bg-slate-300"
        >
          + Add Category
        </Link>

        {rootCategories.map((rc) => (
          <Link
            key={rc.id}
            href={`/admin/categories?rootId=${rc.id}`}
            className={`cursor-pointer py-2 pl-7 font-mono text-sm hover:bg-slate-300 
            ${rc.id == selectedRoot ? "bg-slate-300" : ""} `}
          >
            {rc.name}
          </Link>
        ))}
      </div>
      <div className="flex h-96 flex-col gap-2 overflow-y-scroll border border-r-0 border-gray-400 bg-gray-100">
        {selectedRoot ? (
          <Link
            href={`/admin/categories/addCategory${
              selectedRoot ? `?rootId=${selectedRoot}` : ""
            }`}
            className="cursor-pointer py-2 pl-2.5 pt-2.5 font-mono font-semibold text-blue-700 hover:bg-slate-300"
          >
            + Add Category
          </Link>
        ) : null}
        {firstSubs.map((fc) => (
          <Link
            key={fc.id}
            href={`/admin/categories?rootId=${selectedRoot}&firstId=${fc.id}`}
            className={`cursor-pointer py-2 pl-7 font-mono text-sm hover:bg-slate-300 ${
              fc.id == selectedFirst ? "bg-slate-300" : ""
            }`}
          >
            {fc.name}
          </Link>
        ))}
      </div>
      <div className="flex h-96 flex-col gap-2 overflow-y-scroll rounded-r-md border border-gray-400 bg-gray-100">
        {selectedFirst ? (
          <Link
            href={`/admin/categories/addCategory${
              selectedRoot ? `?rootId=${selectedRoot}` : ""
            }${selectedFirst ? `&firstId=${selectedFirst}` : ""}`}
            className="cursor-pointer py-2 pl-2.5 pt-2.5 font-mono font-semibold text-blue-700 hover:bg-slate-300"
          >
            + Add Category
          </Link>
        ) : null}
        {secondSubs.map((sc) => (
          <Link
            key={sc.id}
            href={`/admin/categories?rootId=${selectedRoot}&firstId=${selectedFirst}&secondId=${sc.id}`}
            className={`cursor-pointer py-2 pl-7 font-mono text-sm hover:bg-slate-300 ${
              sc.id == selectedSecond ? "bg-slate-300" : ""
            }`}
          >
            {sc.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
