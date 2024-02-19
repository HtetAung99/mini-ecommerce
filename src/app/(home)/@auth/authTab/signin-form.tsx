"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type FormValues = {
  name: string;
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

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const router: AppRouterInstance = useRouter();
  const callbackUrl = useSearchParams()?.get("callbackUrl") || "";

  const onSubmit = handleSubmit(async (data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: `/${callbackUrl}`,
    });
  });

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit(event);
    }
  };

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <form onKeyDown={handleKeyDown} onSubmit={onSubmit}>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In to an account</CardTitle>
          <CardDescription>
            Enter your email below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn("google", { callbackUrl: "/" });
            }}
            className="justify-center gap-5"
            variant="default"
          >
            <svg role="img" width={18} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
            Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", { required: true })}
              id="email"
              type="email"
              placeholder="m@example.com"
            />
            {errors?.email && (
              <p className="pl-1 text-sm italic text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", { required: true })}
              id="password"
              type="password"
            />
            {errors?.password && (
              <p className="pl-1 text-sm italic text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="gap-5">
          <Button onClick={onDismiss} variant={"secondary"} className="w-full">
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
