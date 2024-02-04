"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AttributeSelectList from "@/app/admin/products/@productModal/addProduct/components/attribute-select-list";
import { useForm } from "react-hook-form";
import { AttributeValue } from "@prisma/client";
import { useRouter } from "next/navigation";
import { AttributeWithAttributeValue } from "@/app/types";
import { addVariant } from "@/app/actions/variant";
import { useToast } from "@/components/ui/use-toast";

export default function AddVaraintForm({
  attributes,
  productId,
}: {
  attributes: AttributeWithAttributeValue[];
  productId: number;
}) {
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const handleFilesUpload = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const files = e.target.files;

    Array.from(files).forEach(async (file: any) => {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/products/image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { signedUrl } = await res.json();

        setFiles((prev) => [...prev, signedUrl]);
        setLoading(false);
      }
    });
  };

  type FormValues = {
    productId: number;
    imageUrls?: string[];
    priceDiff: number;
    attributeValues: AttributeValue[];
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { toast } = useToast();
  const onSubmit = handleSubmit(async (data: FormValues) => {
    data.productId = Number(productId);
    data.imageUrls = files;
    data.attributeValues = Object.values(selectedAttributes);
    await addVariant(data)
      .then(() => {
        router.back();
      })
      .catch((e) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      })
      .finally(() => {
        toast({
          title: "Variant Created",
          description: "Variant has been added to this product successfully",
        });
      });
  });

  const router = useRouter();
  return (
    <Card className="max-h-[800px] w-2/3">
      <CardHeader>
        <CardTitle className="font-xl px-2 font-bold leading-10 tracking-widest">
          Add New Variant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="row-span-2 max-h-[600px] overflow-auto bg-slate-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold leading-7 tracking-wide">
              Variant Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start">
              <label
                className="text-right text-sm font-medium leading-9 tracking-wide"
                htmlFor="category"
              >
                Photo{" "}
                <span className=" text-bold text-xs leading-6 tracking-normal">
                  ( Click or Press the box below to upload )
                </span>
              </label>
              <div className="relative w-full">
                {loading && (
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-sm  font-semibold leading-7 tracking-widest">
                    Loading ...
                  </p>
                )}
                <div className="flew-row my-4 flex  h-48 w-full flex-wrap justify-around gap-5 overflow-auto rounded-md border border-dashed border-slate-400 bg-slate-200 p-4">
                  {/* <Skeleton className="my-4 h-48 w-full rounded-md border border-dashed border-slate-400 bg-slate-200" /> */}
                  {files.length > 0 &&
                    files.map((file) => (
                      <img
                        className="h-16 w-20 rounded-md border border-slate-300 object-contain"
                        src={file}
                      />
                    ))}
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Upload Photo"
                    className="absolute inset-0 left-0 top-0 h-full w-full cursor-pointer self-center px-4 py-2 align-middle opacity-0"
                    onChange={handleFilesUpload}
                    multiple
                  />
                </div>
              </div>
              {/* <div className="relative mb-4 cursor-pointer self-center">
                <button
                  onClick={(e) => e.preventDefault()}
                  className="primary-btn  w-full "
                >
                  Add more photos
                </button>
              </div> */}

              <div className="my-3 flex w-full flex-row items-center gap-4 px-2">
                <Label
                  className="w-1/2 text-start font-medium leading-9 tracking-wide"
                  htmlFor="priceDiff"
                >
                  Price Diffrence
                </Label>
                <Input
                  {...register("priceDiff", {
                    required: "Price Difference is required!",
                    valueAsNumber: true,
                  })}
                  className="h-10 rounded-md bg-slate-200"
                  id="priceDiff"
                  name="priceDiff"
                  type="number"
                />
              </div>
              {errors?.priceDiff && (
                <p className="my-2 pl-1 text-sm italic text-red-600">
                  {errors.priceDiff.message}
                </p>
              )}

              <AttributeSelectList
                selectedAttributes={selectedAttributes}
                setSelectedAttributes={setSelectedAttributes}
                attributes={attributes}
              />
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex items-center justify-between ">
        <Button
          className="w-1/4"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          variant={"secondary"}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} className="w-1/4" variant={"default"}>
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
