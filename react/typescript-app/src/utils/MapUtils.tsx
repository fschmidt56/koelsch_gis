import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import vectorLayer from './vectorlayer';
import Draw from 'ol/interaction/Draw';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import { mapCenter, mapZoom, rotationStatus, baseLayerURL, geometryType } from '../config/config';
import { datasource } from './vectorlayer';
import { styleKoelschSelected } from './FeatureStyles';

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
        const select: Select = new Select({
            style: styleKoelschSelected
        });
        return select;
    }

    static createModify() {
        const modify: Modify = new Modify({
            source: datasource,
            style: styleKoelschSelected
        });
        return modify;
    }

    static createDraw() {
        const draw: Draw = new Draw({
            source: datasource,
            type: geometryType,
            geometryName: 'geom',
        });
        return draw;
    }
}
