import React from 'react';
import {Bids, Header, } from '../../components'


const Home = () => {

  return <div>
   <Header />
   {/* Thay các chuyên đề */}
   <Bids title="Chuyên đề nổi bật" />
  </div>;
};

export default Home;
