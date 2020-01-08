import React, { useEffect } from 'react';
import Button from './Button';
import Select, { SelectEvent } from 'ol/interaction/Select'
import { Feature } from 'ol';
import { MapUtils } from '../utils/MapUtils'
import { requestHeaders, transactionParameters, wfsTransaction, geoserverTransactionURL } from '../config/config';
import { refreshData } from '../utils/otherFunctions';
import { SelectProps } from '../types/interfaces';

const select: Select = MapUtils.createSelect();

const DeletePoints = (props: SelectProps): JSX.Element => {

    const {
        isActive,
        map
    } = props
    
    useEffect(() => {
        select.setActive(isActive);
     }, [isActive])

    if (map) {
        map.addInteraction(select);
        select.setActive(isActive);
        select.on('select', (e: SelectEvent) => {
            selectedFeature = e.target.getFeatures().getArray()[0];
            if (!selectedFeature) return 'No feature selected.';
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
    }
    let selectedFeature: Feature; //placeholder for deleting, modifying

    function handleDelete() {
        select.setActive(!select.getActive());
        props.onActiveChange(select.getActive());     
    }

    return (
        <Button
            id='deleteButton'
            className={isActive? 'Button active' : 'Button'}
            fai='fa fa-trash fa-2x'
            onClick={handleDelete}
        />
    )
}

export default DeletePoints;