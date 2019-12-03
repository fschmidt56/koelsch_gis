import 'ol/ol.css';
import { Map, View, Feature, MapBrowserEvent } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import Select, { SelectEvent } from 'ol/interaction/Select'
import Modify, { ModifyEvent } from 'ol/interaction/Modify';
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import WFS from 'ol/format/WFS';
import { Circle, Style, Stroke, Fill } from 'ol/style';
import GeometryType from 'ol/geom/GeometryType';
import { FeatureLike } from 'ol/Feature';
import RenderFeature from 'ol/render/Feature';
import { pushParseAndPop } from 'ol/xml';

const typenameLayer: string = 'bier:preisfilter';
let viewParamLow = (document.getElementById('minPreis') as HTMLInputElement).min;
let viewParamHigh = (document.getElementById('maxPreis') as HTMLInputElement).max;

//WFS load data
const datasource: VectorSource = new VectorSource({
    format: new GeoJSON(),
    url: function (extent: number[]) {
        return `${geoserverTransactionURL}
            &request=GetFeature&typename=${typenameLayer}
            &outputFormat=application/json
            &srsname=EPSG:3857
            &bbox=${extent.join(',')}
            ,EPSG:3857&viewparams=low:${viewParamLow};high:${viewParamHigh};`;
    },
    strategy: bboxStrategy,
});

//add vectorlayer
const vectorlayer: VectorLayer = new VectorLayer({
    source: datasource,
    style: styleKoelsch
});

//Basemap
const xyzURL: string = 'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const baselayer: XYZSource = new XYZSource({
    url: xyzURL
});
const basemap: TileLayer = new TileLayer({
    source: baselayer
});

//create map with layers
const map: Map = new Map({
    target: 'map',
    layers: [basemap, vectorlayer],
    view: new View({
        center: [774444.5768, 6611028.9864],
        zoom: 11,
        enableRotation: false
    }),
});

interface fillColor<T> {
    color: T,
}

interface strokeColor<T, U> {
    color: T,
    width: U,
}

//fillColor koelsch
function styleFillColor(feature: FeatureLike): fillColor< string > {
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
function styleStrokeColor(feature: FeatureLike): strokeColor< string, number > {
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

let selectedFeature: Feature; //placeholder for deleting, modifying
//get html elements by Id
const btnAdd = (document.getElementById('addPoint') as HTMLTextAreaElement);
const btnDelete = (document.getElementById('deletePoint') as HTMLTextAreaElement);
const btnModify = (document.getElementById('modifyPoint') as HTMLTextAreaElement);
const btnInfo = (document.getElementById('getInfo') as HTMLTextAreaElement);
const nameInput = (document.getElementById('name') as HTMLTextAreaElement);
const bierInput = (document.getElementById('bier') as HTMLTextAreaElement);
const preisInput = (document.getElementById('preis') as HTMLTextAreaElement);
const outputMessage = (document.getElementById('output') as HTMLTextAreaElement);
const overlay = (document.getElementById('overlay') as HTMLTextAreaElement);
const closeButton = (document.getElementById('closebtn') as HTMLTextAreaElement);
const sendButton = (document.getElementById('sendData') as HTMLTextAreaElement);
//geoserver URL for transactions
const geoserverTransactionURL: string = 'http://10.133.7.119/geoserver/wfs?service=wfs&version=1.1.0'
const xhr: XMLHttpRequest = new XMLHttpRequest()

interface CredentialsGeoserver< T > {
    username: T,
    password: T
}

interface TransactionsGeoserver< T, U > {
    featureNS: T,
    featurePrefix: T,
    featureType: T,
    nativeElements: U,
    srsName: T,
}

const credentials: CredentialsGeoserver< string > = {
    username: 'admin',
    password: 'geoserver'
};

const transactionParameters: TransactionsGeoserver< string, object[] > = {
    featureNS: 'bier',
    featurePrefix: 'bier',
    featureType: typenameLayer,
    nativeElements: [],
    srsName: 'EPSG:3857',
};

const geometryType: GeometryType = GeometryType.POINT;

//new select-interaction
let select: Select = new Select({
});
map.addInteraction(select);
select.setActive(false);

//new draw-interaction
let draw: Draw = new Draw({
    source: datasource,
    type: geometryType,
    geometryName: 'geom'
});
map.addInteraction(draw);
draw.setActive(false);

//new modify-interaction
let modify: Modify = new Modify({
    source: datasource,
});
map.addInteraction(modify);
modify.setActive(false);

//get name, beer, price on click
map.on('click', function (e: MapBrowserEvent): void {
    map.forEachFeatureAtPixel(e.pixel, function showBeer(feature: FeatureLike): void {
        let name: string = feature.get('gastro')
        let sorte: string = feature.get('bier')
        let preis: string = feature.get('preis')
        nameInput.value = `${name}`;
        bierInput.value = `${sorte}`;
        preisInput.value = `${preis}`;
        btnInfo.classList.add('active');
    })
});

//prepare wfs transactions
const wfsTransaction: WFS = new WFS()

//delete features
btnDelete.onclick = () => {
    modify.setActive(false);
    select.setActive(false);
    btnModify.classList.remove('active');
    btnAdd.classList.remove('active');
    btnInfo.classList.remove('active');
    btnDelete.classList.add('active');
    if (!selectedFeature) return 'No feature selected.';
    //if feature is selected send xmlString to delete it
    let xmlString: string = new XMLSerializer().serializeToString(
        wfsTransaction.writeTransaction([], [], [selectedFeature], transactionParameters)
    );
    xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password)
    xhr.setRequestHeader('Content-type', 'text/plain')
    xhr.send(xmlString)
    xhr.onreadystatechange = function (): void {
        if (xhr.readyState === 4 && xhr.status === 200) {
            outputMessage.innerHTML = 'Feature was successfully deleted.';
            setTimeout(function (): void {
                outputMessage.innerHTML = "";
            }, 3000);
            datasource.clear();
            datasource.refresh();
        }
        else {
            outputMessage.innerHTML = 'Error: Feature was not deleted.';
            setTimeout(function (): void {
                outputMessage.innerHTML = "";
            }, 3000);
        }
    }
    btnDelete.classList.remove('active');
}

//add features 
function drawMethod(): void {
    modify.setActive(false);
    select.setActive(false);
    draw.setActive(true);
    btnInfo.classList.remove('active');
    btnDelete.classList.remove('active');
    btnModify.classList.remove('active');
    btnAdd.classList.add('active');
    draw.on('drawend', drawEnd);
}

//handle created features
function drawEnd(e: DrawEvent): void {
    let createdFeature: Feature = e.feature;
    showOverlay()
    sendButton.onclick = (): void => {
        createdFeature.set('gastro', nameInput.value);
        createdFeature.set('bier', bierInput.value);
        createdFeature.set('preis', preisInput.value);
        createdFeature.set('geom', createdFeature.getGeometry());
        //validate input
        if (checkInputLetters(nameInput.value) && checkInputLetters(bierInput.value) && checkInputNumbers(preisInput.value)) {
            let xmlString = new XMLSerializer().serializeToString(
                wfsTransaction.writeTransaction([createdFeature], [], [], transactionParameters)
            )
            xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password);
            xhr.setRequestHeader('Content-type', 'text/plain');
            xhr.send(xmlString)
            xhr.onreadystatechange = function (): void {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    outputMessage.innerHTML = 'Feature was successfully created.';
                    setTimeout(function (): void {
                        outputMessage.innerHTML = "";
                    }, 3000);
                    datasource.clear();
                    datasource.refresh();
                }
                else {
                    outputMessage.innerHTML = 'Error: Feature was not created.';
                    setTimeout(function (): void {
                        outputMessage.innerHTML = "";
                    }, 3000);

                }
            }
        }
        else {
            outputMessage.innerHTML = 'Error: Feature was not created. <br>Only letters and whitespace allowed for Name and Kölsch.<br>Only numbers and decimal seperator allowed for Preis.';
            setTimeout(function (): void {
                outputMessage.innerHTML = "";
            }, 5000);
        }
        btnAdd.classList.remove('active');
        draw.setActive(false);
        modify.setActive(false);
        nameInput.value = '';
        bierInput.value = '';
        preisInput.value = '';
        hideOverlay();
    }
}

