import React from 'react';
import { OverlayProps } from '../types/interfaces';
import Form from './Form'
import { stores } from '../stores/stores'
import { observer } from 'mobx-react-lite';

const Overlay = observer((props: OverlayProps) => {

    const {
        name,
        feature,
        onSaveClick
    } = props

    const { map } = stores.mapStore

    return (
        <>
            <div
                className="overlay"
            >
                <Form
                    name={name}
                    map={map}
                    feature={feature}
                    onSaveClick={onSaveClick}
                />
            </div>

        </>
    )

})

export default Overlay;