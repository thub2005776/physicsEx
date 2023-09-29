import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import coin from '../../assets/luongtu.png'
// import { Link  } from 'react-router-dom';

const Header = () => {
  // var settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   swipeToSlide:true,
  //   responsive: [
  //     {
  //       breakpoint: 1160,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         swipeToSlide:true,
  //       }
  //     },
  //     {
  //       breakpoint: 950,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         swipeToSlide:true,
  //       }
  //     },
  //     {
  //       breakpoint: 750,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       }
  //     },
  //     {
  //       breakpoint: 550,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1
  //       }
  //     },
  //     {
  //       breakpoint: 470,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       }
  //     },
  //     {
  //       breakpoint: 400,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         variableWidth: true,
  //       }
  //     }
  //   ]
  // };


  return (
    <div className='header section__padding'>
      <div className="header-content">
        <div>
          <h1>“Mọi sự thật đều dễ hiểu một khi chúng được khám phá; vấn đề là phát hiện ra chúng.” - Galileo Galilei</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div>
      {/* <div className="header-slider">
        Thay thế bài tập nổi bật 
        <h1>Bài tập nổi bật</h1>
       <Slider {...settings} className='slider'>
            <div className='slider-card'>
              <p className='slider-card-number'>1</p>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>James Bond</p>
              </Link>
              <p className='slider-card-price'>5.250 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>2</p>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Rian Leon</p>
              </Link>
              <p className='slider-card-price'>4.932 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>3</p>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Lady Young</p>
              </Link>
              <p className='slider-card-price'>4.620 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>4</p>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Black Glass</p>
              </Link>
              <p className='slider-card-price'>4.125 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>5</p>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Budhiman</p>
              </Link>
              <p className='slider-card-price'>3.921 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>6</p>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Alex</p>
              </Link>
              <p className='slider-card-price'>3.548 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>7</p>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Alex</p>
              </Link>
              <p className='slider-card-price'>3.548 <span>ETH</span></p>
            </div>
        </Slider>
      </div> */}
    </div>
  )
}

export default Header
