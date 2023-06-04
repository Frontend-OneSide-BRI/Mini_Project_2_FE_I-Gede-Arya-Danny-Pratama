import React from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Content } from "../components/content";

const Gallery = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
};

export default Gallery;
