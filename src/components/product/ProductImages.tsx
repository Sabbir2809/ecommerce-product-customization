"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  images: string[];
  name: string;
}

export default function ProductImages({ images, name }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={images[selectedImage]}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === idx
                ? "border-primary-500 scale-105"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`${name} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
