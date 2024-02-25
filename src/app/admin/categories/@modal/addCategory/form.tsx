"use client";

import { addCategory } from "@/app/actions/category";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
};

export default function ModalForm({
  parent,
  searchParams,
}: {
  parent: number | null;
  searchParams: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const { toast } = useToast();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await addCategory({
        ...data,
        parentId: Number(parent) || null,
      });

      toast({
        title: "Category Created",
        description: "Category has been created successfully",
      });
    } catch (e: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: e.message,
      });
    }

    onDismiss();
  });

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const { rootId, firstId } = searchParams;
  const [first, setFirst] = useState("");
  const [root, setRoot] = useState("");

  const getCatName = async (id: Number) => {
    console.log("called");
    const res = await fetch(`/api/categories?id=${id}`, { method: "GET" });
    const data = await res.json();

    return data.name;
  };

  useEffect(() => {
    if (rootId) {
      getCatName(rootId).then((name) => setRoot(name));
    }
    if (firstId) {
      getCatName(firstId).then((name) => setFirst(name));
    }
  }, [rootId, firstId]);

  return (
    <Card className="my-2 min-w-[30vw] max-w-[50vw] p-4 ">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Add new category
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <form>
          <div className="grid w-full items-center justify-items-start gap-4">
            <div className="flex flex-row items-center gap-2 text-sm font-bold leading-8 tracking-wider text-blue-500">
              {rootId && (
                <>
                  <p className="text-sm font-semibold">{root}</p>
                  <ChevronRight size={18} className="" />
                </>
              )}

              {firstId && (
                <>
                  <p className="text-sm font-semibold">{first}</p>
                  <ChevronRight size={18} className="" />
                </>
              )}
            </div>
            <div className="flex w-full items-center gap-5">
              <Label
                className="text-sm font-semibold leading-10 tracking-wider"
                htmlFor="name"
              >
                Name:
              </Label>
              <Input
                {...register("name", {
                  required: "Category Name is required.",
                })}
                id="name"
                placeholder="Category Name to be appended or added"
              />
            </div>

            {errors.name && (
              <p className="pl-1 text-sm italic text-red-600">
                {errors?.name?.message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4">
        <button
          onClick={onDismiss}
          className={cn("secondary-btn hover:bg-red-500")}
        >
          Cancel
        </button>
        <button onClick={onSubmit} className="primary-btn hover:bg-blue-700 ">
          Create
        </button>
      </CardFooter>
    </Card>
  );
}
