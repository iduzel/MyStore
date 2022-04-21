import axios from "axios";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/Context";
import "./Home.scss";


const Home = () => {
  const { categoryData, setCategoryData } = useContext(DataContext);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/admin/categories/list');
      console.log('RESPONSE GET DATA : ', response)

      setCategoryData(response.data)
     
    }
    getData()
  }, [])
  return (
    <div className="home">
      <h1>Home Home Sweet Home</h1>
      
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
