"use client";
import { editCategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";
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
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function CategoryEditForm({
  category,
}: {
  category: Category | null;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const handleEdit = async (e: any) => {
    e.preventDefault();
    setError(null);
    if (nameRef.current?.value !== "") {
      try {
        await editCategory(category!.id, nameRef.current!.value);
        toast({
          title: "Category updated successfully",
          description: `Previuos Category: "${category?.name}" with id(${category?.id}) has been successfully updated to ${
            nameRef.current!.value
          }!`,
        });
        nameRef.current!.value = "";
      } catch (error: any) {
        toast({
          title: "Ohh no! Something went wrong!",
          description: error.message,
        });
      }

      router.back();
    } else {
      setError("Name cannot be empty!");
    }
  };
  return (
    <Card
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      className=""
    >
      <CardHeader>
        <CardTitle>Edit Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="flex w-80 items-center gap-5">
            <Label
              className="text-sm font-semibold leading-10 tracking-wider"
              htmlFor="name"
            >
              Name:
            </Label>
            <Input ref={nameRef} id="name" placeholder={category?.name} />
          </div>
          {error && (
            <span className="text-sm italic text-red-500">{error}</span>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <Button onClick={() => router.back()} variant={"secondary"}>
          Cancel
        </Button>
        <Button onClick={handleEdit} variant={"default"}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
