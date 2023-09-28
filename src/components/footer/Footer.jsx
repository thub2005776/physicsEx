import React from 'react'
import './footer.css'
import nftlogo from '../../assets/logo.png'
import { AiOutlineInstagram,AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
        <div>
          <img src={nftlogo} alt="logo" style={{width:"50%"}}/>
          
        </div>
        <div>
          <h3>Cập nhật mới nhất</h3>
        </div>
        <div>
          <input type="text" placeholder='Your Email' />
          <button>Email tôi!</button>
        </div>
        </div>
        <div className="footer-links_div">
          <h4>PhysicsEx</h4>
          <p>Tài liệu</p>
          <p>Counters</p>
          <p>Liên hệ</p>
        </div>
        <div className="footer-links_div">
          <h4>Hỗ trợ</h4>
          <p>Trung tâm hỗ trợ</p>
          <p>Chat</p>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
        <p> © {(new Date().getFullYear())} PhysicsEx</p>
        </div>
        <div>
          <AiOutlineInstagram size={25} color='white' className='footer-icon' />
          <AiOutlineTwitter size={25} color='white' className='footer-icon'/>
          <RiDiscordFill size={25} color='white' className='footer-icon'/>
          <FaTelegramPlane size={25} color='white'  className='footer-icon' />
        </div>

      </div>
    </div>
  )
}

export default Footer
