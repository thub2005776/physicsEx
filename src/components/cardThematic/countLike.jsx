import { useState, useEffect } from "react";
import axios from "axios";
const CountLike = () => {
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
  return like;
}

export default CountLike;