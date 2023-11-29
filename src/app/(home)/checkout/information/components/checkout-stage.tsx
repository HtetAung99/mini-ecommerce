import { cn } from '@/lib/utils';
import React from 'react';

export default function CheckoutStage({ stage }: { stage: boolean[] }) {
  return (
    <div className='justify-center flex gap-40 text-xs text-slate-400'>
      <div className='flex flex-col items-center gap-2'>
        <div className={cn(' rounded-full h-5 w-5 relative bg-destructive')}>
          <div
            className={cn(
              'absolute top-1/2 transform left-5 -translate-y-1/2 border-2 w-52 ',
              stage[0] && 'border-destructive'
            )}
          ></div>
        </div>
        <span>Cart's detail</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <div
          className={cn(
            ' rounded-full h-5 w-5 relative bg-slate-200 z-20',
            stage[0] && 'bg-destructive'
          )}
        ></div>
        <span>Review cart</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <div
          className={cn(
            ' rounded-full h-5 w-5 relative bg-slate-200',
            stage[1] && 'bg-destructive'
          )}
        >
          <div
            className={cn(
              'absolute top-1/2 transform right-5 -translate-y-1/2 border-2 w-52 ',
              stage[1] && 'border-destructive'
            )}
          ></div>
        </div>
        <span>Complete</span>
      </div>
    </div>
  );
}
