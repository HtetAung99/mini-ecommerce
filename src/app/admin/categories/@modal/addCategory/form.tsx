"use client";

import { addCategory } from "@/app/actions/category";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm, Resolver } from "react-hook-form";
type FormValues = {
  name: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Category Name is required.",
          },
        }
      : {},
  };
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
  } = useForm<FormValues>({ resolver });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await addCategory({
      ...data,
      parentId: Number(parent) || null,
    });

    onDismiss();
  });

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const { rootId, firstId } = searchParams;

  const getCatName = async (id: Number) => {
    const res = await fetch(`/api/categories?id=${id}`, { method: "GET" });
    const data = await res.json();

    return data.name;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 bg-white px-8 pb-4 pt-7"
    >
      <h1 className="text-2xl font-semibold">Create Category</h1>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col items-start gap-2">
          <label className="text-right text-sm" htmlFor="name">
            Category Name:
          </label>
          <div className="flex flex-row items-center gap-2">
            {rootId && (
              <>
                <p className="text-sm font-semibold">{getCatName(rootId)}</p>
                <div className="h-5 border-l-2 border-gray-800"></div>
              </>
            )}

            {firstId && (
              <>
                <p className="text-sm font-semibold">{getCatName(firstId)}</p>
                <div className="h-5 border-l-2 border-gray-800"></div>
              </>
            )}
          </div>
          <input
            {...register("name", { required: true, maxLength: 10 })}
            className="w-full rounded-md bg-slate-300 p-2"
            type="text"
            name="name"
            id="name"
          />
          {errors?.name && (
            <p className="pl-1 text-sm italic text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-row-reverse py-2">
          <button className="ml-5 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-500">
            Create
          </button>
          <button className="px-3 py-2" onClick={onDismiss}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
