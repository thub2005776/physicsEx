import React from 'react';

const YoutubePlayer = ({ videoId }) => {
  return (
   <iframe 
    title={videoId} 
    width={480}
    height={300}
    src={`https://www.youtube.com/embed/${videoId}`}
    allowFullScreen="allowfullscreen" 
    >
    </iframe>
  );
};

export default YoutubePlayer;