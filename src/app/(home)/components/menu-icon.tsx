'use client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function MenuIcon() {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      {toggle ? (
        <Menu onClick={() => setToggle(false)} size={25} />
      ) : (
        <X onClick={() => setToggle(true)} size={25} />
      )}
    </>
  );
}
