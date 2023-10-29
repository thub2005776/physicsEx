import { Link } from 'react-router-dom';
import { AiFillLike } from "react-icons/ai";
import '../../components/bids/bids.css'

function CardThematic ({thematic, like}) {
  var count = 0;
  like && like.forEach(e => {
    if(e[0] === thematic.code) {
      count = e[1]
    }
  });

  // console.log(count);
    return ( 
    <Link to={`/thematics/${thematic.code}` }>
      <div className="card-column" >
          <div className="bids-card">
            <div className="bids-card-top">
              <img src={process.env.REACT_APP_SERVER_URL + thematic.img} alt={thematic.thematic} />
              <p className="bids-title">{thematic.thematic}</p>
            </div>
            <div className='flex justify-end text-white'>
              <div className='mt-1 pr-1 text-blue-500'><AiFillLike /></div>
              {count}
            </div>
          </div>
        </div>
      </Link>
    )
}

export default CardThematic;