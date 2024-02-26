"use client";
import { editAttributeValue } from "@/app/actions/attribute";
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
import { AttributeValue } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ValueEditForm({
  attributeValue,
  valueSet,
}: {
  attributeValue: AttributeValue;
  valueSet: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const handleEdit = async (e: any) => {
    e.preventDefault();
    setError(null);
    if (nameRef.current?.value !== "") {
      try {
        await editAttributeValue(
          attributeValue!.id,
          nameRef.current!.value,
          valueRef.current?.value,
        );
        toast({
          title: "Category updated successfully",
          description: `Previuos Attribute Value with id(${attributeValue?.id}) has been successfully updated!`,
        });
        nameRef.current!.value = "";
        valueRef.current!.value = "";
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
    <Card>
      <CardHeader>
        <CardTitle>Edit Attribute Value</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="" className="flex flex-col gap-5">
          <div className="flex w-80 items-center gap-5">
            <Label
              className="text-sm font-semibold leading-10 tracking-wider"
              htmlFor="name"
            >
              Name:
            </Label>
            <Input ref={nameRef} id="name" placeholder={attributeValue?.name} />
          </div>
          {error && (
            <span className="text-sm italic text-red-500">{error}</span>
          )}
          {valueSet && (
            <div className="flex w-80 items-center gap-5">
              <Label
                className="text-sm font-semibold leading-10 tracking-wider"
                htmlFor="value"
              >
                Value:
              </Label>
              <Input
                ref={valueRef}
                id="value"
                placeholder={attributeValue?.value!}
              />
            </div>
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
