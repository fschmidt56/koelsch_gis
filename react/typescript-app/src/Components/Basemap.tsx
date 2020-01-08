import React from 'react';
import 'ol/ol.css';
import DrawPoints from './Draw';
import ModifyPoints from './Modify';
import DeletePoints from './Delete';
import ShowInfo from './ShowInfo';
import { MapUtils } from '../utils/MapUtils';
import { MapProps, MapState } from '../types/interfaces';

class Basemap extends React.Component<MapProps, MapState> {
    constructor(props: MapProps) {
        super(props);

        this.state = {
            map: null,
            activeButton: undefined,
        }
    }

    componentDidMount() {
        const map = MapUtils.createMap();
        this.setState({
            map,
        });

    }

    render() {
        return (
            <>
                <div id='map' className='map' ></div>
                <div className='ButtonGroup'> {/* new Component for group of buttons*/}
                    <DrawPoints
                        map={this.state.map}
                        isActive={this.state.activeButton === 'draw'}
                        onActiveChange={(status: boolean) => {
                            this.setState({
                                activeButton: status ? 'draw' : undefined,
                            })
                        }}
                    />
                    <ModifyPoints
                        map={this.state.map}
                        isActive={this.state.activeButton === 'modify'}
                        onActiveChange={(status: boolean) => {
                            this.setState({
                                activeButton: status ? 'modify' : undefined
                            })
                        }}
                    />
                    <DeletePoints
                        map={this.state.map}
                        isActive={this.state.activeButton === 'delete'}
                        onActiveChange={(status: boolean) => {
                            this.setState({
                                activeButton: status ? 'delete' : undefined
                            })
                        }}
                    />
                    <ShowInfo 
                    map={this.state.map}
                    />
                </div>
            </>
        )
    }

}

export default Basemap;