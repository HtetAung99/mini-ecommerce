"use client";
import { editAttribute } from "@/app/actions/attribute";
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
import { Attribute } from "@prisma/client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function NameEditForm({ attribute }: { attribute: Attribute }) {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const handleEdit = async (e: any) => {
    e.preventDefault();
    setError(null);
    if (nameRef.current?.value !== "") {
      try {
        await editAttribute(attribute!.id, nameRef.current!.value);
        toast({
          title: "Category updated successfully",
          description: `Previuos Attribute: "${attribute?.name}" with id(${attribute?.id}) has been successfully updated to ${
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
    >
      <CardHeader>
        <CardTitle>Edit Attribute Name</CardTitle>
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
            <Input ref={nameRef} id="name" placeholder={attribute?.name} />
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
