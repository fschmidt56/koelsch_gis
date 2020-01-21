import React, { useEffect } from 'react';
import Button from './Button';
import Select, { SelectEvent } from 'ol/interaction/Select'
import { Feature } from 'ol';
import { MapUtils } from '../utils/MapUtils'
import { requestHeaders, transactionParameters, wfsTransaction, geoserverTransactionURL } from '../config/config';
import { refreshData } from '../utils/otherFunctions';
import { SelectProps } from '../types/interfaces';
import { EventsKey } from 'openlayers';
import { stores } from '../stores/stores';

const select: Select = MapUtils.createSelect();
let listenerFunctions: EventsKey[] = [];

const DeletePoints = (props: SelectProps): JSX.Element => {

    const {map} = stores.mapStore;
    const { isActive } = props

    useEffect(() => {
        select.setActive(isActive);
    }, [isActive])

    if (map) {
        map.addInteraction(select);
        select.setActive(isActive);
        if (listenerFunctions.length === 0) {
            let listenerFunction = select.on('select', (e: SelectEvent) => {
                selectedFeature = e.target.getFeatures().getArray()[0];
                if (!selectedFeature) return;
                let xmlString: string = new XMLSerializer().serializeToString(
                    wfsTransaction.writeTransaction([], [], [selectedFeature], transactionParameters)
                );
                fetch(geoserverTransactionURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: requestHeaders,
                    body: xmlString
                })
                    .then(response => console.log('Feature deleted.'))
                    .catch(error => console.log(error + 'Feature was not deleted.'));
                refreshData();
                select.setActive(false);
                props.onActiveChange(select.getActive())
            })
            listenerFunctions.push(listenerFunction);
        }
    }
    let selectedFeature: Feature; //placeholder for deleting, modifying

    function handleDelete() {
        select.setActive(!select.getActive());
        props.onActiveChange(select.getActive());
    }

    return (
        <Button
            id='deleteButton'
            className={isActive ? 'Button active' : 'Button'}
            fai='fa fa-trash fa-2x'
            onClick={handleDelete}
        />
    )
}

export default DeletePoints;