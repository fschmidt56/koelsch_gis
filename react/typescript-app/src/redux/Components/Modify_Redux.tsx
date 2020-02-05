import React, { useEffect, useRef } from 'react';
import Select, { SelectEvent } from 'ol/interaction/Select'
import Modify, { ModifyEvent } from 'ol/interaction/Modify';
import Button from '../../Components/Button';
import { Feature } from 'ol';
import { MapUtils } from '../../utils/MapUtils';
import { requestHeaders, transactionParameters, wfsTransaction, geoserverTransactionURL } from '../../config/config';
import { refreshData, checkInputLetters, checkInputNumbers } from '../../utils/otherFunctions';
import { ModifyProps } from '../../types/interfaces';
import Overlay from '../../Components/Overlay';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { showOverlay } from '../actions/showOverlayAction';
import { EventsKey } from 'openlayers';

const select: Select = MapUtils.createSelect();
const modify: Modify = MapUtils.createModify();

let listenerFunctions: EventsKey[] = [];

const ModifyPoints = (props: ModifyProps): JSX.Element => {

    const overlay = useSelector((state: RootState) => state.currentOverlayState.overlay);
    const dispatch = useDispatch();

    const {
        isActive,
        map,
    } = props

    const isFirst = useRef(true);

    useEffect(() => {
        select.setActive(isActive);
        modify.setActive(false);
        //dispatch(showOverlay(null));
        isFirst.current ? isFirst.current = false : dispatch(showOverlay(null))
        refreshData();
    }, [isActive, dispatch])

    if (map) {
        map.addInteraction(select);
        map.addInteraction(modify);
        modify.setActive(false);
        select.setActive(isActive);
        if (listenerFunctions.length === 0) {
            let listenerFunction = select.on('select', (e: SelectEvent) => {
                let selectedFeature: Feature = e.target.getFeatures().getArray()[0];
                if (!selectedFeature) {
                    return;
                }
                modify.setActive(true);
                modify.on('modifyend', (e: ModifyEvent) => {
                    dispatch(showOverlay(
                        <Overlay
                            map={map}
                            name='modify'
                            feature={selectedFeature}
                            onSaveClick={onSaveClick}
                        />
                    ))
                    selectedFeature.getId();
                    selectedFeature.setGeometryName('geom');
                    selectedFeature.unset('selected')
                })
            });
            listenerFunctions.push(listenerFunction)
            console.log('Added modify interaction to map.')
        };
    }

    function handleModify() {
        select.setActive(!select.getActive());
        props.onActiveChange(select.getActive());
    }

    const onSaveClick = (feature: Feature) => {
        // validate input
        if (checkInputLetters(feature.get('gastro')) && checkInputLetters(feature.get('bier')) && checkInputNumbers(feature.get('preis'))) {
            let xmlString = new XMLSerializer().serializeToString(
                wfsTransaction.writeTransaction([], [feature], [], transactionParameters)
            )
            fetch(geoserverTransactionURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: requestHeaders,
                body: xmlString
            })
                .then(response => console.log('Feature successfully modified.'))
                .catch(error => console.log(error + 'Feature was not modified.'));
        }
        else {
            console.log('Error: Feature was not modified. <br>Only letters and whitespace allowed for Name and Kölsch.<br>Only numbers and decimal seperator allowed for Preis.');

        }
        modify.setActive(false);
        select.setActive(false);
        props.onActiveChange(false);
        dispatch(showOverlay(null));
        refreshData();
    }

    return (
        <>
            <Button
                id='modifyButton'
                className={isActive ? 'Button active' : 'Button'}
                fai='fa fa-edit fa-2x'
                onClick={handleModify}
            />
            {overlay}
        </>
    )
}

export default ModifyPoints;