"use client";

import { addAttribute } from "@/app/actions/attribute";
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
    <form onSubmit={onSubmit}>
      <input
        {...register("name", { required: "Attribute name is required." })}
        id="name"
        name="name"
        type="text"
        placeholder="Enter attribute"
      />
      {errors.name && <p className="error">{errors.name.message}</p>}
      <button type="submit" className="primary-btn">
        Add
      </button>
    </form>
  );
}

export default AttributeAddForm;
