import React from "react";
import "./bids.css";
import { AiFillHeart } from "react-icons/ai";
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
      .get(process.env.REACT_APP_SERVER_URL + "getThematics")
      .then((thematics) => setThematics(thematics.data))
      .catch((err) => console.log(err));
  }, []);

  function CardColumn({ img, title, vote }) {
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
            <p>
              <AiFillHeart /> {vote}
            </p>
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
            <CardColumn img={daoDong} title={thematics[0].thematic} vote={10} />
            <CardColumn img={songAm} title={thematics[1].thematic} vote={9} />
            <CardColumn img={dienXoayChieu} title={thematics[2].thematic} vote={5} />
            <CardColumn img={dienTu} title={thematics[3].thematic} vote={5} />
            <CardColumn img={luongTuAnhSang} title={thematics[5].thematic} vote={4} />
            <CardColumn img={luongTu} title={thematics[6].thematic} vote={2} />
            <CardColumn img={machDien} title={thematics[10].thematic} vote={2} />
            <CardColumn img={dienTruong} title={thematics[9].thematic} vote={1} />
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
