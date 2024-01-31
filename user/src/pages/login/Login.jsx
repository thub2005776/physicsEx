import React from 'react';
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
// import { useGoogleLogin, googleLogout, GoogleLogin } from '@react-oauth/google';
import GoogleLogin from "react-google-login";
import axios from 'axios';

const Login = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const permission = false;

  // const responseMessage = (response) => {
  //   setUser(response);
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: (error) => console.log('Login Failed:', error)
  // });

  // useEffect(() => {
  //   if (user) {
  //     let headers = {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'Authorization': `Bearer ${user.access_token}`,
  //       'Access-Control-Allow-Credentials': true,
  //       'credentials': 'include'
  //     };

  //     axios
  //       .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //         headers: headers,
          
  //       })
  //       .then((res) => {
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  // console.log(profile);


const responseGoogle = (response) => {
  const { profileObj } = response;
  console.log(`Welcome, ${profileObj.name}!`);
  // Perform actions using user data
}
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_SERVER_URL + 'log/u/login', { email, password, permission })
      .then(res => {
        if (res.data.permission === "user") {
          navigate('/');
          window.location.reload(true);
        } else { alert(res.data); }
      })
      .catch(err => { console.log(err) })

  }


  return (
    <div className='login section__padding'>
      <div className="login-container">
        <div className='text-4xl font-bold text-center'>Đăng nhập</div>
        {/* Kiểm tra đăng nhập */}
        <form onSubmit={handleSubmit} className='login-writeForm' >
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
        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        <button onClick={logOut}>logout</button> */}

        <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
      </div>
    </div>
  )
};

export default Login;
