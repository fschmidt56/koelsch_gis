import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';

import vectorlayer from './vectorlayer';

export class MapUtils {
    static createBaseLayer() {
        const xyzURL: string = 'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
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
            layers: [baseLayer, vectorlayer],
            view: new View({
                center: [774444.5768, 6611028.9864],
                zoom: 11,
                enableRotation: false,
            })
        });

        return map;
    }
}