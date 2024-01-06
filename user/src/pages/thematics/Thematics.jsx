import React from 'react'
import { CardThematic, CountLike } from '../../components';


function Thematics({thematics, exercises}) {
  const like = CountLike({thematics, exercises});
  const liked = new Array([...like.entries()]);
  const most = liked[0];

  return (
    thematics  && exercises ? (
      <div className="text-white mt-24">
        <div className="">
          <div className="text-center sm:font-extrabold sm:text-4xl text-lg font-medium mb-5">
            <h1>Tất cả chuyên đề</h1>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 sm:mx-24 mx-10">
            {thematics.map((thematic, index) => (
              <CardThematic
                key={index}
                thematic={thematic}
                like={most}
              />
            ))}
          </div>
        </div>
      </div>
    ) : <p className='text-white'>Loading...</p>
  );
};

export default Thematics;