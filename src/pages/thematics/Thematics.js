import React from 'react'
import { AiFillHeart } from "react-icons/ai";
import daoDong from '../../assets/daoDong.jpg'
import songAm from '../../assets/songAm.jpg'
import dienXoayChieu from '../../assets/dienXoayChieu.jpg'
import dienTu from '../../assets/dienTu.jpg'
import tanSacAnhSang from '../../assets/tanSacAnhSang.jpeg'
import luongTuAnhSang from '../../assets/luongTuAnhSang.jpeg'
import luongTu from '../../assets/luongTu.jpg'
import hienTuongCongHuong from '../../assets/hienTuongCongHuong.jpg'
import song from '../../assets/song.jpg'
import dienTruong from '../../assets/DienTruong.jpg'
import dinhLuatOm from '../../assets/dinhLuatOm.jpg'
import roiTuDo from '../../assets/roiTuDo.jpg'
import trongLuc from '../../assets/trongLuc.jpg'
import nangLuong from '../../assets/nangLuong.jpg'
import dongLuong from '../../assets/dongLuong.jpg'
import lucHuongTam from '../../assets/lucHuongTam.jpg'
import apSuat from '../../assets/apSuat.jpg'

import { Link } from 'react-router-dom';

import { useState, useEffect } from "react";
import axios from "axios";


import './thematics.css';
import '../../components/bids/bids.css'

function Thematics () {
    const [thematics, setThematics] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getThematics')
        .then(thematics => setThematics(thematics.data))
        .catch(err => console.log(err))
    }, [])

    const images = ["daoDong", "songAm", "dienXoayChieu", "dienTu", "tanSacAnhSang", "luongTuAnhSang", 
                    "luongTu", "hienTuongCongHuong", "song", "dienTruong", "dinhLuatOm", "roiTuDo",
                    "trongLuc", "nangLuong", "dongLuong", "lucHuongTam", "apSuat"]

    function CardColumn ({img, title, vote}) {
        return (
          <div className="card-column" >
              <div className="bids-card">
                <div className="bids-card-top">
                  <img src={img} alt={title} />
                  <Link to={`/exercises`}>
                  <p className="bids-title">{title}</p>
                  </Link>
                </div>
                <div className="bids-card-bottom">
                  <p> <AiFillHeart /> {vote}</p>
                </div>
              </div>
            </div>
        )
    }

    return (
      thematics?.length && (
        <div className="bids section__padding">
          <div className="bids-container">
            <div className="bids-container-text">
              <h1>Tất cả chuyên đề</h1>
            </div>
            <div className="bids-container-card">
              <CardColumn img={daoDong} title={thematics[0].thematic} vote={10} />
            </div>
          </div>
        </div>
      )
    );
};

export default Thematics;