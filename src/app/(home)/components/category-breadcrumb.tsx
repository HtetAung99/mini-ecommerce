import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CategoryBreadcrumb({
  categoryPaths,
}: {
  categoryPaths: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-600 md:flex-row">
      {categoryPaths.map((c, idx) => {
        if (idx == categoryPaths.length - 1) {
          return (
            <Badge
              key={idx}
              className="w-fit cursor-default"
              variant={"outline"}
            >
              {c}
            </Badge>
          );
        }
        return (
          <div>
            <Badge key={idx} className="mr-2" variant={"secondary"}>
              <Link
                href={`/p/${categoryPaths.slice(0, idx + 1).join("/")}`}
                key={c}
              >
                {c}
              </Link>
            </Badge>
            &gt;
          </div>
        );
      })}
    </div>
  );
}
