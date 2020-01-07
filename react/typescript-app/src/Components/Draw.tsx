import React from 'react';
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import { Map, Feature, } from 'ol';
import Button from './Button';
import GeometryType from 'ol/geom/GeometryType';
import { datasource } from '../utils/vectorlayer';
import { checkInputLetters, checkInputNumbers } from '../utils/validateInput';
import { credentials, transactionParameters, wfsTransaction, geoserverTransactionURL, xhr } from '../config/config';

interface DrawProps {
    map: Map | null;
}

const DrawPoints = (props: DrawProps): JSX.Element => {

    const geometryType: GeometryType = GeometryType.POINT;

    let draw: Draw = new Draw({
        source: datasource,
        type: geometryType,
        geometryName: 'geom',
    });

    if (props.map) {
        props.map.addInteraction(draw);
        draw.setActive(false);
    }

    function handleDraw() {
        draw.setActive(!draw.getActive());
        let drawButton = document.getElementById('drawButton');
        if (draw.getActive()) {
            drawButton!.classList.add('active');
        }
        else { drawButton!.classList.remove('active') }
        draw.on('drawend', drawEnd);

        function drawEnd(e: DrawEvent): void {
            let createdFeature: Feature = e.feature;
            let sendButton = (document.getElementById('sendData') as HTMLTextAreaElement);
            const nameInput = (document.getElementById('name') as HTMLTextAreaElement);
            const bierInput = (document.getElementById('bier') as HTMLTextAreaElement);
            const preisInput = (document.getElementById('preis') as HTMLTextAreaElement);
            const outputMessage = (document.getElementById('output') as HTMLTextAreaElement);
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
                            datasource!.clear();
                            datasource!.refresh();
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

                draw.setActive(false);
                drawButton!.classList.remove('active');
                nameInput.value = '';
                bierInput.value = '';
                preisInput.value = '';
            }
        }
    }

    return (
        <Button
            id='drawButton'
            className='Button'
            fai='fa fa-map-marker fa-2x'
            onClick={handleDraw}
        />
    )
}

export default DrawPoints;