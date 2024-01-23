import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';
import axios from 'axios';
import ProfileCard from '../profileCard';


const Navbar = ({ auth, com }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const comm = com && com.filter(f => f.state === false);
  // Handle Logout 
  const handleLogout = () => {
    axios.get(process.env.REACT_APP_SERVER_URL + "logout")
      .then(res => {
        window.location.reload(true);
      }).catch(err => console.log(err));

  }

  // Set stating of Profile card  
  const state = (s) => {
    setProfile(s)
  };

  return (
    <div className='mb-[4rem]'>
      {profile ? <ProfileCard handlelogout={handleLogout} auth={auth} state={state} /> : null}
      <div className='fixed z-[1000]  top-0 left-0 bg-[#24252d] w-full'>
        <div className='navbar py-2 px-10'>
          <div className="navbar-links">
            <Link to="/admin/0">
              <img src={logo} alt="logo" className='sm:w-52 w-36' />
            </Link>

          </div>

          <div className="navbar-sign gap-2">

            {/* <div className="menu_div">
            <Menu />
          </div> */}
            {auth ? (
              <>
                {path !== 0 &&
                  // Back buuton
                  <button className='float-right rounded-lg hover:bg-green-500'
                    onClick={() => navigate(-1)}>
                    <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                  </button>}
                {/* Comments nofication */}
                <Link to={'/admin/4'}>
                  <button type="button" className="relative inline-flex items-center  text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none  hover:bg-blue-500 focus:ring-blue-400">
                    <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L12.414 16H20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM7.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                    </svg>
                    {comm && comm.length > 0 &&
                      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500   rounded-full -top-1 -end-0">
                        {com.length}
                      </div>}
                  </button>
                </Link>


                {/* Logout button  */}
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

                {/* Profile image */}
                {auth && auth.permission === 'admin' ? (
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

          {/* Toggle Menu  */}
          <div className="navbar-menu">
            {toggleMenu ?
              <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
              : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
            {toggleMenu && (
              <div className="navbar-menu_container scale-up-center" >
                <div className="navbar-menu_container-links">
                  {auth ?
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
                    : <Link to="/login">
                      <button type='button' className='primary-btn rounded-lg'>Đăng nhập</button>
                    </Link>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>

  )
}

export default Navbar;
