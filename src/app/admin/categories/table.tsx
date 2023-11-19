import Link from 'next/link';
import { getCategories } from '@/app/utils/categories';

export default async function CategoryTable({
  searchParams,
}: {
  searchParams: any;
}) {
  const categories = await getCategories();

  const selectedRoot = Number(searchParams.rootId) || null;
  const selectedFirst = Number(searchParams.firstId) || null;
  const selectedSecond = Number(searchParams.secondId) || null;

  const firstSubs =
    selectedRoot != null
      ? categories.filter((category) => category.parentId === selectedRoot)
      : [];

  const secondSubs =
    selectedFirst != null
      ? categories.filter((category) => category.parentId === selectedFirst)
      : [];

  const rootCategories = categories.filter(
    (category) => category.parentId === null
  );

  return (
    <div className='grid grid-cols-3 mt-16'>
      <div className='h-96 overflow-y-scroll rounded-l-md flex flex-col gap-2 border bg-gray-100 border-r-0 border-gray-400'>
        <Link
          href={`/admin/categories/addCategory`}
          className='cursor-pointer font-mono font-semibold py-2 pt-2.5 pl-2.5 hover:bg-slate-300 text-blue-700'
        >
          + Add Category
        </Link>

        {rootCategories.map((rc) => (
          <Link
            key={rc.id}
            href={`/admin/categories?rootId=${rc.id}`}
            className={`cursor-pointer font-mono text-sm py-2 pl-7 hover:bg-slate-300 
            ${rc.id == selectedRoot ? 'bg-slate-300' : ''} `}
          >
            {rc.name}
          </Link>
        ))}
      </div>
      <div className='h-96 overflow-y-scroll flex flex-col gap-2 border bg-gray-100 border-r-0 border-gray-400'>
        {selectedRoot ? (
          <Link
            href={`/admin/categories/addCategory${
              selectedRoot ? `?rootId=${selectedRoot}` : ''
            }`}
            className='cursor-pointer font-mono font-semibold py-2 pt-2.5 pl-2.5 hover:bg-slate-300 text-blue-700'
          >
            + Add Category
          </Link>
        ) : null}
        {firstSubs.map((fc) => (
          <Link
            key={fc.id}
            href={`/admin/categories?rootId=${selectedRoot}&firstId=${fc.id}`}
            className={`cursor-pointer font-mono text-sm py-2 pl-7 hover:bg-slate-300 ${
              fc.id == selectedFirst ? 'bg-slate-300' : ''
            }`}
          >
            {fc.name}
          </Link>
        ))}
      </div>
      <div className='h-96 overflow-y-scroll flex flex-col gap-2 rounded-r-md border bg-gray-100 border-gray-400'>
        {selectedFirst ? (
          <Link
            href={`/admin/categories/addCategory${
              selectedRoot ? `?rootId=${selectedRoot}` : ''
            }${selectedFirst ? `&firstId=${selectedFirst}` : ''}`}
            className='cursor-pointer font-mono font-semibold py-2 pt-2.5 pl-2.5 hover:bg-slate-300 text-blue-700'
          >
            + Add Category
          </Link>
        ) : null}
        {secondSubs.map((sc) => (
          <Link
            key={sc.id}
            href={`/admin/categories?rootId=${selectedRoot}&firstId=${selectedFirst}&secondId=${sc.id}`}
            className={`cursor-pointer font-mono text-sm py-2 pl-7 hover:bg-slate-300 ${
              sc.id == selectedSecond ? 'bg-slate-300' : ''
            }`}
          >
            {sc.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
