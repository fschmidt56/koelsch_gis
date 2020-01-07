import React from 'react';
import Button from './Button';
import Select, { SelectEvent } from 'ol/interaction/Select'
import { Map, Feature } from 'ol';
import { datasource } from '../utils/vectorlayer';
import { credentials, transactionParameters, wfsTransaction, geoserverTransactionURL, xhr } from '../config/config';


interface SelectProps {
    map: Map | null;
}

const DeletePoints = (props: SelectProps): JSX.Element => {
    let select: Select = new Select({
    });
    if (props.map) {
        props.map.addInteraction(select);
        select.setActive(false)
    }
    let selectedFeature: Feature; //placeholder for deleting, modifying

    function handleDelete() {
        select.setActive(!select.getActive());
        let deleteButton = document.getElementById('deleteButton')
        if (deleteButton!.classList.contains('active')) {
            deleteButton!.classList.remove('active')
        }
        else { deleteButton!.classList.add('active') }
        select.on('select', (e: SelectEvent) => {
            //draw.setActive(false);
            const outputMessage = (document.getElementById('output') as HTMLTextAreaElement);
            selectedFeature = e.target.getFeatures().getArray()[0];

            if (!selectedFeature) return 'No feature selected.';
            let xmlString: string = new XMLSerializer().serializeToString(
                wfsTransaction.writeTransaction([], [], [selectedFeature], transactionParameters)
            );
            // TODO Make use of fetch here!
            xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password)
            xhr.setRequestHeader('Content-type', 'text/plain')
            xhr.send(xmlString)
            xhr.onreadystatechange = function (): void {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    outputMessage.innerHTML = 'Feature was successfully deleted.';
                    setTimeout(function (): void {
                        outputMessage.innerHTML = "";
                    }, 3000);
                    datasource!.clear();
                    datasource!.refresh();
                }
                else {
                    outputMessage.innerHTML = 'Error: Feature was not deleted.';
                    setTimeout(function (): void {
                        outputMessage.innerHTML = "";
                    }, 3000);
                }
            }
            deleteButton!.classList.remove('active');
            select.setActive(false);
        })
    }

    return (
        <Button
            id='deleteButton'
            className = 'Button'
            fai='fa fa-trash fa-2x'
            onClick={handleDelete}
        />
    )
}

export default DeletePoints;