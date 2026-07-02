"use client";
import Image from "next/image";
export default function InfoItem({ icon, title, text, dir }) {
  return (
    <div className="flex items-center gap-5 text-start">
      <Image
        src={icon}
        alt={title}
        width={34}
        height={34}
        className="object-contain"
      />

      <div>
        <h3 className="text-custom16 font-bold text-white">
          {title}
        </h3>

        <p
          dir={dir}
          className="mt-2 text-custom14 leading-7 text-white/75"
        >
          {text}
        </p>
      </div>
    </div>
  );
}