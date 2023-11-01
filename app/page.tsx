"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const homeVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
      },
    },
  };
  const buttonVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };
  return (
    <motion.div
      variants={homeVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full item-center justify-center flex"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-white text-[1.5rem] sm:text-[2rem] md:text-[3rem] text-center font-semibold">
          Keep your secrets, plans and confessions without a hesitation.
        </h1>

        <Link href={"/form"}>
          <motion.button
            variants={buttonVariants}
            className="px-12 py-3 bg-[#080808] text-white font-bold transition-all duration-150 ease-out hover:ring-white hover:ring-2 rounded-md"
          >
            GET STARTED
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
