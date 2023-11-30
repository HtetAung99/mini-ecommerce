"use client";

import MyComboBox from "../../components/combobox";
import React, { useCallback, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useRouter } from "next/navigation";
import { addProduct } from "@/app/actions/product";

type FormValues = {
  title: string;
  price: number;
  category: string;
  description: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "Product Title is required.",
          },
        }
      : {},
  };
};

type Props = {
  categories: {
    id: number;
    name: string;
  }[];
};

export default function ModalForm({ categories }: Props) {
  const [selected, setSelected] = useState(categories[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onSubmit = handleSubmit(async (data) => {
    await addProduct({
      ...data,
      categoryId: selected.id,
    });

    onDismiss();
  });

  return (
    <div className="relative w-2/5 transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 bg-white px-8 pb-4 pt-7"
        action=""
      >
        <h1 className="text-2xl font-semibold">Create Product</h1>
        <hr />
        <div className="flex gap-2">
          <div className="flex w-full flex-col items-start gap-2">
            <label className="text-right text-sm" htmlFor="title">
              Title:
            </label>
            <input
              {...register("title", { required: true, maxLength: 10 })}
              className="w-full rounded-md bg-slate-300 p-2"
              type="text"
              name="title"
              id="title"
            />
            {errors?.title && (
              <p className="pl-1 text-sm italic text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* <div className='flex flex-col items-start gap-2'>
            <label className='text-right text-sm' htmlFor='price'>
              Price:
            </label>
            <div className='relative'>
              <span className='absolute inset-y-0 right-3 flex items-center pl-2 text-gray-600'>
                $
              </span>
              <input
                {...register('price', { required: true })}
                className='w-full bg-slate-300 p-2 rounded-md pr-7'
                type='number'
                name='price'
                id='price'
              />
            </div>
          </div> */}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-right text-sm" htmlFor="category">
            Category:
          </label>

          <MyComboBox
            selected={selected}
            setSelected={setSelected}
            categories={categories}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-right text-sm" htmlFor="description">
            Description:
          </label>
          <textarea
            {...register("description", { required: true })}
            className="h-32 w-full rounded-md bg-slate-300 p-2"
            name="description"
            id="description"
          />
        </div>
        <div className="flex flex-row-reverse py-2">
          <button
            type="submit"
            className="ml-5 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Create
          </button>
          <button className="px-3 py-2" onClick={onDismiss}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
