export default function Row({ product }: { product: any }) {
  return (
    <div
      key={product.id}
      className="flex items-center justify-between rounded-lg border-b bg-white p-2"
    >
      <div className="flex w-2/5 items-center">
        <div className="mr-5 h-14 w-14 rounded-lg bg-gray-700"></div>
        <div className="w-72 truncate">
          <h3 className="font-semibold">{product.title}</h3>
          <span className="text-sm text-gray-400">{product.description}</span>
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