//add method to button
btnAdd.onclick = () => drawMethod();

//modify features
select.on('select', (e: SelectEvent) => {
    btnAdd.classList.remove('active');
    btnDelete.classList.add('active');
    btnModify.classList.add('active');
    btnInfo.classList.add('active');
    draw.setActive(false);
    selectedFeature = e.target.getFeatures().getArray()[0];
    if (!selectedFeature) return alert('Select a feature to modify data.');
    modify.setActive(true);
    modify.on('modifyend', (e: ModifyEvent) => {
        selectedFeature.getId();
        selectedFeature.setGeometryName('geom');
        let xmlString = new XMLSerializer().serializeToString(
            wfsTransaction.writeTransaction([], [selectedFeature], [], transactionParameters)
        );
        xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password)
        xhr.setRequestHeader('Content-type', 'text/plain')
        xhr.send(xmlString)
        xhr.onreadystatechange = function (): void {
            if (xhr.readyState === 4 && xhr.status === 200) {
                outputMessage.innerHTML = 'Feature was successfully modified.'
                setTimeout(function (): void {
                    outputMessage.innerHTML = "";
                }, 3000);
                datasource.clear();
                datasource.refresh();
            }
            else {
                outputMessage.innerHTML = 'Error: Feature could not be modified.';
                setTimeout(function (): void {
                    outputMessage.innerHTML = "";
                }, 3000);
            }
        }
        modify.setActive(false);
        select.setActive(false);
        btnDelete.classList.remove('active');
        btnModify.classList.remove('active');
        btnInfo.classList.remove('active');
    })
});

btnModify.onclick = (): void => {
    btnModify.classList.add('active');
    btnDelete.classList.add('active');
    btnAdd.classList.remove('active');
    draw.setActive(false);
    select.setActive(true);
}

//check Input fields for letters whitespaces only
function checkInputLetters(value: string): boolean {
    return /^[A-zäöüÄÖÜß ]+$/.test(value);
}
//check Input fields for numbers only
function checkInputNumbers(number: string): boolean {
    return /^\d+(\.\d+)?$/.test(number);
}

//overlay
function showOverlay(): void {
    overlay.style.display = 'block';
}
function hideOverlay(): void {
    overlay.style.display = 'none';
}

closeButton.onclick = (): void => {
    hideOverlay();
    draw.setActive(false);
    modify.setActive(false);
    btnInfo.classList.remove('active');
}

btnInfo.onclick = (): void => {
    showOverlay();
    btnAdd.classList.remove('active');
    btnModify.classList.remove('active');
    btnDelete.classList.remove('active');
    btnInfo.classList.add('active');
}

function filterByPrice(): void {
    viewParamLow = (document.getElementById('minPreis') as HTMLInputElement).value ;
    viewParamHigh = (document.getElementById('maxPreis') as HTMLInputElement).value;
    datasource.clear();
    datasource.refresh();
}

const minPreisSlider:HTMLElement = document.getElementById('minPreis') as HTMLTextAreaElement;
minPreisSlider.onchange = filterByPrice;

const maxPreisSlider:HTMLElement = document.getElementById('maxPreis') as HTMLTextAreaElement;
maxPreisSlider.onchange = filterByPrice;
