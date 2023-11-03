"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { error } from "console";
interface Info {
  fullname: string;
  email: string;
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

  const { register, handleSubmit, reset, control, formState } = form;
  const { errors } = formState;
  function submitForm(data: Info) {
    alert("Submitted");
  }
  return (
    <div className="login-section">
      <Header />
      <div className="w-full h-full backdrop-blur-[200px] flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full md:w-[500px] h-[85%] md:h-[92%] backdrop-blur-[150px] bg-white/20 px-5 py-2.5 rounded-md mt-5 space-y-5"
        >
          <h1 className="text-white text-2xl font-bold">SIGN UP</h1>
          <div className="flex w-full space-y-3 item-center justify-center flex-col py-1">
            <div className="w-full space-y-1">
              <label
                htmlFor="fullname"
                className="font-bold uppercase text-white text-sm"
              >
                FULLNAME
              </label>
              <div>
                <input
                  className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 outline-none text-white placeholder:text-slate-300 "
                  type="text"
                  id="fullname"
                  placeholder="@e.g John Waltz"
                  {...register("fullname", {
                    validate: {
                      fullName: (value) => {
                        return value !== "" || "FullName required";
                      },
                    },
                  })}
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
                  className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 outline-none text-white placeholder:text-slate-300 "
                  type="email"
                  id="email"
                  placeholder="@e.g johnwaltz10@gmail.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email required",
                    },
                  })}
                />
                {errors.email?.message && (
                  <small className="text-red-400">{errors.email.message}</small>
                )}
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
                <div className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 flex justify-between items-center">
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
                <div className="w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 flex justify-between items-center">
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
            <div className="pt-5">
              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2.5 font-bold"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  );
}
