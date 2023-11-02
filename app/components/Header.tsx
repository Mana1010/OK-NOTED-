"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Header() {
  const path = usePathname();
  return (
    <header className="absolute top-0 left-0 right-0 py-5 px-3 sm:px-4 md:px-8 flex justify-between items-center z-[999]">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold text-white">OK, NOTED!</h1>
      </Link>
      {(path === "/login" || path === "/signup") &&
        (path === "/login" ? (
          <Link href={"/signup"}>
            <button className="px-5 md:px-5 py-2 font-bold text-white bg-[black] hover:ring-white hover:ring-1 rounded-md">
              SIGN UP
            </button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <button className="px-5 md:px-5 py-2 font-bold text-white bg-[black] hover:ring-white hover:ring-1 rounded-md">
              LOG IN
            </button>
          </Link>
        ))}
    </header>
  );
}

export default Header;
