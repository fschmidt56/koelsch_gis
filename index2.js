"use strict";
exports.__esModule = true;
require("ol/ol.css");
var ol_1 = require("ol");
var Tile_1 = require("ol/layer/Tile");
var XYZ_1 = require("ol/source/XYZ");
var Vector_1 = require("ol/source/Vector");
var layer_1 = require("ol/layer");
var GeoJSON_1 = require("ol/format/GeoJSON");
var loadingstrategy_1 = require("ol/loadingstrategy");
var Select_1 = require("ol/interaction/Select");
var Modify_1 = require("ol/interaction/Modify");
var Draw_1 = require("ol/interaction/Draw");
var WFS_1 = require("ol/format/WFS");
var style_1 = require("ol/style");
var GeometryType_1 = require("ol/geom/GeometryType");
var typenameLayer = 'bier:koelsch_test';
var viewParamLow = document.getElementById('minPreis').min;
var viewParamHigh = document.getElementById('maxPreis').max;
//WFS load data
var datasource = new Vector_1["default"]({
    format: new GeoJSON_1["default"](),
    url: function (extent) {
        return geoserverTransactionURL + "\n            &request=GetFeature&typename=" + typenameLayer + "\n            &outputFormat=application/json\n            &srsname=EPSG:3857\n            &bbox=" + extent.join(',') + "\n            ,EPSG:3857&viewparams=low:" + viewParamLow + ";high:" + viewParamHigh + ";";
    },
    strategy: loadingstrategy_1.bbox
});
//add vectorlayer
var vectorlayer = new layer_1.Vector({
    source: datasource,
    style: styleKoelsch
});
//Basemap
var xyzURL = 'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
var baselayer = new XYZ_1["default"]({
    url: xyzURL
});
var basemap = new Tile_1["default"]({
    source: baselayer
});
//create map with layers
var map = new ol_1.Map({
    target: 'map',
    layers: [basemap, vectorlayer],
    view: new ol_1.View({
        center: [774444.5768, 6611028.9864],
        zoom: 11,
        enableRotation: false
    })
});
//fillColor koelsch
function styleFillColor(feature) {
    var sorte = feature.get('bier');
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
    var sorte = feature.get('bier');
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
    var koelsch_style = new style_1.Style({
        image: new style_1.Circle({
            radius: 7.5,
            fill: new style_1.Fill(styleFillColor(feature)),
            stroke: new style_1.Stroke(styleStrokeColor(feature))
        })
    });
    return koelsch_style;
}
var selectedFeature; //placeholder for deleting, modifying
//get html elements by Id
var btnAdd = document.getElementById('addPoint');
var btnDelete = document.getElementById('deletePoint');
var btnModify = document.getElementById('modifyPoint');
var btnInfo = document.getElementById('getInfo');
var nameInput = document.getElementById('name');
var bierInput = document.getElementById('bier');
var preisInput = document.getElementById('preis');
var outputMessage = document.getElementById('output');
var overlay = document.getElementById('overlay');
var closeButton = document.getElementById('closebtn');
var sendButton = document.getElementById('sendData');
//geoserver URL for transactions
var geoserverTransactionURL = 'http://10.133.7.119/geoserver/wfs?service=wfs&version=1.1.0';
var xhr = new XMLHttpRequest();
var credentials = {
    username: 'admin',
    password: 'geoserver'
};
var transactionParameters = {
    featureNS: 'bier',
    featurePrefix: 'bier',
    featureType: typenameLayer,
    nativeElements: [],
    srsName: 'EPSG:3857'
};
var geometryType = GeometryType_1["default"].POINT;
//new select-interaction
var select = new Select_1["default"]({});
map.addInteraction(select);
select.setActive(false);
//new draw-interaction
var draw = new Draw_1["default"]({
    source: datasource,
    type: geometryType,
    geometryName: 'geom'
});
map.addInteraction(draw);
draw.setActive(false);
//new modify-interaction
var modify = new Modify_1["default"]({
    source: datasource
});
map.addInteraction(modify);
modify.setActive(false);
//get name, beer, price on click
map.on('click', function (e) {
    map.forEachFeatureAtPixel(e.pixel, function showBeer(feature) {
        var name = feature.get('gastro');
        var sorte = feature.get('bier');
        var preis = feature.get('preis');
        nameInput.value = "" + name;
        bierInput.value = "" + sorte;
        preisInput.value = "" + preis;
        btnInfo.classList.add('active');
    });
});
//prepare wfs transactions
var wfsTransaction = new WFS_1["default"]();
//delete features
btnDelete.onclick = function () {
    modify.setActive(false);
    select.setActive(false);
    btnModify.classList.remove('active');
    btnAdd.classList.remove('active');
    btnInfo.classList.remove('active');
    btnDelete.classList.add('active');
    if (!selectedFeature)
        return 'No feature selected.';
    //if feature is selected send xmlString to delete it
    var xmlString = new XMLSerializer().serializeToString(wfsTransaction.writeTransaction([], [], [selectedFeature], transactionParameters));
    xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.send(xmlString);
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
    };
    btnDelete.classList.remove('active');
};
//add features 
function drawMethod() {
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
    var createdFeature = e.feature;
    showOverlay();
    sendButton.onclick = function () {
        createdFeature.set('gastro', nameInput.value);
        createdFeature.set('bier', bierInput.value);
        createdFeature.set('preis', preisInput.value);
        createdFeature.set('geom', createdFeature.getGeometry());
        //validate input
        if (checkInputLetters(nameInput.value) && checkInputLetters(bierInput.value) && checkInputNumbers(preisInput.value)) {
            var xmlString = new XMLSerializer().serializeToString(wfsTransaction.writeTransaction([createdFeature], [], [], transactionParameters));
            xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password);
            xhr.setRequestHeader('Content-type', 'text/plain');
            xhr.send(xmlString);
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
            };
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
    };
}
//add method to button
btnAdd.onclick = function () { return drawMethod(); };
//modify features
select.on('select', function (e) {
    btnAdd.classList.remove('active');
    btnDelete.classList.add('active');
    btnModify.classList.add('active');
    btnInfo.classList.add('active');
    draw.setActive(false);
    selectedFeature = e.target.getFeatures().getArray()[0];
    if (!selectedFeature)
        return alert('Select a feature to modify data.');
    modify.setActive(true);
    modify.on('modifyend', function (e) {
        selectedFeature.getId();
        selectedFeature.setGeometryName('geom');
        var xmlString = new XMLSerializer().serializeToString(wfsTransaction.writeTransaction([], [selectedFeature], [], transactionParameters));
        xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password);
        xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.send(xmlString);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                outputMessage.innerHTML = 'Feature was successfully modified.';
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
        };
        modify.setActive(false);
        select.setActive(false);
        btnDelete.classList.remove('active');
        btnModify.classList.remove('active');
        btnInfo.classList.remove('active');
    });
});
btnModify.onclick = function () {
    btnModify.classList.add('active');
    btnDelete.classList.add('active');
    btnAdd.classList.remove('active');
    draw.setActive(false);
    select.setActive(true);
};
//check Input fields for letters whitespaces only
function checkInputLetters(value) {
    return /^[A-zäöüÄÖÜß ]+$/.test(value);
}
//check Input fields for numbers only
function checkInputNumbers(number) {
    return /^\d+(\.\d+)?$/.test(number);
}
//overlay
function showOverlay() {
    overlay.style.display = 'block';
}
function hideOverlay() {
    overlay.style.display = 'none';
}
closeButton.onclick = function () {
    hideOverlay();
    draw.setActive(false);
    modify.setActive(false);
    btnInfo.classList.remove('active');
};
btnInfo.onclick = function () {
    showOverlay();
    btnAdd.classList.remove('active');
    btnModify.classList.remove('active');
    btnDelete.classList.remove('active');
    btnInfo.classList.add('active');
};
function filterByPrice() {
    viewParamLow = document.getElementById('minPreis').value;
    viewParamHigh = document.getElementById('maxPreis').value;
    datasource.clear();
    datasource.refresh();
}
var minPreisSlider = document.getElementById('minPreis');
minPreisSlider.onchange = filterByPrice;
var maxPreisSlider = document.getElementById('maxPreis');
maxPreisSlider.onchange = filterByPrice;
