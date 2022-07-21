import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useNavigate} from "react-router-dom"


const Login = (props) => {
    let navigate=useNavigate();
    const handleClick=()=>{
        props.change();
    }
    const [inform,setInform]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setInform(prevState=>{
            return{
                ...prevState,
                [name]:value,
            }
        })
    }
    const MySwal = withReactContent(Swal);
    const checkLogin=()=>{
        if (inform.email == '' || inform.password==''){return}
         console.log(inform);
        const obj = { user: inform };
        console.log(obj)
        axios.post('https://todoo.5xcamp.us/users/sign_in',obj)
        .then(res=>{
            let authorization = res.headers.authorization;
            let nickname = res.data.nickname;
            localStorage.setItem('authorization', authorization);
            localStorage.setItem('nickname', nickname);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Success',
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
                navigate('/TodoPage');
            });
            
        })
        .catch(err=>{
            Swal.fire({
              icon: 'error',
              title: 'Login fail',
            });
        })
        ;
    }
  return (
    <div className="login">
      <h2>Best Keeper</h2>
      <form>
        <h3>Email</h3>
        <input
          onChange={handleChange}
          type="mail"
          name="email"
          value={inform.email}
        />
        <h3>Password</h3>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={inform.password}
        />
      </form>
      <div className="login-chose">
        <button style={{ backgroundColor: '#022B3A' }} onClick={checkLogin}>Login</button>
        <button onClick={handleClick}>Register</button>
      </div>
    </div>
  );
};

export default Login;
