import React from 'react';
import Button from './Button';

interface Info extends React.HTMLProps<HTMLButtonElement> {
}

const ShowInfo = (props: Info): JSX.Element => {

    const {
        ...passThroughProps
    } = props;
    
    return (
        <Button
            id="infoButton"
            fai='fa fa-info fa-2x'
            {...passThroughProps}
        />
    )
}

export default ShowInfo;