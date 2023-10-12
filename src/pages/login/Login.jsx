import React from 'react';
import './login.css'
import { Link, useNavigate} from 'react-router-dom'
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { useState} from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const permission = false;

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post(process.env.REACT_APP_SERVER_URL + 'login', { email, password, permission})
            .then(res => {
              if (res.data.permission === false) {
                navigate('/', { state: { user: res.data } } )
              } 
            })
            .catch(err => console.log(err))
    
  }

  const google = () => {
    window.open(process.env.REACT_APP_SERVER_URL + "auth/google", "_self")
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
          <div className='login-button-icon'>
              <div className='facebook' >
                <BsFacebook size={20} />
              </div>
              <div className='google'onClick={google}>
                 <BsGoogle size={20} />
              </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
