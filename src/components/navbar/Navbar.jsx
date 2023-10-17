import React, { useEffect, useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from 'axios';

const Menu = () => (
  <>
    <Link to="/docs" className='menu'><p>Tài liệu</p> </Link>
    <Link to="/exercises" className='menu'><p>Bài tập</p></Link>

  </>
)


const Navbar = ({auth}) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [profile, setProfile] = useState([]);

  const handleLogout = () => {
    
      axios.get(process.env.REACT_APP_SERVER_URL + "logout")
        .then(res => {
          window.location.reload(true);
        }).catch(err => console.log(err));
    
  }

  useEffect(() => {
    axios.post(process.env.REACT_APP_SERVER_URL + 'profile')
    .then(res => {
        setProfile(res.data);
        // console.log(res.data);
    })
    .catch(err => console.log(err))
  }, []);

  const info = profile.find((p) => p.email === auth);
  // console.log(info);

  return (
    <div className='sticky top-0 bg-[#24252d]'>
      <div className='navbar '>
        <div className="navbar-links">
          <Link to="/">
            <img src={logo} alt="logo" className='logo' />
          </Link>

        </div>
        <Link to="/searchbar">
          <BsSearch color='white' size='20' />
        </Link>
        <div className="navbar-sign">

          <div className="menu_div">
            <Menu />
          </div>
          {auth ? (
            <>
            <Link to="/">
                <button type='button' className='secondary-btn' onClick={handleLogout}>Đăng xuất</button>
              </Link>
              {info? (
                <>
                <img src={process.env.REACT_APP_SERVER_URL + info.img} alt="profile" className='w-1/12 rounded-2xl' />
                </>
                
              ) : (<img src={auth.picture} alt="profile" className='avartar' />)}
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
                <Menu />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
