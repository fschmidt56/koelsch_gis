import React, { useState, useEffect } from 'react';
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import { Feature, } from 'ol';
import Button from './Button';
import { datasource } from '../utils/vectorlayer';
import { checkInputLetters, checkInputNumbers, refreshData } from '../utils/otherFunctions';
import { requestHeaders, transactionParameters, wfsTransaction, geoserverTransactionURL, geometryType } from '../config/config';
import { DrawProps } from '../types/interfaces';
import Overlay from './Overlay_neu';

let draw: Draw = new Draw({
    source: datasource,
    type: geometryType,
    geometryName: 'geom',
});

const DrawPoints = (props: DrawProps): JSX.Element => {
   
    const [style, setStyle] = useState({ width: '0%' })
    
    const {
        isActive,
        map,
    } = props;
   

    if (map) {
        map.addInteraction(draw);
        draw.setActive(isActive);
        draw.on('drawend', drawEnd);
    }

    useEffect(() => {
        draw.setActive(isActive);
    }, [isActive])

    function hideOverlay(): void {
        const style = { width: '0%' };
        setStyle(style)
    }

    function showOverlay(): void {
        const style = { width: '100%' }
        setStyle(style)
    }


    function handleDraw() {
        draw.setActive(!draw.getActive());
        props.onActiveChange(draw.getActive());
    }
    function drawEnd(e: DrawEvent): void {
        showOverlay()
        let createdFeature: Feature = e.feature;
        let sendButton = (document.getElementById('sendData') as HTMLTextAreaElement);
        const nameInput = (document.getElementById('name') as HTMLTextAreaElement);
        const bierInput = (document.getElementById('bier') as HTMLTextAreaElement);
        const preisInput = (document.getElementById('preis') as HTMLTextAreaElement);
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
                fetch(geoserverTransactionURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: requestHeaders,
                    body: xmlString
                })
                    .then(response => console.log('Feature successfully created.'))
                    .catch(error => console.log(error + 'Feature was not created.'));
            }
            else {
                console.log('Error: Feature was not created. <br>Only letters and whitespace allowed for Name and Kölsch.<br>Only numbers and decimal seperator allowed for Preis.');

            }
            hideOverlay();
            refreshData();
            draw.setActive(!draw.getActive());
            props.onActiveChange(draw.getActive());
        }
    }

    return (
        <>
            <Button
                id='drawButton'
                className={isActive? 'Button active' : 'Button'}
                fai='fa fa-map-marker fa-2x'
                onClick={handleDraw}
            />
            <Overlay
                name='draw' 
                map={map}
                style={style} 
            />
        </>
    )
}

export default DrawPoints;