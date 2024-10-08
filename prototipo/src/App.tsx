import React from 'react';
import VideoFeed from './components/VideoFeed';
import DataDisplay from './components/DataDisplay';
import './styles/global.css'; // Importe o arquivo CSS global

const App: React.FC = () => {
  return (
    <div className="container"> 
      <VideoFeed />
      <DataDisplay />
    </div>
  );
};

export default App;