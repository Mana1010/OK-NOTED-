"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { auth, db } from "../sdk/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const search = params.get("message");
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const { register, handleSubmit, reset, formState, watch } = form;
  const { errors } = formState;

  async function submitForm(data: Info) {
    const accountRef = collection(db, "accounts");
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await addDoc(accountRef, data);
      toast.success("Successfully Sign Up");
      setErrorMessage("");
      router.push("/login");

      reset();
    } catch (err) {
      toast.error("Error from signing up");
      setErrorMessage(
        "Email Address is already taken or check your connection and try again"
      );
    }
    setLoading(false);
  }
  const fullnameVariant = {
    animates: {
      x: errors.fullname?.message && [5, 0, -5, 0, 5, 0],
      transition: {
        duration: 0.2,
      },
    },
  };
  const emailVariant = {
    animates: {
      x: errors.email?.message && [5, 0, -5, 0, 5, 0],
      transition: {
        duration: 0.2,
      },
    },
  };
  const passwordVariant = {
    animates: {
      x: errors.password?.message && [5, 0, -5, 0, 5, 0],
      transition: {
        duration: 0.2,
      },
    },
  };
  const confirmpasswordVariant = {
    animates: {
      x: errors.confirmpassword?.message && [5, 0, -5, 0, 5, 0],
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <div className="signup-section">
      <Header />
      <div className="w-full h-full backdrop-blur-[200px] flex items-center justify-center px-4 py-9">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full md:w-[500px] h-[550px] md:h-[570px] backdrop-blur-[150px] bg-white/20 px-5 py-2.5 rounded-md mt-5 space-y-5"
        >
          <h1 className="text-white text-2xl font-bold">SIGN UP</h1>
          {errorMessage && (
            <small className="text-red-400">{errorMessage}</small>
          )}
          <div className="flex w-full space-y-2 item-center justify-center flex-col py-1">
            <div className="w-full space-y-1">
              <label
                htmlFor="fullname"
                className="font-bold uppercase text-white text-sm"
              >
                FULLNAME
              </label>
              <motion.div variants={fullnameVariant} animate="animates">
                <input
                  className={`w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 outline-none text-white placeholder:text-slate-300 ${
                    errors.fullname?.message && "border-2 border-red-500"
                  }`}
                  type="text"
                  id="fullname"
                  placeholder="@e.g John Waltz"
                  {...register("fullname", {
                    required: {
                      value: true,
                      message: "Fullname required",
                    },
                  })}
                />
                {errors.fullname?.message && (
                  <small className="text-red-400">
                    {errors.fullname.message}
                  </small>
                )}
              </motion.div>
            </div>
            <div className="w-full space-y-1">
              <label
                htmlFor="email"
                className="font-bold tracking-wider text-white text-sm"
              >
                EMAIL
              </label>
              <motion.div variants={emailVariant} animate="animates">
                <input
                  className={`w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 outline-none text-white placeholder:text-slate-300 ${
                    errors.email?.message && "border-2 border-red-500"
                  }`}
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
              </motion.div>
            </div>

            <div>
              <label
                id="password"
                className=" tracking-wider text-white text-sm font-bold"
              >
                PASSWORD
              </label>
              <motion.div variants={passwordVariant} animate="animates">
                <div
                  className={`w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 flex justify-between items-center ${
                    errors.password?.message && "border-2 border-red-500"
                  }`}
                >
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="******"
                    className="bg-transparent outline-none w-[90%] text-white placeholder:text-slate-200"
                    {...register("password", {
                      pattern: {
                        value: /^\S+$/,
                        message: "Don't put spaces",
                      },
                      validate: {
                        passwordRequired: (fieldValues) => {
                          return fieldValues !== "" || "Password required";
                        },
                        tooShort: (fieldValues) => {
                          return (
                            fieldValues.length > 7 ||
                            "Password should not be less than to 7 characters"
                          );
                        },
                      },
                    })}
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
                {errors.password?.message && (
                  <small className="text-red-400">
                    {errors.password.message}
                  </small>
                )}
              </motion.div>
            </div>
            <div>
              <label
                id="confirmpassword"
                className=" tracking-wider text-white text-sm font-bold"
              >
                CONFIRM PASSWORD
              </label>
              <motion.div variants={confirmpasswordVariant} animate="animates">
                <div
                  className={`w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 flex justify-between items-center ${
                    errors.confirmpassword?.message && "border-2 border-red-500"
                  }`}
                >
                  <input
                    type={showConPass ? "text" : "password"}
                    placeholder="******"
                    className="bg-transparent outline-none w-[90%] text-white placeholder:text-slate-200"
                    {...register("confirmpassword", {
                      validate: (formValue) => {
                        return (
                          formValue === watch("password") ||
                          "Password doesn't match"
                        );
                      },
                    })}
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
                {errors.confirmpassword?.message && (
                  <small className="text-red-400">
                    {errors.confirmpassword.message}
                  </small>
                )}
              </motion.div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full h-[40px] font-bold"
          >
            {loading ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
