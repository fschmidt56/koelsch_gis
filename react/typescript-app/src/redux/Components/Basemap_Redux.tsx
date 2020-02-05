import React, { useEffect } from 'react';
import 'ol/ol.css';
import ButtonGroup from '../../redux/Components/ButtonGroup_Redux'
import { MapUtils } from '../../utils/MapUtils';
import { MapProps } from '../../types/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setMap } from '../actions/setMapAction';
import { RootState } from '../stores/store';

const Basemap = (props: MapProps) => {

    const map = useSelector((state: RootState) => state.currentMapState.map)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMap(MapUtils.createMap()))
    }, [dispatch]);
    return (
        <>
            <div id='map' className='map' data-testid='basemap'></div>
            <ButtonGroup map={map} />
        </>
    )
}

export default Basemap;

