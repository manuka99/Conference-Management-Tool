import React from "react";
import Hero from "../../../components/Hero";
import Pricing from "../../../components/Pricing";
import Posts from "./Posts";

function Landing() {
  return (
    <div>
      <Hero />
      <Posts />
      <Pricing />
    </div>
  );
}

export default Landing;
