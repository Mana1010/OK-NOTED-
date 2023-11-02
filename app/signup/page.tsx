"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
interface Info {
  fullname: string;
  email: string;
  gender: string;
  password: string;
  confirmpassword: string;
}
export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const params = useSearchParams();
  const search = params.get("message");
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const { register, handleSubmit, reset, control } = form;
  return (
    <div className="login-section">
      <Header />
      <div className="w-full h-full backdrop-blur-[200px] flex items-center justify-center px-4 py-10">
        <form className="w-full md:w-[500px] h-[90%] backdrop-blur-[150px] bg-white/20 px-5 py-3 rounded-md mt-5">
          <div>
            <h1 className="text-white text-2xl font-bold">SIGN UP</h1>
            {search && <p>{search}</p>}
          </div>
          <div className="flex w-full space-y-4 item-center justify-center flex-col h-full">
            <div className="w-full space-y-1">
              <label
                htmlFor="fullname"
                className="font-bold uppercase text-white text-sm"
              >
                FULLNAME
              </label>
              <div>
                <input
                  className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-3 outline-none text-white placeholder:text-slate-300 "
                  type="text"
                  id="fullname"
                  placeholder="@e.g John Waltz"
                  {...register("fullname")}
                />
              </div>
            </div>
            <div className="w-full space-y-1">
              <label
                htmlFor="email"
                className="font-bold tracking-wider text-white text-sm"
              >
                EMAIL
              </label>
              <div>
                <input
                  className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-3 outline-none text-white placeholder:text-slate-300 "
                  type="email"
                  id="email"
                  placeholder="@e.g johnwaltz10@gmail.com"
                  {...register("email")}
                />
              </div>
            </div>

            <div>
              <label
                id="password"
                className=" tracking-wider text-white text-sm font-bold"
              >
                PASSWORD
              </label>
              <div>
                <div className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-3 flex justify-between items-center">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="******"
                    className="bg-transparent outline-none w-[90%] text-white placeholder:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    className="text-slate-800 text-xl pr-2"
                  >
                    {" "}
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label
                id="confirmpassword"
                className=" tracking-wider text-white text-sm font-bold"
              >
                CONFIRM PASSWORD
              </label>
              <div>
                <div className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-3 flex justify-between items-center">
                  <input
                    type={showConPass ? "text" : "password"}
                    placeholder="******"
                    className="bg-transparent outline-none w-[90%] text-white placeholder:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConPass((prev) => !prev)}
                    className="text-slate-800 text-xl pr-2"
                  >
                    {" "}
                    {showConPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  );
}
