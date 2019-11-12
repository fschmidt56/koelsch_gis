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

//WFS load data
const datasource = new VectorSource({
    format: new GeoJSON(),
    url: function (extent) {
        return 'http://10.133.7.119/geoserver/wfs?service=wfs&version=1.1.0&' +
            'request=GetFeature&typename=bier:koelsch_test&' +
            'outputFormat=application/json&' +
            'srsname=EPSG:3857&' +
            'bbox=' + extent.join(',') +
            ',EPSG:3857';
    },
    strategy: bboxStrategy,
    geometryName: 'geom'
});

//add vectorlayer
const vectorlayer = new VectorLayer({
    source: datasource,
    style: styleKoelsch
})
//Basemap
const xyzURL = 'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const basemap = new TileLayer({
    source: new XYZSource({
        url: xyzURL
    }),
})

//create map with layers
const map = new Map({
    target: 'map',
    layers: [basemap, vectorlayer],
    view: new View({
        center: [774444.5768, 6611028.9864],
        zoom: 11
    }),
});

//fillColor koelsch
function styleFillColor(feature) {
    let sorte = feature.get('bier')
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
function styleStrokeColor(feature) {
    let sorte = feature.get('bier')
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
function styleKoelsch(feature) {
    let geom = feature.getGeometry();
    if (geom.getType() == 'Point') {
        let koelsch_style = new Style({
            image: new Circle({
                radius: 7.5,
                fill: new Fill(styleFillColor(feature)),
                stroke: new Stroke(styleStrokeColor(feature))
            })
        })
        return koelsch_style
    }
}

let selectedFeature; //placeholder for deleting, modifying
//get html elements by Id
const btnAdd = document.getElementById('addPoint');
const btnDelete = document.getElementById('deletePoint');
const btnModify = document.getElementById('modifyPoint');
const btnInfo = document.getElementById('getInfo');
const nameInput = document.getElementById('name');
const bierInput = document.getElementById('bier');
const preisInput = document.getElementById('preis');
const outputMessage = document.getElementById('output');
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('closebtn');
const sendButton = document.getElementById('sendData');
//geoserver URL for transactions
const geoserverTransactionURL = 'http://10.133.7.119/geoserver/wfs?service=wfs&version=1.1.0'
const xhr = new XMLHttpRequest()

//new select-interaction
let select = new Select({
    source: datasource,
});
map.addInteraction(select);

//new draw-interaction
let draw = new Draw({
    source: datasource,
    type: 'Point',
    geometryName: 'geom',
}); 
map.addInteraction(draw);
draw.setActive(false);

//new modify-interaction
let modify = new Modify({
    source: datasource,
}); 
map.addInteraction(modify);
modify.setActive(false);

//get name, beer, price on click
map.on("click", function (e) {
    map.forEachFeatureAtPixel(e.pixel, function showBeer(feature) {
        let name = feature.get('gastro')
        let sorte = feature.get('bier')
        let preis = feature.get('preis')
        document.getElementById("name").value = `${name}`;
        document.getElementById("bier").value = `${sorte}`;
        document.getElementById("preis").value = `${preis}`;
        btnInfo.classList.add('active');
    })
});

//prepare wfs transactions
let wfsTransaction = new WFS()
let gmlTransaction = new GML({
    featureNS: 'bier',
    featurePrefix: 'bier',
    featureType: 'koelsch_test',
    srsName: 'EPSG:3857',
    geometryName: 'geom'
})

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
    let xmlString = new XMLSerializer().serializeToString(
        wfsTransaction.writeTransaction(null, null, [selectedFeature], gmlTransaction)
    );
    xhr.open('POST', geoserverTransactionURL, true, 'admin', 'geoserver')
    xhr.setRequestHeader('Content-type', 'text/plain')
    xhr.send(xmlString)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            outputMessage.innerHTML = 'Feature was successfully deleted.';
            setTimeout(function () {
                outputMessage.innerHTML = "";
            }, 3000);
            datasource.clear();
            datasource.refresh();
        }
        else {
            outputMessage.innerHTML = 'Error: Feature was not deleted.';
            setTimeout(function () {
                outputMessage.innerHTML = "";
            }, 3000);
        }
    }
    btnDelete.classList.remove('active');
}

