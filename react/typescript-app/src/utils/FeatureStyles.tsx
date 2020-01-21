import { FeatureLike } from 'ol/Feature';
import { Circle, Style, Stroke, Fill } from 'ol/style';
import {fillColor, strokeColor} from '../types/interfaces';

//fillColor koelsch
function styleFillColor(feature: FeatureLike): fillColor<string> {
  let sorte: string = feature.get('bier')
  switch (sorte) {
    case 'Dom': return { color: '#d42426' };
    case 'Früh': return { color: '#ffffff' };
    case 'Gaffel': return { color: '#001f46' };
    case 'Ganser': return { color: '#ffffff' };
    case 'Gilden': return { color: '#01603a' };
    case 'Hellers': return { color: '#ffffff' };
    case 'Mühlen': return { color: '#18872a' };
    case 'Päffgen': return { color: '#ffffff' };
    case 'Peters': return { color: '#db0a07' };
    case 'Reissdorf': return { color: '#cc000b' };
    case 'Schmitz': return { color: '#ffffff' };
    case 'Schreckenskammer': return { color: '#ffffff' };
    case 'Sion': return { color: '#ffffff' };
    case 'Sünner': return { color: '#f6e494' };
    case 'Zunft': return { color: '#017b5d' };
    default: return { color: '#474749' };
  }
}

//strokeColor koelsch
function styleStrokeColor(feature: FeatureLike): strokeColor<string, number> {
  let sorte: string = feature.get('bier')
  switch (sorte) {
    case 'Dom': return { color: '#8c1918', width: 3 };
    case 'Früh': return { color: '#e4011e', width: 3 };
    case 'Gaffel': return { color: '#e1b54f', width: 3 };
    case 'Ganser': return { color: '#d4b36e', width: 3 };
    case 'Gilden': return { color: '#b5832f', width: 3 };
    case 'Hellers': return { color: '#bb5a63', width: 3 };
    case 'Mühlen': return { color: '#232323', width: 3 };
    case 'Päffgen': return { color: '#2a5130', width: 3 };
    case 'Peters': return { color: '#eeedb6', width: 3 };
    case 'Reissdorf': return { color: '#977112', width: 3 };
    case 'Schmitz': return { color: '#232323', width: 3 };
    case 'Schreckenskammer': return { color: '#922743', width: 3 };
    case 'Sion': return { color: '#002245', width: 3 };
    case 'Sünner': return { color: '#007527', width: 3 };
    case 'Zunft': return { color: '#232323', width: 3 };
    default: return { color: '#d3d3d3', width: 3 };
  }
}

//style geometries
function styleKoelsch(feature: FeatureLike): Style {
  let koelsch_style: Style = new Style({
    image: new Circle({
      radius: feature.get('selected') ? 12 : 7.5,
      fill: new Fill(styleFillColor(feature)),
      stroke: new Stroke(styleStrokeColor(feature))
    })
  })
  return koelsch_style;
}

export default styleKoelsch;

export function styleKoelschSelected(feature: FeatureLike) {
  let koelsch_style_selected: Style = new Style({
    image: new Circle({
      radius: 12,
      fill: new Fill(styleFillColor(feature)),
      stroke: new Stroke(styleStrokeColor(feature))
    })
  })
  return koelsch_style_selected;
}