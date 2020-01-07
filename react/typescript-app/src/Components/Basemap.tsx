import React from 'react';
import 'ol/ol.css';
import { Map } from 'ol';
import DrawPoints from './Draw';
import ModifyPoints from './Modify';
import DeletePoints from './Delete';
import Overlay from './Overlay_neu';
import { MapUtils } from '../utils/MapUtils';

interface MapProps {
}

interface MapState {
    map: Map | null;
}

class Basemap extends React.Component<MapProps, MapState> {
    constructor(props: MapProps) {
        super(props);

        this.state = {
            map: null,
        }
    } 

    componentDidMount() {
        const map = MapUtils.createMap();

        this.setState({
            map
        });
    }

    render() {
        return (
            <>
                <div id='map' className='map' ></div>
                <div className='ButtonGroup'>
                    <DrawPoints map={this.state.map} />
                    <ModifyPoints map={this.state.map} />
                    <DeletePoints map={this.state.map} />
                    <Overlay map={this.state.map} />
                </div>
                <div id='output'></div>
            </>
        )
    }

}

export default Basemap;