import { FeatureLike } from 'ol/Feature';
import { Circle, Style, Stroke, Fill } from 'ol/style';

interface fillColor<T> {
  color: T,
}

interface strokeColor<T, U> {
  color: T,
  width: U,
}

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
    case 'Dom': return { color: '#8c1918', width: 2 };
    case 'Früh': return { color: '#e4011e', width: 2 };
    case 'Gaffel': return { color: '#e1b54f', width: 2 };
    case 'Ganser': return { color: '#d4b36e', width: 2 };
    case 'Gilden': return { color: '#b5832f', width: 2 };
    case 'Hellers': return { color: '#bb5a63', width: 2 };
    case 'Mühlen': return { color: '#232323', width: 2 };
    case 'Päffgen': return { color: '#2a5130', width: 2 };
    case 'Peters': return { color: '#eeedb6', width: 2 };
    case 'Reissdorf': return { color: '#977112', width: 2 };
    case 'Schmitz': return { color: '#232323', width: 2 };
    case 'Schreckenskammer': return { color: '#922743', width: 2 };
    case 'Sion': return { color: '#002245', width: 2 };
    case 'Sünner': return { color: '#007527', width: 2 };
    case 'Zunft': return { color: '#232323', width: 2 };
    default: return { color: '#d3d3d3', width: 2 };
  }
}

//style geometries
function styleKoelsch(feature: FeatureLike): Style {
  let koelsch_style: Style = new Style({
    image: new Circle({
      radius: 7.5,
      fill: new Fill(styleFillColor(feature)),
      stroke: new Stroke(styleStrokeColor(feature))
    })
  })
  return koelsch_style;
}

export default styleKoelsch;