import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import React from 'react';
import AddressModal from '../addressModal/address-modal';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function PickUpOption() {
  return (
    <div className='flex flex-col'>
      <h5 className='text-base font-semibold py-3 mt-2'>Address Information</h5>
      <div className='grid grid-cols-2 mt-1 gap-3'>
        <div className='grid w-full items-center gap-2'>
          <Label htmlFor='state'>State</Label>
          <Select>
            <SelectTrigger id='state' className='w-full'>
              <SelectValue placeholder='Select a state' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='CA'>California</SelectItem>
              <SelectItem value='NY'>New York</SelectItem>
              <SelectItem value='TX'>Texas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid w-full items-center gap-2'>
          <Label htmlFor='Country'>Country</Label>
          <Select>
            <SelectTrigger id='Country' className='w-full'>
              <SelectValue placeholder='Select a country' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='US'>United States</SelectItem>
              <SelectItem value='MYR'>Myanmar</SelectItem>
              <SelectItem value='SG'>Singapore</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <h5 className='text-base font-semibold py-3 mt-2'>Billing address</h5>
      <div className='relative'>
        <Skeleton className='w-full h-[200px] border-dashed border bg-white border-slate-800' />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
              variant={'secondary'}
            >
              <Plus className='mr-2' size='20px' />
              Add new address
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn('w-[50%] top-[50%] shadow-xl h-[500px]')}
          >
            <AddressModal title='My billing address' />
          </DialogContent>
        </Dialog>
      </div>
      <div className='my-5'>
        <span className='inline-flex w-full items-center gap-3'>
          <p className='font-semibold'>Add shipping information</p>
          <p className='text-sm font-semibold text-muted-foreground'>
            (Optional)
          </p>
        </span>
        <Input
          className='mt-3'
          type='text'
          placeholder='Ex. Please leave at the front door.'
        />
      </div>
      <Button className='w-1/3 ' variant={'default'}>
        Continue to Payment
      </Button>
    </div>
  );
}
