import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link } from "react-router-dom";

const Menu = () => (
  <>
     <Link to="/docs"><p>Tài liệu</p> </Link>
     <Link to="/exercises"><p>Bài tập</p></Link>
    
  </>
 )

 const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
   const [user,setUser] = useState(false)

  const handleLogout = () => {
    setUser(false);
  }
  const handleLogin = () => {
    setUser(true);
  }

  return (
    <div className='navbar'>
      <div className="navbar-links">
          <Link to="/"> 
          <img src={logo} alt="logo" style={{width: "60%"}} />
          </Link>
        <div className="navbar-links_container">
          <input type="text" placeholder='Nhập bài tập, công thức...' autoFocus={true} />
         <Menu />

         {/* Xử lý đăng xuất */}
         {user && <Link to="/"><p onClick={handleLogout}>Đăng xuất</p></Link> }
        
        </div>
      </div>
      <div className="navbar-sign">
        <>
        <Link to="/login"> 
         <button type='button' className='primary-btn' >Đăng nhập</button>
        </Link>
        <Link to="/register"> 
          <button type='button' className='secondary-btn'>Đăng ký</button>
        </Link>
        </>
       

       
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
            <div className="navbar-menu_container-links-sign">
            {user ? (
              <>
              <Link to="/create"> 
                <button type='button' className='primary-btn' >Create</button>
              </Link>
              <button type='button' className='secondary-btn'>Connect</button>
              </>
            ): (
              <>
              <Link to="/login"> 
              <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
              </Link>
              <Link to="/register"> 
                <button type='button' className='secondary-btn'>Sign Up</button>
              </Link>
              </>
            )}
           
            </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
