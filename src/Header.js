import React from "react";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import { useNavigate } from 'react-router-dom';

const Header=()=>{
    const nickname = localStorage.getItem('nickname');
     let navigate = useNavigate();
    const Logout=()=>{
        localStorage.removeItem('nickname');
        localStorage.removeItem('authorization');
         navigate('/');
    }
    return (
      <header className="bg-sky-200 mx-auto py-3 px-8 mb-12 shadow-2xl">
        <div className="flex justify-between ">
          <h1 className="text-sky-900 text-4xl mt-2  md:text-6xl font-bold">
            <LightbulbCircleIcon style={{ fontSize: '40px' }} />
            Keeper
          </h1>
          <div>
            <h2 className="text-sky-900 font-bold text-2xl md:text-4xl mb-2">
              Welcome {nickname}
            </h2>
            <button className="float-right text-xl underline" onClick={Logout}>
              Logout
            </button>
          </div>
        </div>
      </header>
    );
}
export default Header;