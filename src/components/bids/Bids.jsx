import React from "react";
import "./bids.css";
import daoDong from "../../assets/daoDong.jpg";
import songAm from "../../assets/songAm.jpg";
import luongTu from "../../assets/luongTu.jpg";
import machDien from "../../assets/machDien.jpg";
import dienTruong from "../../assets/DienTruong.jpg";
import dienXoayChieu from "../../assets/dienXoayChieu.jpg";
import luongTuAnhSang from "../../assets/luongTuAnhSang.jpeg";
import dienTu from "../../assets/dienTu.jpg";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const Bids = ({ title }) => {
  const [thematics, setThematics] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "thematics")
      .then((thematics) => setThematics(thematics.data))
      .catch((err) => console.log(err));
  }, []);

  function CardColumn({ img, title }) {
    return (
      <div className="card-column">
        <div className="bids-card">
          <div className="bids-card-top">
            <img src={img} alt={title} />
            <Link to={`/exercises`}>
              <p className="bids-title">{title}</p>
            </Link>
          </div>
          <div className="bids-card-bottom">
            
          </div>
        </div>
      </div>
    );
  }

  return (
    thematics?.length && (
      <div className="bids section__padding">
        <div className="bids-container">
          <div className="bids-container-text">
            <h1>{title}</h1>
          </div>
          <div className="bids-container-card">
            <CardColumn 
              img={daoDong} 
              title={thematics[0].thematic} 
              index={thematics[0].code} 
            />
            <CardColumn 
              img={songAm} 
              title={thematics[1].thematic} 
            />
            <CardColumn 
              img={dienXoayChieu} 
              title={thematics[2].thematic} 
            />
            <CardColumn 
              img={dienTu} 
              title={thematics[3].thematic} 
            />
            <CardColumn 
              img={luongTuAnhSang} 
              title={thematics[5].thematic}
            />
            <CardColumn 
              img={luongTu} 
              title={thematics[6].thematic}
            />
            <CardColumn 
              img={machDien} 
              title={thematics[10].thematic} 
            />
            <CardColumn 
              img={dienTruong} 
              title={thematics[9].thematic}
            />
          </div>
        </div>
        <div className="load-more">
          <Link to={`/thematics`}>
            <button>Xem thêm</button>
          </Link>
        </div>
      </div>
    )
  );
};

export default Bids;
