import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import styleKoelsch from '../utils/FeatureStyles';
import {geoserverTransactionURL, typenameLayer} from '../config/config'

export let datasource: VectorSource | undefined = undefined;
if (!datasource) {
//WFS load data
  datasource = new VectorSource({
    format: new GeoJSON(),
    url: function (extent: number[]) {
      return `${geoserverTransactionURL}
        &request=GetFeature&typename=${typenameLayer}
        &outputFormat=application/json
        &srsname=EPSG:3857&bbox=${extent.join(',')},EPSG:3857`;
    },
    strategy: bboxStrategy,
  });
}

//add vectorlayer
const vectorLayer: VectorLayer = new VectorLayer({
  source: datasource,
  style: styleKoelsch
});

export default vectorLayer;