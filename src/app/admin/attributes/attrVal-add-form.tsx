"use client";

import { addAttributeValue } from "@/app/actions/attribute";
import { AttributeWithAttributeValue } from "@/app/types";
import { useForm } from "react-hook-form";

function AttributeValueAddForm({
  attribute,
}: {
  attribute: AttributeWithAttributeValue;
}) {
  type FormValues = {
    name: string;
    value?: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    await addAttributeValue({ ...data, attributeId: attribute.id });
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

      {attribute.name === "color" ? (
        <input
          {...register("value")}
          id="value"
          name="value"
          type="text"
          placeholder="Enter color"
        />
      ) : null}
      {errors.name && <p className="error">{errors.name.message}</p>}
      <button type="submit" className="primary-btn">
        Add
      </button>
    </form>
  );
}

export default AttributeValueAddForm;
