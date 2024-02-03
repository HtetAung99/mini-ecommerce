"use client";

import MyComboBox from "../../../components/combobox";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import P from "@/app/(home)/p/[...category]/page";
import AttributeCommandBox from "./attribute-command-box";
import AttributeValueCommandBox from "./attribute-value-command-box";
import { AttributeWithAttributeValue } from "@/app/types";
import { AttributeValue } from "@prisma/client";

type FormValues = {
  title: string;
  price: number;
  category: Category;
  description?: string;
  published?: boolean;
};

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.title ? values : {},
//     errors: !values.title
//       ? {
//           title: {
//             type: "required",
//             message: "Product Title is required.",
//           },
//         }
//       : {},
//   };
// };

type Category = {
  id: number;
  name: string;
};

export default function ModalForm({
  categories,
  attributes,
}: {
  categories: Category[];
  attributes: AttributeWithAttributeValue[];
}) {
  const [selected, setSelected] = useState(categories[0]);
  const [published, setPublished] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAttribute, setSelectedAttribute] =
    useState<AttributeWithAttributeValue>(attributes[0]);
  const [selectedAttributeValue, setSelectedAttributeValue] = useState<
    AttributeValue | undefined
  >(attributes[0].attributeValues[0]);

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
        console.log(signedUrl);
        setFiles((prev) => [...prev, signedUrl]);
        setLoading(false);
      }
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    data.category = selected;
    data.published = published;
    ``;
    console.log(data);
    // await addProduct({
    //   ...data,
    //   categoryId: selected.id,
    // });

    // router.back();
  });

  return (
    <form className="w-[60vw] rounded-md bg-slate-50 p-5 px-7 shadow-md">
      <h1 className="my-2 py-2 text-start text-2xl font-bold leading-10 tracking-wider">
        Create New Product
      </h1>
      <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-3">
        <Card className="bg-slate-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold leading-7 tracking-wide">
              General Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col items-start ">
              <label
                htmlFor="title"
                className="text-right text-sm font-medium leading-9 tracking-wide"
              >
                Product Title
              </label>
              <Input
                {...register("title", {
                  required: "Product Name is required",
                  maxLength: {
                    value: 20,
                    message: "Title should be less than 20 characters",
                  },
                })}
                className="mb-2 w-full rounded-md bg-slate-200"
                type="text"
                name="title"
                id="title"
              />
              {errors?.title && (
                <p className="my-2 pl-1 text-sm italic text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-start">
              <label
                htmlFor="description"
                className="text-right text-sm font-medium leading-9 tracking-wide"
              >
                Description (optional)
              </label>
              <textarea
                {...register("description")}
                className="mb-2 h-24 max-h-24 w-full max-w-full rounded-md bg-slate-200 p-2 text-xs"
                name="description"
                id="description"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="row-span-2 bg-slate-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold leading-7 tracking-wide">
              Product Variant & Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start">
              <label
                className="text-right text-sm font-medium leading-9 tracking-wide"
                htmlFor="category"
              >
                Product Photo
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
                </div>
              </div>
              <div className="relative mb-4 cursor-pointer self-center">
                <input
                  type="file"
                  accept="image/*"
                  placeholder="Upload Photo"
                  className="absolute inset-0 left-0 top-0 h-full w-[150px] cursor-pointer self-center px-4 py-2 align-middle opacity-0"
                  onChange={handleFilesUpload}
                  multiple
                />
                <button
                  onClick={(e) => e.preventDefault()}
                  className="primary-btn  w-full "
                >
                  Add more photos
                </button>
              </div>
              <h3 className="text-base font-semibold leading-10 tracking-wide">
                Product's Default Variant
              </h3>
              <div className="flex w-full flex-col justify-start ">
                <AttributeCommandBox
                  attributes={attributes}
                  selectedAttribute={selectedAttribute}
                  setSelectedAttribute={setSelectedAttribute}
                  setSelectedAttributeValue={setSelectedAttributeValue}
                />
                <AttributeValueCommandBox
                  attributeValues={selectedAttribute.attributeValues}
                  selectedAttributeValue={selectedAttributeValue}
                  setSelectedAttributeValue={setSelectedAttributeValue}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="max-h-min bg-slate-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold leading-7 tracking-wide">
              Category & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start">
              <label
                className="text-right text-sm font-medium leading-9 tracking-wide"
                htmlFor="category"
              >
                Category
              </label>

              <MyComboBox
                selected={selected}
                setSelected={setSelected}
                categories={categories}
              />
            </div>
            <div className="flex flex-col items-start ">
              <label
                className="text-right text-sm font-medium leading-9 tracking-wide"
                htmlFor="price"
              >
                Price
              </label>

              <Input
                className="mb-2 w-full rounded-md bg-slate-200"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                placeholder="$ "
                type="number"
                name="price"
                id="price"
              />
              {errors?.price && (
                <p className="my-2 pl-1 text-sm italic text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="mt-3 flex items-center gap-4">
              <label
                htmlFor="published"
                className="cursor-pointer text-sm font-medium leading-9 tracking-wide peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Published
              </label>
              <Checkbox
                checked={published}
                onCheckedChange={() => setPublished(!published)}
                id="published"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="my-3 flex w-full flex-row items-center justify-between border-t border-slate-300 py-3 ">
        <button
          onClick={() => router.back()}
          className={cn("secondary-btn w-1/4 ")}
        >
          Cancel
        </button>
        <button onClick={onSubmit} className={cn("primary-btn w-1/4")}>
          Create
        </button>
      </div>
    </form>
  );
}
