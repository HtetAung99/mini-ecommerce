import CategoryTable from './table';

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  return (
    <main className=''>
      <h1 className='text-xl font-semibold mb-4'>Categories</h1>

      <CategoryTable searchParams={searchParams} />
    </main>
  );
}
