"use client";
import React from "react";
import Form from "../components/Form";
import { auth } from "../sdk/firebase";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
export default function Login() {
  const params = useSearchParams();
  const search = params.get("message");
  const form = useForm();
  return (
    <div className="login-section">
      <Header />
      <div className="w-full h-full backdrop-blur-[200px] flex items-center justify-center px-4">
        <form className="w-full  md:w-[400px] h-[50%] backdrop-blur-[150px] bg-white/20 px-6 py-3 rounded-md"></form>
      </div>
    </div>
  );
}
