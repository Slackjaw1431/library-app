import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavboorAndFooter/Navbar";
import { Footer } from "./layouts/NavboorAndFooter/Footer";
import { Homepage } from "./layouts/Homepage/HomePage";

export const App = () => {
  return (
    <div>
      <Navbar />
      <Homepage />
      <Footer />
    </div>
  );
};
