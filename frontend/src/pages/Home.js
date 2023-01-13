import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div
        style={{ minHeight: "80vh", position: "relative" }}
        className="--pad"
      >
        <div className="home">
          <h1 className="home-text">Aplikacija za upravljanje zalihama</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
