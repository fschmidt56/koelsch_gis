import React from 'react';
import { OverlayProps } from '../types/interfaces';
import Form from '../redux/Components/Form_Redux';

const Overlay = (props: OverlayProps) => {

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

}

export default Overlay;