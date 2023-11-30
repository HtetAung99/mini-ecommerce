import CategoryTable from "./table";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  return (
    <main className="">
      <h1 className="mb-4 text-xl font-semibold">Categories</h1>

      <CategoryTable searchParams={searchParams} />
    </main>
  );
}
