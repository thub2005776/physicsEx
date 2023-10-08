import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link} from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Menu = () => (
  <>
     <Link to="/docs" className='menu'><p>Tài liệu</p> </Link>
     <Link to="/exercises" className='menu'><p>Bài tập</p></Link>
    
  </>
 )


 const Navbar = ({user}) => {
  const [toggleMenu,setToggleMenu] = useState(false)

  const handleLogout = () => {
    window.open(process.env.REACT_APP_SERVER_URL + "auth/logout", "_self");
  }
  return (
    <div className='navbar'>
      <div className="navbar-links">
          <Link to="/"> 
          <img src={logo} alt="logo" className='logo' />
          </Link>
          
      </div>
      <Link to="/searchbar">
            <BsSearch color='white' size='20'/>
          </Link>
      <div className="navbar-sign">
      
          <div className="menu_div">
              <Menu />
          </div>
        {user ? (
        <>
        <Link to="/"> 
          <button type='button' className='secondary-btn' onClick={handleLogout}>Đăng xuất</button>
        </Link>
        <img src={user.photos[0]} alt="" className='avartar' />

        
        </>) : (
        <Link to="/login"> 
         <button type='button' className='primary-btn' >Đăng nhập</button>
        </Link>)}
        
      </div>
      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
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
  )
}

export default Navbar
