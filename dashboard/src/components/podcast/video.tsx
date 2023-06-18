import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { AspectRatio } from "@/components/ui/aspect-ratio"


export interface YoutubeEmbedProps 
{
  embedId: string;
}

const YoutubeEmbed = ({ embedId }: YoutubeEmbedProps)  => {
  const [showVideo, setShowVideo] = useState(true);

  const handleButtonClick = () => {
    setShowVideo(true);
  };

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
        <AspectRatio className="flex flex-col items-center justify-center bg-muted py-4" ratio={16 / 9}>
            <YouTube videoId={embedId} opts={opts} />
        </AspectRatio>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;