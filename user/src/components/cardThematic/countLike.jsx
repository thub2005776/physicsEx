
const CountLike = ({thematics, exercises}) => {

  const like = new Map();
  if(thematics && exercises) {
    for(let i = 0; i <  thematics.length; i++) {
    var likes = 0;
    for(let j = 0; j <  exercises.length; j++) {
      if(thematics[i].code === exercises[j].subThematic) {
        likes+=exercises[j].like
      }
      like.set(thematics[i].code, likes)
    }
  }
  }
  
  return like;
}

export default CountLike;