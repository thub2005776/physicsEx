import React from "react";
import "./bids.css";
import { Link } from "react-router-dom";
import CardThematic from "../cardThematic/cardThematic";

import { useState, useEffect } from "react";
import axios from "axios";

const Bids = ({ title }) => {
  const [thematics, setThematics] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "thematics")
      .then((thematics) => setThematics(thematics.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "exercises")
      .then((exercises) => setExercises(exercises.data))
      .catch((err) => console.log(err));
  }, []);

  const like = new Map();
  for(let i = 0; i < thematics.length; i++) {
    var likes = 0;
    for(let j = 0; j < exercises.length; j++) {
      if(thematics[i].code === exercises[j].subThematic) {
        likes+=exercises[j].like
      }
      like.set(thematics[i].code, likes)
    }
  }

  const liked = new Array([...like.entries()].sort((a, b) => b[1] - a[1]))
  const most = liked[0].slice(0,8);
  console.log(most);
  var them = []
  most.forEach((l,i) => {
    them[i] = thematics.filter(f => f.code === l[0])
    
  })
  
  console.log(them);
  return (
    thematics.length? (
      <div className="bids section__padding">
        <div className="bids-container">
          <div className="bids-container-text">
            <h1>{title}</h1>
          </div>
          <div className="bids-container-card">
            {them.map((t, i) => (
              <CardThematic
                key={i}
                thematic={t[0]}
            />
            ))}
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
