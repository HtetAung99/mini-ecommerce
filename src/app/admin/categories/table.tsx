import Link from "next/link";
import { getCategories } from "@/app/utils/categories";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <div className=" grid grid-cols-3  bg-transparent">
        <div className="flex h-96 flex-col gap-2 overflow-y-scroll rounded-l-md border border-r-0 border-slate-200">
          <Link
            href={`/admin/categories/addCategory`}
            className="cursor-pointer py-2 pl-2.5 pt-2.5 font-mono font-semibold text-blue-700 hover:bg-slate-300"
          >
            + Add Category
          </Link>

          {rootCategories.map((rc) => (
            <Tooltip>
              <TooltipTrigger className="flex">
                <Link
                  key={rc.id}
                  href={`/admin/categories?rootId=${rc.id}`}
                  className={`w-full cursor-pointer py-2 pl-7 text-left font-mono text-sm hover:bg-slate-300 
                ${rc.id == selectedRoot ? "bg-slate-300" : ""} `}
                >
                  {rc.name}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <Link
                  className="text-sm font-semibold text-blue-500"
                  href={`/admin/categories/editCategory?catId=${rc.id}`}
                >
                  Edit
                </Link>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex h-96 flex-col gap-2 overflow-y-scroll border border-r-0 border-slate-200">
          {selectedRoot ? (
            <Link
              href={`/admin/categories/addCategory?rootId=${selectedRoot}`}
              className="cursor-pointer py-2 pl-2.5 pt-2.5 font-mono font-semibold text-blue-700 hover:bg-slate-300"
            >
              + Add Category
            </Link>
          ) : null}
          {firstSubs.map((fc) => (
            <Tooltip>
              <TooltipTrigger className="flex">
                <Link
                  key={fc.id}
                  href={`/admin/categories?rootId=${selectedRoot}&firstId=${fc.id}`}
                  className={`w-full cursor-pointer py-2 pl-7 text-left font-mono text-sm hover:bg-slate-300 ${
                    fc.id == selectedFirst && "bg-slate-300"
                  }`}
                >
                  {fc.name}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <Link
                  className="text-sm font-semibold text-blue-500"
                  href={`/admin/categories/editCategory?catId=${fc.id}`}
                >
                  Edit
                </Link>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex h-96 flex-col gap-2 overflow-y-scroll rounded-r-md border border-slate-200 ">
          {selectedFirst ? (
            <Link
              href={`/admin/categories/addCategory?rootId=${selectedRoot}&firstId=${selectedFirst}`}
              className="cursor-pointer py-2 pl-2.5 pt-2.5 font-mono font-semibold text-blue-700 hover:bg-slate-300"
            >
              + Add Category
            </Link>
          ) : null}
          {secondSubs.map((sc) => (
            <Tooltip>
              <TooltipTrigger className="flex">
                <Link
                  key={sc.id}
                  href={`/admin/categories?rootId=${selectedRoot}&firstId=${selectedFirst}&secondId=${sc.id}`}
                  className={`w-full cursor-pointer py-2 pl-7 text-left font-mono text-sm hover:bg-slate-300 ${
                    sc.id == selectedSecond ? "bg-slate-300" : ""
                  }`}
                >
                  {sc.name}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <Link
                  className="text-sm font-semibold text-blue-500"
                  href={`/admin/categories/editCategory?catId=${sc.id}`}
                >
                  Edit
                </Link>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
