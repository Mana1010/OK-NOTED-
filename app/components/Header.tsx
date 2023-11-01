import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 py-5 px-3 sm:px-4 md:px-8 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold text-white">OK, NOTED!</h1>
      </Link>
      <div>
        <Link href={"/form"}>
          <button className="px-5 md:px-5 py-2 font-bold text-white bg-[black] hover:ring-white hover:ring-1 rounded-md">
            LOGIN
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
