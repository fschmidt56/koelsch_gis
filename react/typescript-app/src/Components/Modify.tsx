import React from 'react';
import Select, { SelectEvent } from 'ol/interaction/Select'
import Modify, { ModifyEvent } from 'ol/interaction/Modify';
import Button from './Button';
import { datasource } from '../utils/vectorlayer';
import { Map, Feature } from 'ol';
import { credentials, transactionParameters, wfsTransaction, geoserverTransactionURL, xhr } from '../config/config';

interface ModifyProps {
    map: Map | null;
}

const ModifyPoints = (props: ModifyProps): JSX.Element => {
    let select: Select = new Select({
    });

    let modify: Modify = new Modify({
        source: datasource,
    });

    if (props.map) {
        props.map.addInteraction(select);
        props.map.addInteraction(modify);
        modify.setActive(false);
        select.setActive(false);
    }
  
    let selectedFeature: Feature

    function handleModify() {
        select.setActive(!select.getActive());
        let modifyButton = document.getElementById('modifyButton')
        if (modifyButton!.classList.contains('active')) {
            modifyButton!.classList.remove('active')
        }
        else { modifyButton!.classList.add('active') }
          //modify features
        select.on('select', (e: SelectEvent) => {
            //draw.setActive(false);
            selectedFeature = e.target.getFeatures().getArray()[0];
            //if (!selectedFeature) return alert('Select a feature to modify data.');
            modify.setActive(true);
            modify.on('modifyend', (e: ModifyEvent) => {
                selectedFeature.getId();
                selectedFeature.setGeometryName('geom');
                let xmlString = new XMLSerializer().serializeToString(
                    wfsTransaction.writeTransaction([], [selectedFeature], [], transactionParameters)
                );
                const outputMessage = (document.getElementById('output') as HTMLTextAreaElement);
                xhr.open('POST', geoserverTransactionURL, true, credentials.username, credentials.password)
                xhr.setRequestHeader('Content-type', 'text/plain')
                xhr.send(xmlString)
                xhr.onreadystatechange = function (): void {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        outputMessage.innerHTML = 'Feature was successfully modified.'
                        setTimeout(function (): void {
                            outputMessage.innerHTML = "";
                        }, 3000);
                        datasource!.clear();
                        datasource!.refresh();
                    }
                    else {
                        outputMessage.innerHTML = 'Error: Feature could not be modified.';
                        setTimeout(function (): void {
                            outputMessage.innerHTML = "";
                        }, 3000);
                    }
                }
                modifyButton!.classList.remove('active');
                modify.setActive(false);
                select.setActive(false);
                //btnDelete.classList.remove('active');
                //btnModify.classList.remove('active');
                //btnInfo.classList.remove('active');
            })
        });
    }

    return (
        <Button 
            id='modifyButton'
            className='Button'
            fai='fa fa-edit fa-2x'
            onClick={handleModify}
        />
    )
}

export default ModifyPoints;