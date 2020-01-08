import React, {useState} from 'react';
import DrawPoints from './Draw';
import ModifyPoints from './Modify';
import DeletePoints from './Delete';
import { ButtonGroupProps } from '../types/interfaces';

const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {

    const {
        map,
        activeButton,
        ...passThroughProps
    } = props;

    return (
        <div className='ButtonGroup'>
            <DrawPoints
                map={map}
                isActive={activeButton === 'draw'}
                onActiveChange={(status: boolean) => {
                    useState({
                        activeButton: status ? 'draw' : undefined,
                    })
                }}

            />
            <ModifyPoints
                map={map}
                isActive={activeButton === 'modify'}
                onActiveChange={(status: boolean) => {
                    useState({
                        activeButton: status ? 'modify' : undefined
                    })
                }}

            />
            <DeletePoints
                map={map}
                isActive={activeButton === 'delete'}
                onActiveChange={(status: boolean) => {
                    useState({
                        activeButton: status ? 'delete' : undefined
                    })
                }}
            />
        </div>
    )
}

export default ButtonGroup;