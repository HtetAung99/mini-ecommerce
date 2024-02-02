import CategoryTable from "./table";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  return (
    <main className="">
      <CategoryTable searchParams={searchParams} />
    </main>
  );
}
