import React, { useState } from 'react';
import Button from './Button';
import { InfoProps } from '../types/interfaces';
import Overlay from './Overlay_neu';

const ShowInfo = (props: InfoProps): JSX.Element => {

    const [style, setStyle] = useState({ width: '0%' })

    function showOverlay(): void {
        const style = { width: '100%' }
        setStyle(style)
    }

    function hideOverlay(): void {
        const style = { width: '0%' }
        setStyle(style)
    }
    const {
        map,
        ...passThroughProps
    } = props;

    return (
        <>
            <Button
                id="infoButton"
                fai='fa fa-info fa-2x'
                onClick={showOverlay}
                {...passThroughProps}
            />
            <Overlay
                name='info'
                map={map}
                style={style}
            />
        </>
    )
}

export default ShowInfo;