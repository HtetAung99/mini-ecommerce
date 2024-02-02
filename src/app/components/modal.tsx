"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}

      <div className="fixed inset-0 z-10 overflow-y-auto  bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="relative inset-y-[5vw] flex min-w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {children}
        </div>
      </div>
    </div>
  );
};
