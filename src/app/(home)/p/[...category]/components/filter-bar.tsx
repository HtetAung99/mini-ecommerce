import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import PriceSlider from './price-slider';
import { Button } from '@/components/ui/button';
import { CategoryWithChild } from '@/app/types';
import { getCategoriesNested } from '@/app/utils/categories';
import CategoryFilter from './category-filter';

export default async function filterBar() {
  const categories: CategoryWithChild[] = await getCategoriesNested();

  return (
    <div className='col-span-1 mt-5 flex flex-col gap-5 overflow-y-auto max-h-[72vh] '>
      <div className='flex items-center space-x-3 mx-4'>
        <Checkbox id='stock' />
        <label
          htmlFor='stock'
          className='text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Show in-stock only
        </label>
      </div>
      <Separator />

      <CategoryFilter categories={categories} />
      <Separator />

      <PriceSlider />
      <Separator />

      <Button className='text-red-500 self-end p-0 m-0' variant={'link'}>
        Clear all filters
      </Button>
    </div>
  );
}
