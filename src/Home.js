import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import { ReactComponent as HomeImg } from './images/home-img.svg';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  const authorization = localStorage.getItem('authorization');
  const checkAuthorization=()=>{
    axios.get(
      'https://todoo.5xcamp.us/check',
      
      {
        headers: { authorization }
      }
    ).then(res=>{
      navigate("/TodoPage")
    });
  }
  const [currentPage, setCurrentPage] = useState(true);
  const changePage = () => {
    setCurrentPage((prevState) => {
      return !prevState;
    });
  };
  useEffect(() => {
    checkAuthorization();
  }, []);
  return (
    <div className="relative ">
      <div className=" px-5 flex mt-12 justify-center ">
        <HomeImg className="hidden w-6/12 md:inline-flex" />
        {currentPage ? (
          <Login change={changePage} />
        ) : (
          <Register change={changePage} />
        )}
      </div>
    </div>
  );
};

export default Home;
