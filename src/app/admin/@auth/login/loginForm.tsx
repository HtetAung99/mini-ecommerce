'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { Resolver, useForm } from 'react-hook-form';

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
            type: 'required',
            message: 'Email is required.',
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
    await signIn('credentials', {
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
        className='bg-white px-8 pb-4 pt-7 flex flex-col gap-4'
      >
        <h1 className='text-2xl font-semibold'>Sign In</h1>
        <div className='flex gap-2 flex-col'>
          <div className='flex w-full flex-col items-start gap-2'>
            <label className='text-right text-sm' htmlFor='name'>
              Email:
            </label>
            <input
              {...register('email', { required: true })}
              className='w-full bg-slate-300 p-2 rounded-md'
              type='text'
              name='email'
              id='email'
            />

            {errors?.email && (
              <p className='text-sm text-red-600 pl-1 italic'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='flex w-full flex-col items-start gap-2'>
            <label className='text-right text-sm' htmlFor='name'>
              Password:
            </label>
            <input
              {...register('password', { required: true })}
              className='w-full bg-slate-300 p-2 rounded-md'
              type='password'
              name='password'
              id='password'
            />

            {errors?.password && (
              <p className='text-sm text-red-600 pl-1 italic'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='py-2 flex flex-row-reverse'>
            <button className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-500 ml-5'>
              Sign In
            </button>
            <button className='px-3 py-2' onClick={onDismiss}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
