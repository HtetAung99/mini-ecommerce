import CategoryBreadcrumb from '@/app/(home)/components/category-breadcrumb';
import React from 'react';

export default async function PLayout({
  params,
  children,
}: {
  params: any;
  children: React.ReactNode;
}) {
  const categoryPaths = params.category.map((c: string) =>
    decodeURIComponent(c)
  );

  return (
    <div className=''>
      <CategoryBreadcrumb categoryPaths={categoryPaths} />
      <div className='py-5 grid grid-cols-4'>{children}</div>
    </div>
  );
}
