import { observable, action } from 'mobx';
import { MapState, BasemapState } from '../types/interfaces';
import { MapUtils } from '../utils/MapUtils';

export class MapStore implements MapState {
    @observable map: BasemapState = null;
    
    @action setMap = () => {
        const basemap = MapUtils.createMap()
        this.map = basemap
    }
};
