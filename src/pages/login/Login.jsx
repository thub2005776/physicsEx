import React from 'react';
import './login.css'
import {Link} from 'react-router-dom'
import { BsFacebook, BsGoogle } from "react-icons/bs";

const Login = () => {


  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Đăng nhập</h1>
        {/* Kiểm tra đăng nhập */}
        <form className='login-writeForm' autoComplete='off'>
          <div className="login-formGroup">
            <label>Tài khoản</label>
            <input type="text" placeholder='Tài khoản hoặc Email'  />
          </div>
          <div className="login-formGroup">
            <label>Mật khẩu</label>
            <input type="password" placeholder='Mật khẩu'  />
          </div>
          
         <div className="login-button">
          {/* Xử lý đăng nhập */}
          <button className='login-writeButton' type='submit'>Đăng nhập</button>
          <Link to="/register">
            <button className='login-reg-writeButton' type='submit'>Đăng ký</button>
          </Link>
         </div>
         <div className='login-button-icon'>
          {/* Xử lý đăng nhập bằng facebook/google  */}
         <Link to="/">
            <button  type='submit'><BsFacebook size={20}/></button>
          </Link>
          <Link to="/">
            <button  type='submit'><BsGoogle size={20}/></button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Login;
