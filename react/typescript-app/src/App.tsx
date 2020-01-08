import React from 'react';
import './App.css';
import 'ol/ol.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Basemap from './Components/Basemap';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="map">
      <Basemap />
    </div>
  );
}

export default App;
