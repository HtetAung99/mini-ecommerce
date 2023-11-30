"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Resolver, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required.",
          },
        }
      : {},
  };
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
    });

    onDismiss();
    router.refresh();
  });
  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 bg-white px-8 pb-4 pt-7"
      >
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col items-start gap-2">
            <label className="text-right text-sm" htmlFor="name">
              Email:
            </label>
            <input
              {...register("email", { required: true })}
              className="w-full rounded-md bg-slate-300 p-2"
              type="text"
              name="email"
              id="email"
            />

            {errors?.email && (
              <p className="pl-1 text-sm italic text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <label className="text-right text-sm" htmlFor="name">
              Password:
            </label>
            <input
              {...register("password", { required: true })}
              className="w-full rounded-md bg-slate-300 p-2"
              type="password"
              name="password"
              id="password"
            />

            {errors?.password && (
              <p className="pl-1 text-sm italic text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-row-reverse py-2">
            <button className="ml-5 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-500">
              Sign In
            </button>
            <button className="px-3 py-2" onClick={onDismiss}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
