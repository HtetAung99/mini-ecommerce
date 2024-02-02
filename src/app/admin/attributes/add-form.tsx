"use client";

import { addAttribute } from "@/app/actions/attribute";
import { useRef } from "react";
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

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = handleSubmit(async (data) => {
    await addAttribute(data);
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        {...register("name", { required: "Attribute name is required." })}
        id="name"
        name="name"
        type="text"
        placeholder="Enter attribute"
      />
      {errors.name && <p className="error">{errors.name.message}</p>}
      <button type="submit" className="primaryBtn">
        Add
      </button>
    </form>
  );
}

export default AttributeAddForm;
