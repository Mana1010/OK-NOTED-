"use client";
import React from "react";
import SignUp from "../signup/page";
import Login from "../login/page";
import { motion } from "framer-motion";
export default function Form() {
  return (
    <motion.div className="w-screen h-screen flex flex-col top-0 left-0 right-0 bottom-0 absolute backdrop-blur-[150px]">
      <button>Hello</button>
    </motion.div>
  );
}
