import React, { useEffect, useRef } from 'react';
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import { Feature, } from 'ol';
import Button from '../../Components/Button';
import { checkInputLetters, checkInputNumbers, refreshData } from '../../utils/otherFunctions';
import { requestHeaders, transactionParameters, wfsTransaction, geoserverTransactionURL } from '../../config/config';
import { DrawProps } from '../../types/interfaces';
import Overlay from '../../Components/Overlay';
import { EventsKey } from 'openlayers';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { showOverlay } from '../actions/showOverlayAction';
import { MapUtils } from '../../utils/MapUtils';

const draw: Draw = MapUtils.createDraw();
let listenerFunctions: EventsKey[] = [];

const DrawPoints = (props: DrawProps): JSX.Element => {

    const overlay = useSelector((state: RootState) => state.currentOverlayState.overlay);
    const dispatch = useDispatch();

    const {
        isActive,
        map,
    } = props;

    const isFirst = useRef(true);

    if (map) {
        map.addInteraction(draw);
        draw.setActive(isActive);
        if (listenerFunctions.length === 0) {
            let listenerFunction = draw.on('drawend', drawEnd);
            listenerFunctions.push(listenerFunction);
            console.log('Added draw interaction to map.');
        }
    }

    useEffect(() => {
        draw.setActive(isActive);
        isFirst.current ? isFirst.current = false : dispatch(showOverlay(null));
        refreshData();
    }, [isActive, dispatch])

    function handleDraw() {
        draw.setActive(!draw.getActive());
        props.onActiveChange(draw.getActive());
    }

    function drawEnd(e: DrawEvent): void {
        let createdFeature: Feature = e.feature;
        dispatch(showOverlay(
            <Overlay
                map={map}
                name='draw'
                feature={createdFeature}
                onSaveClick={onSaveClick}
            />
        ))
    }

    const onSaveClick = (feature: Feature) => {
        // validate input
        if (checkInputLetters(feature.get('gastro')) && checkInputLetters(feature.get('bier')) && checkInputNumbers(feature.get('preis'))) {
            let xmlString = new XMLSerializer().serializeToString(
                wfsTransaction.writeTransaction([feature], [], [], transactionParameters)
            )
            fetch(geoserverTransactionURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: requestHeaders,
                body: xmlString
            })
                .then(response => console.log('Feature successfully created.'))
                .then(refreshData)
                .catch(error => console.log(error + 'Feature was not created.'));
        }
        else {
            console.log('Error: Feature was not created. <br>Only letters and whitespace allowed for Name and Kölsch.<br>Only numbers and decimal seperator allowed for Preis.');
        }
        draw.setActive(!draw.getActive());
        props.onActiveChange(draw.getActive());
        dispatch(showOverlay(null));
    }

    return (
        <>
            <Button
                id='drawButton'
                className={isActive ? 'Button active' : 'Button'}
                fai='fa fa-map-marker fa-2x'
                onClick={handleDraw}
            />

            {
                isActive ?
                    overlay
                    :
                    null
            }
        </>
    )
}

export default DrawPoints;