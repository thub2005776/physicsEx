import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import '../../components/bids/bids.css'
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

function Thematics () {
    const [thematics, setThematics] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
        .then(thematics => setThematics(thematics.data))
        .catch(err => console.log(err))
    }, [])

    function CardColumn ({img, title, vote, index}) {
        return (
          <div className="card-column" >
              <div className="bids-card">
                <div className="bids-card-top">
                  <img src={img} alt={title} />
                  <Link to={`/exercises/` + index}>
                  <p className="bids-title">{title}</p>
                  </Link>
                </div>
                <div className="bids-card-bottom">
                </div>
              </div>
            </div>
        )
    }

    const images = [daoDong, songAm, dienXoayChieu, dienTu, tanSacAnhSang, luongTuAnhSang, 
                    luongTu, hienTuongCongHuong, song, dienTruong, dinhLuatOm, roiTuDo,
                    trongLuc, nangLuong, dongLuong, lucHuongTam];

    return (
      thematics?.length && (
        <div className="bids section__padding">
          <div className="bids-container">
            <div className="bids-container-text">
              <h1>Tất cả chuyên đề</h1>
            </div>
            <div className="bids-container-card">
              {thematics.map((thematic, index) => (

                  <CardColumn 
                    key={thematic.code} 
                    img={images[index]} 
                    title={thematic.thematic} 
                    index={thematic.code}
                  />
              ))}
            </div>
          </div>
        </div>
      )
    );
};

export default Thematics;