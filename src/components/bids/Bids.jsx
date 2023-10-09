import React from "react";
import "./bids.css";
import { Link } from "react-router-dom";
import CardThematic from "../cardThematic/cardThematic";

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


  return (
    thematics.length? (
      <div className="bids section__padding">
        <div className="bids-container">
          <div className="bids-container-text">
            <h1>{title}</h1>
          </div>
          <div className="bids-container-card">
            <CardThematic
              thematic={thematics[0]}
            />
            <CardThematic
              thematic={thematics[1]}
            />
            <CardThematic
              thematic={thematics[2]}
            />
            <CardThematic
              thematic={thematics[3]}
            />
            <CardThematic
              thematic={thematics[5]}
            />
            <CardThematic
              thematic={thematics[8]}
            />
            <CardThematic
              thematic={thematics[10]}
            />
            <CardThematic
              thematic={thematics[9]}
            />
          </div>
        </div>
        <div className="load-more">
          <Link to={`/thematics`}>
            <button>Xem thêm</button>
          </Link>
        </div>
      </div>
    ) : <p className="text-white">Loading...</p> 
  )
};

export default Bids;
