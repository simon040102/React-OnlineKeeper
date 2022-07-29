import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let navigate = useNavigate();
  const handleClick = () => {
    props.change();
  };
  const [inform, setInform] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInform((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const MySwal = withReactContent(Swal);
  const checkLogin = () => {
    if (inform.email == '' || inform.password == '') {
      return;
    }

    const obj = { user: inform };

    axios
      .post('https://todoo.5xcamp.us/users/sign_in', obj)
      .then((res) => {
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
        }).then(() => {
          navigate('/TodoPage');
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login fail',
        });
      });
  };
  return (
    <div className="  w-9/12 md:w-5/12">
      <h2 className="text-5xl md:text-6xl font-bold text-center mb-5 text-blue-200">
        Best Keeper
      </h2>
      <form>
        <h3 className="text-xl md:text-3xl font-bold leading-8 text-white mb-2">
          Email
        </h3>
        <input
          className="w-full h-8 md:h-12 text-xl md:text-3xl mb-2 md:mb-8 rounded-2xl indent-8"
          onChange={handleChange}
          type="mail"
          name="email"
          value={inform.email}
        />
        <h3 className="text-xl md:text-3xl font-bold leading-8 text-white mb-2">
          Password
        </h3>
        <input
          className="w-full h-8 md:h-12 text-xl md:text-3xl mb-2 md:mb-8 rounded-2xl indent-8"
          onChange={handleChange}
          type="password"
          name="password"
          value={inform.password}
        />
      </form>
      <div className=" flex  mt-3 md:mt-0 justify-around px-8">
        <button
          className="font-bold text-xl px-3 leading-9 border-2 border-teal-50 text-teal-100 cursor-pointer rounded-md bg-blue-900 hover:underline"
          onClick={checkLogin}
        >
          Login
        </button>
        <button
          className="font-bold text-xl px-3 leading-9 border-2 border-teal-50 text-teal-100 cursor-pointer rounded-md bg-teal-700 hover:underline"
          onClick={handleClick}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
