import React from "react";
import Techstack from "./components/Techstack";
import Main from "./components/Main";
import Header from "./components/Header";
export default function Home() {
  return (
    <div className="body">
      <Header />
      <Main />
      <Techstack />
    </div>
  );
}
