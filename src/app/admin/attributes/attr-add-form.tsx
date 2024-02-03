"use client";

import { addAttribute } from "@/app/actions/attribute";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

function AttributeAddForm() {
  type FormValues = {
    name: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    await addAttribute(data);
    reset();
  });

  return (
    <div>
      <form
        className="flex w-full gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Input
          className="h-10 w-2/3"
          {...register("name", { required: "Attribute name is required." })}
          id="name"
          name="name"
          type="text"
          placeholder="Enter attribute"
        />

        <button type="submit" className="primary-btn">
          Add
        </button>
      </form>
      {errors.name && (
        <p className="px-1 py-2 text-xs font-light italic text-red-500">
          {errors.name.message}
        </p>
      )}
    </div>
  );
}

export default AttributeAddForm;
