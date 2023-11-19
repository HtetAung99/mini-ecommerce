import Table from './table';
import MyDropdown from './components/dropdown';
import Link from 'next/link';

export default async function ProductsPage() {
  return (
    <main className=''>
      <h1 className='text-xl font-semibold mb-4'>Products</h1>
      <div className='flex w-full justify-between items-center'>
        <Link
          href={'/admin/products/addProduct'}
          className='py-2 px-2 flex gap-1.5 justify-center items-center w-fit bg-blue-500 rounded-md cursor-pointer'
        >
          <span className='px-1 text-blue-500 text-sm rounded-sm font-bold bg-white'>
            &#43;
          </span>
          <span className='text-white font-semibold uppercase text-xs'>
            New Product
          </span>
        </Link>
        <div>
          <MyDropdown />
        </div>
      </div>
      <Table />
    </main>
  );
}
