import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import ButtonGroup from './ButtonGroup'
import { MapUtils } from '../utils/MapUtils';
import { MapProps, BasemapState } from '../types/interfaces';

const Basemap = (props: MapProps) => {

    const [map, setMap] = useState<BasemapState>(null)
    const [activeButton] = useState(undefined)

    useEffect(() => {
        const basemap = MapUtils.createMap();
        setMap(basemap);
    }, []);

    return (
        <>
            <div id='map' className='map' ></div>
            <ButtonGroup map={map} />
        </>
    )
}

export default Basemap;

