import React from 'react'
import './footer.css'
import nftlogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
          <div>
            <img src={nftlogo} alt="logo" style={{ width: "50%" }} />

          </div>
          <div>
            <h3>Cập nhật mới nhất</h3>
          </div>
          <div>
            <input type="text" placeholder='Your Email' />
            <button className='email'>Email tôi!</button>
          </div>
        </div>
        <div className="footer-links_div">
          <Link to="/">
            <h4>PhysicsEx</h4>
          </Link>
          <Link to="/docs">
            <p>Tài liệu</p>
          </Link>
          <a href='/'><p>Liên hệ</p></a>
        </div>
        <div className="footer-links_div">
          <h4>Hỗ trợ</h4>
          <a href='/'><p>Trung tâm hỗ trợ</p></a>
          <a href='/'><p>Chat</p></a>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
          <p> © {(new Date().getFullYear())} PhysicsEx</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
