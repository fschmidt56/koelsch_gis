import React, { useEffect } from 'react';
import Select, { SelectEvent } from 'ol/interaction/Select'
import Modify, { ModifyEvent } from 'ol/interaction/Modify';
import Button from '../../Components/Button';
import { Feature } from 'ol';
import { MapUtils } from '../../utils/MapUtils';
import { requestHeaders, transactionParameters, wfsTransaction, geoserverTransactionURL } from '../../config/config';
import { refreshData, checkInputLetters, checkInputNumbers } from '../../utils/otherFunctions';
import { ModifyProps } from '../../types/interfaces';
import Overlay from '../../Components/Overlay';
import { stores } from '../stores/stores';
import { observer } from 'mobx-react-lite';
import { EventsKey } from 'openlayers';


const select: Select = MapUtils.createSelect();
const modify: Modify = MapUtils.createModify();

let listenerFunctions: EventsKey[] = [];

const ModifyPoints = observer((props: ModifyProps): JSX.Element => {

    const { overlay, showOverlay } = stores.editStore;
    const { map } = stores.mapStore;

    const { isActive } = props

    useEffect(() => {
        select.setActive(isActive);
        modify.setActive(false);
        showOverlay(null);
        refreshData();
    }, [isActive, showOverlay])

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
                    showOverlay(
                        <Overlay
                            map={map}
                            name='modify'
                            feature={selectedFeature}
                            onSaveClick={onSaveClick}
                        />
                    )
                    selectedFeature.getId();
                    selectedFeature.setGeometryName('geom');
                    selectedFeature.unset('selected')
                })
            })
            listenerFunctions.push(listenerFunction)
            console.log('Added modify interaction to map.');
        }
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
        showOverlay(null);
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
});

export default ModifyPoints;