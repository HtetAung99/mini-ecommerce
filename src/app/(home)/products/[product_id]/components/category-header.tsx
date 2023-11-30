import CategoryBreadcrumb from "@/app/(home)/components/category-breadcrumb";
import { getCategoriesFullPath } from "@/app/utils/categories";
import { getProductById } from "@/app/utils/products";

export default async function CategoryHeader({
  product_id,
}: {
  product_id: Number;
}) {
  const categories = await getCategoriesFullPath();
  const product = await getProductById(Number(product_id));

  if (!product) {
    return <p>Not found</p>;
  }
  const category = categories.filter((c) => c.id === product.categoryId)[0];
  const categoryPaths = category.name.split("/");
  categoryPaths.push(product.title);
  return <CategoryBreadcrumb categoryPaths={categoryPaths} />;
}
