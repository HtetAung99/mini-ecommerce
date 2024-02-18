"use client";
import React, { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductImageDisplay({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  return (
    <div className="p-5">
      <div className="h-[400px] w-full rounded-md border-2 border-slate-200">
        <img
          className="h-full w-full object-contain"
          src={selectedImage}
          alt={selectedImage}
        />
      </div>
      {images.length > 1 && (
        <Carousel className="md:w-full">
          <CarouselContent className="ml-2 md:ml-4">
            {images.map((img, i) => (
              <CarouselItem key={i} className="basis-1/2 md:basis-1/4 ">
                <div className="m-2 h-[100px] w-[100px] cursor-pointer rounded-md border border-slate-200 p-2 shadow-md">
                  <img
                    onClick={() => setSelectedImage(img)}
                    className="m-auto h-full w-full object-contain"
                    src={img}
                    alt={img}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-4" />
          <CarouselNext className="mr-4" />
        </Carousel>
      )}
    </div>
  );
}
