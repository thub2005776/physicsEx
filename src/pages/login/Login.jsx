import React from 'react';
import './login.css'
// import SocialButton from '../../components/socialButton/socialButton'
import { Link, useNavigate } from 'react-router-dom'
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState} from 'react';
import { GoogleLogin} from 'react-google-login';

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
        if (res.data.permission === false) {
          navigate('/');
          window.location.reload(true);
        } else {
          navigate('/admin/0');
          window.location.reload(true);
        }
      })
      .catch(err => console.log(err))

  }

  const handleGoogleLoginSuccess = (res) => {
    console.log("success ",res.profileObj);
    handleLoginSuccess(res.profileObj);
  };

  const handleLoginFailure = (res) => {
    console.log("failed ", res);
  };

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
          <br />
          <p className='or'>Hoặc</p>

          {/* Xử lý đăng nhập bằng facebook/google  */}
          <div className="flex justify-evenly">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={false}
            />
            
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
