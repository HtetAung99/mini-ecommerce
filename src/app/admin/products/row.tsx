import { ProductWithCategory } from "@/app/utils/products";

export default function Row({ product }: { product: ProductWithCategory }) {
  return (
    <div
      key={product.id}
      className="flex items-center justify-between bg-white p-2 rounded-lg border-b">
      <div className="w-2/5 flex items-center">
        <div className="bg-gray-700 w-14 h-14 rounded-lg mr-5"></div>
        <div className="w-72 truncate">
          <h3 className="font-semibold">{product.title}</h3>
          <span className="text-gray-400 text-sm">{product.description}</span>
        </div>
      </div>
      <div className="w-1/5">
        <span className="text-gray-600">{product.category.name}</span>
      </div>
      <div className="w-1/5">
        <span className="text-gray-600">
          ${product.variants[0] ? product.variants[0].price : 0}
        </span>
      </div>
      <div>
        <span className="text-gray-400">Actions</span>
      </div>
    </div>
  );
}
