import React from "react";
import "./Home.scss";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Home Home Sweet Home</h1>
      <Link to="/employee">EMPLOYEES</Link>
       <div className="video-container m-3">
        <iframe          
          src="https://www.youtube.com/embed/8C8ISYGD0ns"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
