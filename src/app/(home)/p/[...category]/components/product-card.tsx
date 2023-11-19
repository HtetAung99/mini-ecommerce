import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bookmark, DollarSign } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ProductWithNestedData } from '@/app/types';

export default function ProductCard({
  product,
}: {
  product: ProductWithNestedData;
}) {
  return (
    <Card key={product.id} className='col-span-1 h-[40vh]  '>
      <CardHeader className='w-full h-[60%] p-4'>
        <Avatar className='h-full rounded-sm hover:scale-105 w-full'>
          <AvatarImage src='https://images.unsplash.com/photo-1577210897949-1f56f943bf82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=560&h=540&q=80&crop=bottom' />
          <Badge
            className='absolute left-2 bottom-2 items-center'
            variant={'destructive'}
          >
            <DollarSign size={'14px'} />
            {product.variants[0].price}
          </Badge>
          <Bookmark className='bg-white p-1 rounded-sm text-red-600 absolute right-2 top-2' />
          <AvatarFallback>{product.title}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <CardTitle className='flex text-base flex-row justify-between items-center'>
          {product.title}
        </CardTitle>
        {/* <div className='flex mt-3 gap-2 '>
                {p.variants[0].attributeValues.map((v) => (
                  <Badge
                    key={v.id}
                    className="font-normal text-xs"
                    variant={"outline"}>
                    {v.name}
                  </Badge>
                ))}
                <Badge
                  key="size"
                  className="font-normal text-xs"
                  variant={"outline"}>
                  XL
                </Badge>
              </div> */}
        <CardDescription className={cn('pt-3 flex mb-3 gap-2')}>
          <HoverCard openDelay={10}>
            <HoverCardTrigger className='line-clamp-3'>
              {product.description}
            </HoverCardTrigger>
            <HoverCardContent className=''>
              {product.description}
            </HoverCardContent>
          </HoverCard>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
