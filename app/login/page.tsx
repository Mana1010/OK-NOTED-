"use client";
import React, { useState } from "react";
import { auth, googleProvider, db } from "../sdk/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
import { motion } from "framer-motion";
interface InfoUser {
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  fullname?: string | null | undefined;
  isSetProfile: boolean;
  provider: string;
  photoURL?: string | null | undefined;
  userID?: string;
}
interface UserLogin {
  email: string;
  password: string;
}
export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("message");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, formState, reset, handleSubmit } = form;
  const { errors } = formState;
  async function authenticateUser(data: UserLogin) {
    const currentPerson = auth.currentUser;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      if (
        currentPerson?.displayName !== null ||
        currentPerson?.photoURL !== null
      ) {
        router.push("/notes");
      }
      reset();
      router.push("/customizeProfile");
      toast.success("Successfully login");
    } catch (err) {
      toast.error(
        "Wrong email or password and try to check your connection and try again"
      );
    }
    setLoading(false);
  }
  async function googleAccount() {
    const googleUser = auth.currentUser;
    const googleUserInfo: InfoUser = {
      displayName: googleUser?.displayName,
      email: googleUser?.email,
      fullname: googleUser?.displayName,
      isSetProfile: true,
      provider: "GOOGLE",
      photoURL: googleUser?.photoURL,
      userID: googleUser?.uid,
    };
    const accountRef = collection(db, "accounts");
    try {
      await signInWithPopup(auth, googleProvider);
      await addDoc(accountRef, googleUserInfo);
      toast.success("Successfully login");
      router.push("/notes");
      reset();
    } catch (err) {
      toast.error("Check your connection and try again");
    }
  }
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
  return (
    <div className="login-section">
      <Header />
      <div className="w-full h-full backdrop-blur-[200px] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(authenticateUser)}
          className="w-full md:w-[400px] h-[500px] backdrop-blur-[150px] bg-white/20 px-5 py-3.5 rounded-md mt-5 space-y-5"
        >
          <div>
            <h1 className="text-white text-2xl font-bold">LOGIN</h1>
            {search && <p className="text-red-400">{search}</p>}
          </div>
          <div className="flex items-center justify-center w-full p-2 flex-col space-y-5">
            <div className="w-full">
              <label className="font-bold uppercase text-white text-sm">
                EMAIL
              </label>
              <motion.div variants={emailVariant} animate="animates">
                <input
                  type="email"
                  placeholder="@e.g johnwaltz10@gmail.com"
                  {...register("email", {
                    validate: (formValue) => {
                      return formValue !== "" || "Fill up this input";
                    },
                  })}
                  className={`w-full rounded-md backdrop-blur-lg bg-white/20 px-2 py-2.5 outline-none text-white placeholder:text-slate-300 ${
                    errors.email?.message && "border-2 border-red-500"
                  }`}
                />
                {errors.email?.message && (
                  <small className="text-red-400">{errors.email.message}</small>
                )}
              </motion.div>
            </div>
            <div className="w-full">
              <label className="font-bold uppercase text-white text-sm">
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
                      validate: (formValue) => {
                        return formValue !== "" || "Fill up this input";
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
          </div>
          <h1 className="text-center text-white font-bold">
            --------------- OR ---------------
          </h1>
          <div className="w-full flex justify-center">
            <button
              onClick={googleAccount}
              type="button"
              className="w-full py-2.5 text-2xl bg-white rounded-md flex justify-center"
            >
              <FcGoogle />
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full h-[40px] font-bold"
          >
            {loading ? "AUTHENTICATING..." : " AUTHENTICATE"}
          </button>
        </form>
      </div>
    </div>
  );
}
