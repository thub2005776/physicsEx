import React from "react";
import "./bids.css";
import { useNavigate } from "react-router";
import CardThematic from "../cardThematic/cardThematic";
import CountLike from '../cardThematic/countLike';

const Bids = ({ title, thematics, exercises }) => {
  const navigate = useNavigate();
  const like = CountLike({ thematics, exercises });

  const liked = new Array([...like.entries()].sort((a, b) => b[1] - a[1]))
  const most = liked[0].slice(0, 8);
  // console.log(most[0][0]);
  var them = []
  most.forEach((l, i) => {
    them[i] = thematics.filter(f => f.code === l[0])

  })

  const handleSeeMore = () => {
    navigate('/thematics');
    document.location.reload();
  }
  return (
    thematics && exercises ? (
      <div className="text-white">
        <div className="">
          <h1 className=" text-center sm:font-extrabold sm:text-4xl text-base font-medium mb-5">{title}</h1>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 sm:mx-24 mx-10">
            {them.map((t, i) => (
              <CardThematic
                key={i}
                thematic={t[0]}
                like={most}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 p-2 border-[1px] lg:mx-96 md:mx-52 mx-24 text-center hover:cursor-pointer border-green-500 rounded-lg hover:bg-green-500"
          onClick={handleSeeMore}>
          <button>Xem thêm</button>
        </div>

      </div>
    ) : <p className="text-white">Loading...</p>
  )
};

export default Bids;
