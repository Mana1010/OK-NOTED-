import React from "react";
import { Style } from "util";
import Image from "next/image";
import { motion } from "framer-motion";
import nextIcon from "./img/next.png";
import tailwindIcon from "./img/tailwind.png";
import firebaseIcon from "./img/firebase.png";
import tsIcon from "./img/typescript.png";
import framerIcon from "./img/framer.png";
import rhfIcon from "./img/rhf.png";
import zustandIcon from "./img/zustand.png";
import { StaticImageData } from "next/image";
interface Imgs {
  img: StaticImageData;
  w: number;
  name: string;
}
export default function Techstack() {
  const imgs: Imgs[] = [
    {
      img: nextIcon,
      w: 80,
      name: "nextjs",
    },
    {
      img: tailwindIcon,
      w: 90,
      name: "tailwind",
    },
    {
      img: firebaseIcon,
      w: 90,
      name: "firebase",
    },
    {
      img: tsIcon,
      w: 80,
      name: "ts",
    },
    {
      img: framerIcon,
      w: 80,
      name: "framer",
    },
    {
      img: zustandIcon,
      w: 150,
      name: "zustand",
    },
    {
      img: rhfIcon,
      w: 110,
      name: "rhf",
    },
  ];
  return (
    <div className="w-full h-[50vh] flex item-center px-5 py-4  flex-col backdrop-blur-[100px]">
      <h1 className="text-white text-3xl font-bold text-center md:text-start">
        Tech Stack Used
      </h1>
      <div className="flex items-center h-full flex-wrap px-4 sm:justify-between justify-center space-x-3">
        {imgs.map((imgs, index) => (
          <Image
            key={index}
            src={imgs.img}
            alt={imgs.name}
            width={imgs.w}
            priority
          />
        ))}
      </div>
    </div>
  );
}
