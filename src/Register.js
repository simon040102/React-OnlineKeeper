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
    <div className="Register">
      <h2>Register Account</h2>
      <form>
        <h3>Email</h3>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={registerInform.email}
        />
        <h3>NickName</h3>
        <input
          onChange={handleChange}
          type="text"
          name="nickname"
          value={registerInform.nickName}
        />
        <h3>Password</h3>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={registerInform.password}
        />
        <h3>Check Password</h3>
        <input
          onChange={handleChange}
          type="password"
          name="checkPassword"
          value={registerInform.checkPassword}
        />
      </form>
      <div className="register-chose">
        <button onClick={registerNew} style={{ backgroundColor: '#022B3A' }}>
          Register
        </button>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};

export default Register;