//add features 
function drawMethod(btn) {
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
function drawEnd(e) {
    let createdFeature = e.feature;
    showOverlay()
    sendButton.onclick = () => {
        createdFeature.set('gastro', document.getElementById('name').value);
        createdFeature.set('bier', document.getElementById('bier').value);
        createdFeature.set('preis', document.getElementById('preis').value);
        createdFeature.set('geom', createdFeature.getGeometry());
        //validate input
        if (checkInputLetters(nameInput.value) && checkInputLetters(bierInput.value) && checkInputNumbers(preisInput.value)) {
            let xmlString = new XMLSerializer().serializeToString(
                wfsTransaction.writeTransaction([createdFeature], null, null, gmlTransaction)
            )
            xhr.open('POST', geoserverTransactionURL, true, 'admin', 'geoserver');
            xhr.setRequestHeader('Content-type', 'text/plain');
            xhr.send(xmlString)
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    outputMessage.innerHTML = 'Feature was successfully created.';
                    setTimeout(function () {
                        outputMessage.innerHTML = "";
                    }, 3000);
                    datasource.clear();
                    datasource.refresh();
                }
                else {
                    outputMessage.innerHTML = 'Error: Feature was not created.';
                    setTimeout(function () {
                        outputMessage.innerHTML = "";
                    }, 3000);

                }
            }
        }
        else {
            outputMessage.innerHTML = 'Error: Feature was not created. <br>Only letters and whitespace allowed for Name and Kölsch.<br>Only numbers and decimal seperator allowed for Preis.';
            setTimeout(function () {
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
btnAdd.onclick = () => drawMethod(btnAdd, 'Point');

//modify features
select.on('select', e => {
    btnAdd.classList.remove('active');
    btnDelete.classList.add('active');
    btnModify.classList.add('active');
    btnInfo.classList.add('active');
    draw.setActive(false);
    selectedFeature = e.target.getFeatures().getArray()[0];
    if (!selectedFeature) return alert('Select a feature to modify data.');
    modify.setActive(true);
    modify.on('modifyend', e => {
        selectedFeature.getId();
        selectedFeature.setGeometryName('geom');
        let xmlString = new XMLSerializer().serializeToString(
            wfsTransaction.writeTransaction(null, [selectedFeature], null, gmlTransaction)
        );
        xhr.open('POST', geoserverTransactionURL, true, 'admin', 'geoserver')
        xhr.setRequestHeader('Content-type', 'text/plain')
        xhr.send(xmlString)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                outputMessage.innerHTML = 'Feature was successfully modified.'
                setTimeout(function () {
                    outputMessage.innerHTML = "";
                }, 3000);
                datasource.clear();
                datasource.refresh();
            }
            else {
                outputMessage.innerHTML = 'Error: Feature could not be modified.';
                setTimeout(function () {
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

btnModify.onclick = () => {
    btnModify.classList.add('active');
    btnDelete.classList.add('active');
    btnAdd.classList.remove('active');
    draw.setActive(false);
    select.setActive(true);
}

//check Input fields for letters whitespaces only
function checkInputLetters(value) {
    let x = value
    return /^[A-zäöüÄÖÜß ]+$/.test(x);
}
//check Input fields for numbers only
function checkInputNumbers(number) {
    let x = number
    return /^\d+(\.\d+)?$/.test(x);
}

//overlay
function showOverlay() {
    overlay.style.display = 'block';
}
function hideOverlay() {
    overlay.style.display = 'none';
}

closeButton.onclick = () => {
    hideOverlay();
    draw.setActive(false);
    modify.setActive(false);
    btnInfo.classList.remove('active');
}

btnInfo.onclick = () => {
    showOverlay();
    btnInfo.classList.add('active');
}
