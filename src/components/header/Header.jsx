import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import coin from '../../assets/luongtu.png'

const Header = () => {

  return (
    <div className='header section__padding'>
      <div className="header-content">
        <div>
          <h1 className='sm:text-lg text-xs'>“Mọi sự thật đều dễ hiểu một khi chúng được khám phá; vấn đề là phát hiện ra chúng.” - Galileo Galilei</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
