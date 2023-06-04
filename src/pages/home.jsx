import React from "react";
import { Navbar } from "../components/navbar";
import GetImages from "../components/getImages";
import { Footer } from "../components/footer";
// import Swipe from "../components/swipe";
import { Carousel } from "../components/carousel";
import { Hero } from "../components/hero";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Swipe /> */}
      <Hero />
      <Carousel />
      <GetImages />
      <Footer />
    </div>
  );
};

export default Home;
