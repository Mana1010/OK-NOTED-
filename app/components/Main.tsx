"use client";
import { motion, useScroll } from "framer-motion";
import { useAuthData } from "../store/store";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "../sdk/firebase";
export default function Main() {
  const route = useRouter();
  const path = usePathname();
  const { authenticated, stateChanged } = useAuthData();
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
  useEffect(() => {
    stateChanged();
  }, []);
  return (
    <div>
      <motion.div
        variants={homeVariants}
        initial="initial"
        animate="animate"
        className="w-full h-screen item-center justify-center flex backdrop-blur-[200px]"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-white text-[1.5rem] sm:text-[2rem] md:text-[3rem] text-center font-semibold">
            Keep your secrets, plans and confessions without a hesitation.
          </h1>
          <motion.button
            onClick={() => {
              if (authenticated) {
                route.push("/");
              } else {
                route.push("/login?message=You need to login first");
              }
            }}
            variants={buttonVariants}
            className="px-12 py-3 bg-[#080808] text-white font-bold transition-all duration-150 ease-out hover:ring-white hover:ring-2 rounded-md"
          >
            GET STARTED
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
