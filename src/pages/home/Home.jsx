import React from 'react';
import {Bids, Header, } from '../../components'


const Home = ({thematics, exercises}) => {

  return <div>
   <Header />
   {/* Thay các chuyên đề */}
   <Bids title="Chuyên đề nổi bật" thematics={thematics} exercises={exercises}/>
  </div>;
};

export default Home;
