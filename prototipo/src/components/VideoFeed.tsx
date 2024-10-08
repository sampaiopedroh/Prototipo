import React, { useRef, useEffect } from 'react';
import '../styles/VideoFeed.css';

const VideoFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Aguarde o vídeo carregar os metadados para definir o loop
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.loop = true; 
      });
    }
  }, []); 

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted className="video-player">
  <source src="/video.mp4" type="video/mp4" />  
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );
};

export default VideoFeed;