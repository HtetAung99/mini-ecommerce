"use client";

import { addAttributeValue } from "@/app/actions/attribute";
import { AttributeWithAttributeValue } from "@/app/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
    <>
      <form
        className=" flex w-full justify-between gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {attribute.name !== "default" && (
          <>
            <Input
              className={cn(
                "h-10 w-1/3",
                attribute.name === "color" ? "w-1/3" : "w-2/3",
              )}
              {...register("name", {
                required: `Attribute's (${attribute.name})  value is required.`,
              })}
              id="name"
              name="name"
              type="text"
              placeholder={`Enter ${attribute.name}'s value`}
            />

            {attribute.name === "color" ? (
              <Input
                className={cn("h-10 w-1/3")}
                {...register("value")}
                id="value"
                name="value"
                type="text"
                placeholder="Enter color"
              />
            ) : null}

            <button type="submit" className="primary-btn">
              Add
            </button>
          </>
        )}
      </form>
      {errors.name && (
        <p className="px-1 py-2 text-xs font-light italic text-red-500">
          {errors.name.message}
        </p>
      )}
    </>
  );
}

export default AttributeValueAddForm;
