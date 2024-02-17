"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { log } from "console";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export function Pagination({ count }: { count: number }) {
  const router = useRouter();
  const fullPath = usePathname();
  const searchParams = Array.from(useSearchParams()?.entries() || []);

  const pageNum = parseInt(
    searchParams.find(([key]) => key === "pageNum")?.[1] ?? "1",
  );

  const pageSize = parseInt(
    searchParams.find(([key]) => key === "pageSize")?.[1] ?? "9",
  );

  const [totalPages, setTotalPages] = useState(
    Math.max(Math.ceil(count / pageSize), 1),
  );

  const baseParamString = searchParams
    .filter(([key, value]) => key !== "pageNum" && key !== "pageSize")
    .reduce((prev, [key, value]) => {
      if (key === "price") {
        const val = value.toString().split("-");
        return `${prev}${key}=${val[0]}-${val[1]}&`;
      } else {
        return `${prev}${key}=${value}&`;
      }
    }, "");

  useEffect(() => {
    setTotalPages(Math.max(Math.ceil(count / pageSize), 1));
  }, [count, pageSize]);
  return (
    <div className="flex items-center  justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              router.push(
                `${fullPath}?${baseParamString}pageNum=${pageNum}&pageSize=${parseInt(
                  value,
                )}`,
              );
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[3, 6, 9, 12, 15, 18, 21].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {`Page ${pageNum} of ${totalPages}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            disabled={pageNum === 1}
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              router.push(
                `${fullPath}?${baseParamString}pageNum=${1}&pageSize=${pageSize}`,
              );
            }}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            disabled={pageNum === 1}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              router.push(
                `${fullPath}?${baseParamString}pageNum=${
                  pageNum - 1
                }&pageSize=${pageSize}`,
              );
            }}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageNum === totalPages}
            onClick={() => {
              router.push(
                `${fullPath}?${baseParamString}pageNum=${
                  pageNum + 1
                }&pageSize=${pageSize}`,
              );
            }}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={pageNum === totalPages}
            onClick={() => {
              router.push(
                `${fullPath}?${baseParamString}pageNum=${totalPages}&pageSize=${pageSize}`,
              );
            }}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
