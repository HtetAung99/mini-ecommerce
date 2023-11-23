'use client';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
// import { useState } from 'react';

export default function MenuIcon(props: any) {
  const [toggle, setToggle] = useState(true);
  console.log('inside:', props);
  return (
    <>
      {toggle ? (
        <Menu onClick={() => setToggle(false)} size={25} />
      ) : (
        // <Button variant='ghost'>Menu</Button>
        // <Button variant='ghost'>X</Button>
        <X onClick={() => setToggle(true)} size={25} />
      )}
    </>
  );
}
