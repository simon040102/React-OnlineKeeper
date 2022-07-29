import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
const Register = (props) => {
   let navigate = useNavigate();
  const handleClick = () => {
    props.change();
  };
  const [registerInform, setRegisterInform] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInform((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const MySwal = withReactContent(Swal);
  const registerNew = () => {
    const obj = { user: registerInform };
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!emailRule.test(registerInform.email)) return alert('Please check your Email')
    if (registerInform.password !== registerInform.checkPassword)return alert('Please check your Password')
      axios
        .post('https://todoo.5xcamp.us/users', obj)
        .then((res) => {
          let authorization = res.headers.authorization;
          let nickname = res.data.nickname;
          localStorage.setItem('authorization', authorization);
          localStorage.setItem('nickname', nickname);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500,
          }).then(handleClick());
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Register fail',
          });
        });
  };

  return (
    <div className=" w-9/12 md:w-5/12">
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-5 text-blue-200">
        Register Account
      </h2>
      <form>
        <h3 className="text-xl md:text-3xl font-bold leading-8 text-white mb-2">
          Email
        </h3>
        <input
          className="w-full h-8 md:h-12 text-xl md:text-3xl mb-2 md:mb-8 rounded-2xl indent-8"
          onChange={handleChange}
          type="email"
          name="email"
          value={registerInform.email}
        />
        <h3 className="text-xl md:text-3xl font-bold leading-8 text-white mb-2">
          NickName
        </h3>
        <input
          className="w-full h-8 md:h-12 text-xl md:text-3xl mb-2 md:mb-8 rounded-2xl indent-8"
          onChange={handleChange}
          type="text"
          name="nickname"
          value={registerInform.nickName}
        />
        <h3 className="text-xl md:text-3xl font-bold leading-8 text-white mb-2">
          Password
        </h3>
        <input
          className="w-full h-8 md:h-12 text-xl md:text-3xl mb-2 md:mb-8 rounded-2xl indent-8"
          onChange={handleChange}
          type="password"
          name="password"
          value={registerInform.password}
        />
        <h3 className="text-xl md:text-3xl font-bold leading-8 text-white mb-2">
          Check Password
        </h3>
        <input
          className="w-full h-8 md:h-12 text-3xl mb-2 md:mb-8 rounded-2xl indent-8"
          onChange={handleChange}
          type="password"
          name="checkPassword"
          value={registerInform.checkPassword}
        />
      </form>
      <div className="flex mt-3 md:mt-0 justify-around px-8">
        <button
          className="font-bold text-xl px-3 leading-9 border-2 border-teal-50 text-teal-100 cursor-pointer rounded-md bg-blue-900 hover:underline"
          onClick={registerNew}
        >
          Register
        </button>
        <button
          className="font-bold text-xl px-3 leading-9 border-2 border-teal-50 text-teal-100 cursor-pointer rounded-md bg-teal-700 hover:underline"
          onClick={handleClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
