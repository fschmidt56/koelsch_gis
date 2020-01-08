import React, { useEffect } from 'react';
import Select, { SelectEvent } from 'ol/interaction/Select'
import Modify, { ModifyEvent } from 'ol/interaction/Modify';
import Button from './Button';
import { Feature } from 'ol';
import { MapUtils } from '../utils/MapUtils';
import { requestHeaders, transactionParameters, wfsTransaction, geoserverTransactionURL } from '../config/config';
import { refreshData } from '../utils/otherFunctions';
import { ModifyProps } from '../types/interfaces';

const select: Select = MapUtils.createSelect();
const modify: Modify = MapUtils.createModify();

const ModifyPoints = (props: ModifyProps): JSX.Element => {

    const {
        isActive,
        map,
    } = props

    useEffect(() => {
        select.setActive(isActive);
        modify.setActive(false);
    }, [isActive])

    if (map) {
        map.addInteraction(select);
        map.addInteraction(modify);
        modify.setActive(false);
        select.setActive(isActive);
        select.on('select', (e: SelectEvent) => {
            selectedFeature = e.target.getFeatures().getArray()[0];
            modify.setActive(true);
            modify.on('modifyend', (e: ModifyEvent) => {
                selectedFeature.getId();
                selectedFeature.setGeometryName('geom');
                let xmlString = new XMLSerializer().serializeToString(
                    wfsTransaction.writeTransaction([], [selectedFeature], [], transactionParameters)
                );
                fetch(geoserverTransactionURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: requestHeaders,
                    body: xmlString
                })
                    .then(response => console.log('Feature successfully modified.'))
                    .catch(error => console.log(error + 'Feature was not modified.'));
                refreshData();
                modify.setActive(false);
                select.setActive(false);
                props.onActiveChange(false);
            })
        });
    }

    let selectedFeature: Feature

    function handleModify() {
        select.setActive(!select.getActive());
        props.onActiveChange(select.getActive());
    }

    return (
        <Button
            id='modifyButton'
            className={isActive? 'Button active' : 'Button'}
            fai='fa fa-edit fa-2x'
            onClick={handleModify}
        />
    )
}

export default ModifyPoints;