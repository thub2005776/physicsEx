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
    <Link to={`/thematics/${thematic._id}` }>
      <div className="w-fit  md:h-full h-56 my-2 rounded-2xl border border-gray-400 text-white font-semibold" >
          <div className="bg-[#2A2D3A] p-3 rounded-2xl h-full">
            <div className="">
              <img className='w-52 sm:h-40 h-36 rounded-3xl' src={process.env.REACT_APP_SERVER_URL + thematic.img} alt={thematic.thematic} />
              <p className="lg:text-base text-xs">{thematic.thematic}</p>
            </div>
            <div className='flex justify-end'>
              <div className='mt-1 pr-1 text-blue-500'><AiFillLike /></div>
              {count}
            </div>
          </div>
        </div>
      </Link>
    )
}

export default CardThematic;