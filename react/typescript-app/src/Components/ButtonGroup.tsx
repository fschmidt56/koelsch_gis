import React, { useState } from 'react';
import { ButtonGroupProps, ActiveButton } from '../types/interfaces';
import DrawButton from './Draw';
import ModifyButton from './Modify';
import DeleteButton from './Delete';
import InfoButton from './ShowInfo';

const ButtonGroup = (props: ButtonGroupProps) => {

    const [activeButton, setActive] = useState<ActiveButton>(undefined); 

    const {
        map
    } = props

    return (
        <>
            <div className="ButtonGroup">
                <DrawButton
                    map={map}
                    isActive={activeButton === 'draw'}
                    onActiveChange={(status: boolean) => status ? setActive('draw') : setActive(undefined)}                   
                />
                <ModifyButton
                    map={map}
                    isActive={activeButton === 'modify'}
                    onActiveChange={(status: boolean) => status ? setActive('modify') : setActive(undefined)}
                />
                <DeleteButton
                    map={map}
                    isActive={activeButton === 'delete'}
                    onActiveChange={(status: boolean) => status ? setActive('delete') : setActive(undefined)}
                />
                <InfoButton
                    map={map}
                    isActive={activeButton === 'info'}
                    onActiveChange={(status: boolean) => status ? setActive('info') : setActive(undefined)}
                />
            </div>
        </>
    );
}

export default ButtonGroup;