'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CategoryWithChild } from '../../types';
import clsx from 'clsx';
import CategoryChildrenList from './category-children-list';

export default function CatMenuList({
  categories,
}: {
  categories: CategoryWithChild[];
}) {
  const parentCategories = categories.filter(
    (cat: CategoryWithChild) => cat.parentId === null
  );

  const [selectedParent, setSelectedParent] = useState({
    name: parentCategories[0].name,
    id: parentCategories[0].id,
  });

  return (
    <div className='h-full grid grid-cols-3 gap-2'>
      <ScrollArea className=' border-r col-span-1  border-slate-200 flex flex-col pr-2 mr-4'>
        {parentCategories.map((category: CategoryWithChild) => (
          <Button
            key={category.id}
            onMouseOver={() =>
              setSelectedParent({ name: category.name, id: category.id })
            }
            className={clsx(
              selectedParent.id === category.id && 'bg-slate-300'
            )}
            variant={'ghost'}
            asChild
          >
            <Link
              target='_blank'
              className='flex justify-between w-full'
              href={`/p/${category.name}`}
            >
              {category.name}
              <span className='text-xl'>&gt;</span>
            </Link>
          </Button>
        ))}
      </ScrollArea>
      <CategoryChildrenList
        categories={categories}
        selectedParent={selectedParent}
      />
    </div>
  );
}
