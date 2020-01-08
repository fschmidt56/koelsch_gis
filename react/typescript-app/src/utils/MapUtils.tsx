import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import vectorLayer from './vectorlayer';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify'
import { mapCenter, mapZoom, rotationStatus, baseLayerURL } from '../config/config';
import { datasource } from './vectorlayer';

export class MapUtils {
    static createBaseLayer() {
        const xyzURL: string = baseLayerURL;
        const baseSource: XYZSource = new XYZSource({
            url: xyzURL
        });
        const baseLayer: TileLayer = new TileLayer({
            source: baseSource
        });

        return baseLayer;
    }

    static createMap() {
        const baseLayer = this.createBaseLayer();

        const map = new Map({
            target: 'map',
            layers: [baseLayer, vectorLayer],
            view: new View({
                center: mapCenter,
                zoom: mapZoom,
                enableRotation: rotationStatus,
            })
        });
          return map;
    }

    static createSelect() {
        const select: Select = new Select();
        return select;
    }

    static createModify() {
        const modify: Modify = new Modify({
            source: datasource,
        });
        return modify;
    }
}