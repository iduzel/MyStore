import React, { useContext } from 'react'
import { DataContext } from '../context/Context'
import './Home.scss'
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const {userData, setUserData} = useContext(DataContext)
  console.log('dataContext is:', userData)

  const handleLogout = () => {
    // clear the context
    setUserData(null);
    // redirect user to home
    
    navigate("/login");
    console.log('after logout userDataContext is:', userData)
    
    
  };
 
  return (
    <div className='home'>
      <h1>Home Home Sweet Home</h1>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Home