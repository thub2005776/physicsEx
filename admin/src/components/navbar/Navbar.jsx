import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';
import axios from 'axios';
import ProfileCard from '../profileCard';

// const Menu = () => (
//   <>
//     <Link to="/docs" className='menu'><p>Tài liệu</p> </Link>
//     <Link to="/exercises" className='menu'><p>Bài tập</p></Link>

//   </>
// )


const Navbar = ({ auth }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [profile, setProfile] = useState(false);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const navigate = useNavigate();
  
  const handleLogout = () => {

    axios.get(process.env.REACT_APP_SERVER_URL + "logout")
      .then(res => {
        window.location.reload(true);
      }).catch(err => console.log(err));

  }

  const state = (s) => {
    setProfile(s)
  };

  return (
    <div className='mb-[4rem]'>
      {profile ? <ProfileCard handlelogout={handleLogout} auth={auth} state={state} /> : null}
      <div className='fixed z-[1000]  top-0 left-0 bg-[#24252d] w-full'>
        <div className='navbar py-2 px-10'>
          <div className="navbar-links">
            <Link to="/">
              <img src={logo} alt="logo" className='sm:w-52 w-36' />
            </Link>

          </div>

          <div className="navbar-sign gap-2">

            {/* <div className="menu_div">
            <Menu />
          </div> */}
            {auth ? (
              <>
                {auth.permission === "admin" && path != 0?
                    <button className='text-white text-sm font-semibold float-right bg-sky-400 rounded-lg '
                    onClick={() => navigate(-1)}>
                      Trở về
                    </button>: null}
                <Link to="/">
                  <button 
                    className="relative inline-flex items-center justify-center overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 
                            group-hover:from-pink-500 group-hover:to-orange-400  text-white focus:ring-4 focus:outline-none  focus:ring-pink-800"
                            onClick={handleLogout}>
                    <span className="relative  rounded-md ">
                      Đăng xuất
                    </span>
                  </button>
                  
                </Link>
                {auth ? (
                  <>
                    <img src={process.env.REACT_APP_SERVER_URL + auth.img} alt="profile"
                      className='w-8 h-7 rounded-full cursor-pointer'
                      onClick={() => setProfile(!profile)} />
                  </>

                ) : (
                  <img src={auth.picture} alt="profile" className='avartar' />
                )}

              </>
            ) : (
              <Link to="/login">
                <button type='button' className='primary-btn'>Đăng nhập</button>
              </Link>

            )}
          </div>


          <div className="navbar-menu">
            {toggleMenu ?
              <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
              : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
            {toggleMenu && (
              <div className="navbar-menu_container scale-up-center" >
                <div className="navbar-menu_container-links">
                  <Link to="/login">
                    <button type='button' className='primary-btn'>Đăng nhập</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>

  )
}

export default Navbar
