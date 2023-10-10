import { Link } from 'react-router-dom';

import '../../components/bids/bids.css'

function CardThematic ({thematic}) {

    return ( 
    <Link to={`/detail/` + thematic.code}>
      <div className="card-column" >
          <div className="bids-card">
            <div className="bids-card-top">
              <img src={process.env.REACT_APP_SERVER_URL + thematic.img} alt={thematic.thematic} />
             
              <p className="bids-title">{thematic.thematic}</p>
              
            </div>
            <div className="bids-card-bottom">
            </div>
          </div>
        </div>
      </Link>
    )
}

export default CardThematic;