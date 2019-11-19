import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import Select from 'ol/interaction/Select'
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import WFS from 'ol/format/WFS';
import GML from 'ol/format/GML';
import { Circle, Style, Stroke, Fill } from 'ol/style';
