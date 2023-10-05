import { useState } from 'react';
import './register.css'
import { Link } from 'react-router-dom'
import Image from '../../assets/Image.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [file, setFile] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    comfirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const validationErrors = {}
  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
    setName(e.target.value);
    setEmail(e.target.value);
    setPassword(e.target.value);
    
    // Xác thực form 
    
    if (!formData.name.trim()) {
      validationErrors.name = "Bạn phải nhập tên"
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Bạn phải nhập email"
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
      validationErrors.email = "Email không hợp lệ"
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Bạn phải nhập mật khẩu"
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(formData.password)) {
      validationErrors.password = "Mật khẩu phải có ít nhất 8 ký tự : HOA, thường và đặc biệt"
    }

    if (formData.comfirmPassword !== formData.password) {
      validationErrors.comfirmPassword = "Mật khẩu không khớp"
    }
    setErrors(validationErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(validationErrors).length === 0) {
      alert("Đăng ký thành công!");

      // Post data 

      axios.post(process.env.REACT_APP_SERVER_URL + 'users', { name, email, password })
        .then(res => {
          console.log(res)
          navigate('/login')
        })
        .catch(err => console.log(err))
    }
  }


  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>Đăng ký</h1>
        <p className='upload-file'>Chọn ảnh đại diện</p>
        <div className="upload-img-show">
          {/* Cần thay đổi ảnh */}
          <img src={Image} alt="banner" />
        </div>
        {/* Kiểm tra form  */}
        <form onSubmit={handleSubmit} name='register' className='register-writeForm' autoComplete='off' >
          <div className="register-formGroup">
            <label>Tải lên</label>
            <input type="file"
              className='custom-file-input'
              onChange={e => setFile(e.target.files[0])}
            />
          </div>


          <div className="register-formGroup">
            <label>Họ và tên</label>
            <input type="text"
              placeholder='Tên của bạn'
              name='name'
              onChange={handleValidation}
            />
            {errors.name && <span>{errors.name}</span>}

          </div>
          <div className="register-formGroup">
            <label>Email</label>
            <input type="email"
              placeholder='Email'
              name='email'
              onChange={handleValidation}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="register-formGroup">
            <label>Mật khẩu</label>
            <input type="password"
              placeholder='Mật khẩu'
              name='password'
              onChange={handleValidation}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className="register-formGroup">
            <label>Nhập lại mật khẩu</label>
            <input type="password"
              name='comfirmPassword'
              placeholder='Nhập lại mật khẩu'
              onChange={handleValidation}
            />
            {errors.comfirmPassword && <span>{errors.comfirmPassword}</span>}
          </div>
          <div className="register-button">
            {/* Xử lý việc đăng ký */}
            <button
              className='register-writeButton'
              type='submit'
            >Đăng ký
            </button>
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
