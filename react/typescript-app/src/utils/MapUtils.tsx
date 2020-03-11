import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import vectorLayer from './vectorlayer';
import Draw from 'ol/interaction/Draw';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import { mapCenter, mapZoom, rotationStatus, baseLayerURL, geometryType, Projections } from '../config/config';
import { datasource } from './vectorlayer';
import { styleKoelschSelected, routeStyle, locationsIcon } from './FeatureStyles';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

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

    static createVectorLine(source: VectorSource) {
        const vectorLayer: VectorLayer = new VectorLayer({
            source: source,
            style: routeStyle
        });
        return vectorLayer;
    }

    static createVectorPoint(source: VectorSource) {
        const vectorLayer: VectorLayer = new VectorLayer({
            source: source,
            style: locationsIcon
        });
        return vectorLayer;
    }

    static createVectorSource(data: GeoJSON) {
        const vectorSource: VectorSource = new VectorSource({
            format: new GeoJSON({
                dataProjection: Projections.EPSG_4326,
                featureProjection: Projections.EPSG_3857
            })
        });
        let geoJsonData = new GeoJSON({
            dataProjection: Projections.EPSG_4326,
            featureProjection: Projections.EPSG_3857
        });
        let features = geoJsonData.readFeatures(data);
        vectorSource.addFeatures(features);
        return vectorSource;
    }
}
