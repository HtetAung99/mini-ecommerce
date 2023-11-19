'use client';

import { Separator } from '@/components/ui/separator';
import { Category } from '@prisma/client';
import { CategoryWithChild } from '../../types';
import Link from 'next/link';

export default function CategoryChildrenList({
  categories,
  selectedParent,
}: {
  categories: CategoryWithChild[];
  selectedParent: { name: string; id: Number };
}) {
  const filteredCategories = categories.filter(
    (cat) => cat.parentId === selectedParent.id
  );

  return (
    <div className='overflow-auto col-span-2 flex flex-wrap flex-col gap-2'>
      {filteredCategories.map((category: CategoryWithChild) => (
        <div key={category.id} className='flex-shrink w-1/2 flex flex-col'>
          <h6 className=' text-base font-semibold  py-3'>
            <Link
              href={`/p/${selectedParent.name}/${category.name}`}
              target='_blank'
            >
              {category.name}
            </Link>
          </h6>

          <ul className='pb-3'>
            {category.children.map((child: Category) => (
              <li
                key={child.id}
                className='text-sm font font-normal text-slate-600'
              >
                <Link
                  href={`/p/${selectedParent.name}/${category.name}/${child.name}`}
                  target='_blank'
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
          <Separator />
        </div>
      ))}
    </div>
  );
}
