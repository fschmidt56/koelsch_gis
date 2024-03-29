import React from 'react';
import './App.css';
import 'ol/ol.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Basemap from './redux/Components/Basemap_Redux';

const App: React.FC = (): JSX.Element => {
  return (
    <div className='map' data-testid='map'>
        <Basemap />
    </div>
  );
}

export default App;
