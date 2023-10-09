import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

import CardThematic from '../../components/cardThematic/cardThematic';



function Thematics () {
    const [thematics, setThematics] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
        .then(thematics => setThematics(thematics.data))
        .catch(err => console.log(err))
    }, [])



    return (
      thematics.length? (
        <div className="bids section__padding">
          <div className="bids-container">
            <div className="bids-container-text">
              <h1>Tất cả chuyên đề</h1>
            </div>
            <div className="bids-container-card">
              {thematics.map((thematic, index) => (

                  <CardThematic 
                    key={thematic.code} 
                    thematic={thematic}
                  />
              ))}
            </div>
          </div>
        </div>
      ):<p  className='text-white'>Loading...</p>
    );
};

export default Thematics;