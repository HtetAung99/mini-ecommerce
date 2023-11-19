import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';
import { getProductsWithCategories } from '../utils/products';

export default async function Home({}) {
  const session = await getServerSession(authOption);
  const user: any = session?.user;
  const products = await getProductsWithCategories();

  return (
    <div className='flex max-h-fit flex-col m-auto items-center justify-between  py-2'>
      {/* {user && <Link href={"/api/auth/signout"}>{user.name}</Link>} */}
      <h1 className='text-4xl font-bold'>Products</h1>
      <div className='flex flex-row gap-5 w-full overflow-x-auto'>
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            className='flex flex-col gap-2 w-[20vw]  py-5 px-3 m-3 rounded-md shadow-sm border'
          >
            <img
              width={200}
              alt={product.title}
              src='https://media-cdn.bnn.in.th/342549/Ugreen-Wall-USB-Charger-1-USB-C-PD30W-US-GaN-Space-Gray-1-square_medium.jpg'
              className='bg-slate-400 rounded-md self-center'
            />
            <h3 className='font-bold'>{product.title}</h3>
            <p className='text-sm font-mono text-slate-700 line-clamp-2 h-18'>
              {product.description}
            </p>
            <span className='text-red-600 text-sm font-semibold'>
              {product.variants[0].price}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
