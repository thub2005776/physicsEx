import React from 'react';
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
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
    axios.post(process.env.REACT_APP_SERVER_URL + 'login', { email, password, permission })
      .then(res => {
        if (res.data.permission === "user") {
          navigate('/');
          window.location.reload(true);
        } else if(res.data.permission === "admin") {
          navigate('/admin/0');
          window.location.reload(true);
        } else {alert(res.data);}
      })
      .catch(err => {console.log(err)})

  }

  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Đăng nhập</h1>
        {/* Kiểm tra đăng nhập */}
        <form onSubmit={handleSubmit} className='login-writeForm' autoComplete='off'>
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
          <div className="login-button">
            {/* Xử lý đăng nhập */}
            <button
              className='login-writeButton'
              type='submit'
            >Đăng nhập
            </button>
            <Link to="/register">
              <button className='login-reg-writeButton'>Đăng ký</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
