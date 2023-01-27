import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div
        style={{ minHeight: "80vh", position: "relative" }}
        className="--pad"
      >
        <div className="home">
          <h1 className="home-text">Stranica koju ste tražili ne postoji</h1>
          <Link to={`/`}>
            <p
              className="home-text"
              style={{ color: "#d9534f", marginTop: "5rem" }}
            >
              Klikni za povratak na početnu stranicu
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
