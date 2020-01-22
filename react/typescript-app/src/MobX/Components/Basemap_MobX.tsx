import React, { useEffect } from 'react';
import 'ol/ol.css';
import ButtonGroup from './ButtonGroup_MobX'
import { MapProps } from '../../types/interfaces';
import { stores } from '../stores/stores';
import { observer } from 'mobx-react-lite';

const Basemap = observer((props: MapProps) => {

    const { map, setMap } = stores.mapStore

    useEffect(() => {
        setMap()
    }, [setMap]);

    return (
        <>
            <div id='map' className='map' ></div>
            <ButtonGroup map={map} />
        </>
    )
});

export default Basemap;

