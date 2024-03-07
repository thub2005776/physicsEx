import React from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useState} from 'react';

import axios from 'axios';

const Login = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const permission = false;

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_SERVER_URL + 'log/ad/login', { email, password, permission })
      .then(res => {
        if(res.data.permission === "admin") {
          navigate('/admin/0');
          window.location.reload(true);
        } else {alert(res.data);}
      })
      .catch(err => {console.log(err)})

  }

  return (
    <div className='login section__padding pt-8 '>
      <div className="login-container border border-gray-500 bg-gray-800">
      <div className='md:text-xl text-base font-bold text-center'>Đăng nhập</div>
        {/* Kiểm tra đăng nhập */}
        <form onSubmit={handleSubmit} className='login-writeForm text-base' >
          <div className="login-formGroup">
            <label>Email</label>
            <input
              type="text"
              placeholder='Nhập Email của bạn'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="login-formGroup">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder='Mật khẩu'
              onChange={e => setPassword(e.target.value)}
            />
            {/* <Link to={`/forget-password`} className='text-blue-600 text-sm text-right'>Quên mật khẩu</Link> */}
          </div>
          <div className="flex justify-center">
            {/* Xử lý đăng nhập */}
            <button
              className='cursor-pointer rounded-lg bg-green-600 hover:bg-green-500 p-2'
              type='submit'>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
