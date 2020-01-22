import React from 'react';
import { OverlayProps } from '../types/interfaces';
import Form from './Form'
import { observer } from 'mobx-react-lite';

const Overlay = observer((props: OverlayProps) => {

    const {
        map,
        name,
        feature,
        onSaveClick
    } = props

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