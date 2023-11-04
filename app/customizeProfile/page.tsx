import React from "react";
import Header from "../components/Header";
export default function page() {
  return (
    <div className="customizeProfile-section">
      <Header />
      <div className="w-full h-full backdrop-blur-[200px] flex items-center justify-center px-4">
        <form className="w-full md:w-[400px] h-[500px] backdrop-blur-[150px] bg-white/20 px-5 py-3.5 rounded-md mt-5 space-y-5">
          <div>
            <h1 className="text-white text-2xl font-bold">PROFILE</h1>
            <p className="text-red-400">Set your profile first</p>
          </div>
          <div>
            <div>
              <input type="file" id="file" />
              <label htmlFor="file">SET AVATAR</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
