import React from 'react';
import './register.css'
import {Link} from 'react-router-dom'
import Image from '../../assets/Image.png'

const Register = () => {
  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>Đăng ký</h1>
        <p className='upload-file'>Chọn ảnh đại diện</p>
        <div className="upload-img-show">
          {/* Cần thay đổi ảnh */}
          <img src={Image} alt="banner" />
          <p>Trên thiết bị</p>
        </div>
        {/* Kiểm tra form  */}
        <form name='register' className='register-writeForm' autoComplete='off' >
          <div className="register-formGroup">
            <label>Tải lên</label>
            <input type="file" className='custom-file-input'
          />
          </div>
          <div className="register-formGroup">
            <label>Họ và tên</label>
            <input type="text" placeholder='Tên của bạn' />
          </div>
          <div className="register-formGroup">
            <label>Tài khoản</label>
            <input type="text" placeholder='Tài khoản'  />
          </div>
          <div className="register-formGroup">
            <label>Email</label>
            <input type="email" placeholder='Email' />
          </div>
          <div className="register-formGroup">
            <label>Mật khẩu</label>
            <input type="text" placeholder='Mật khẩu'   />
          </div>
         <div className="register-button">
          {/* Xử lý việc đăng ký */}
          <button className='register-writeButton'>Đăng ký</button>
          <Link to="/login">
            <button className='reg-login-writeButton' >Đăng nhập</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Register;
