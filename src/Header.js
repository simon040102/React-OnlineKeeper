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
      <header>
        <div className="headerName">
            
          <h1><LightbulbCircleIcon style={{fontSize:'30px'}}/>Keeper</h1>
          <div>
            <h2>Welcome {nickname}</h2>
            <button onClick={Logout}>Logout</button>
          </div>
        </div>
      </header>
    );
}
export default Header;