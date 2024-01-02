import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
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
      {profile ? <ProfileCard handlelogout={handleLogout} auth={auth} state={state}/> : null}
      <div className='fixed z-[1000]  top-0 left-0 bg-[#24252d] w-full'>
        <div className='navbar py-2 px-10'>
          <div className="navbar-links">
            <Link to="/">
              <img src={logo} alt="logo" className='sm:w-52 w-36' />
            </Link>

          </div>
          
          <div className="navbar-sign">

            {/* <div className="menu_div">
            <Menu />
          </div> */}
            {auth ? (
              <>
                {auth.permission === "admin" ?
                  <Link to={`/admin/0`}>
                    <div className='text-white text-sm font-semibold float-right bg-sky-400 rounded-2xl p-3'>
                      admin
                    </div></Link> : null}
                <Link to="/">
                  <button type='button' className='secondary-btn' onClick={handleLogout}>Đăng xuất</button>
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
