import React from 'react';
import { ButtonGroupProps} from '../../types/interfaces';
import DrawButton from './Draw_Redux';
import ModifyButton from './Modify_Redux';
import DeleteButton from '../../Components/Delete';
import InfoButton from './Show_Info_Redux';
import { useDispatch, useSelector } from 'react-redux';
import { setActive} from '../actions/index';
import { RootState } from '../stores/store';

const ButtonGroup = (props: ButtonGroupProps) => {

    const activeButton = useSelector((state: RootState) => state.currentMapState.activeButton)
    const dispatch = useDispatch()

    const {
        map
    } = props

    return (
        <>
            <div className="ButtonGroup">
                <DrawButton
                    map={map}
                    isActive={activeButton === 'draw'}
                    onActiveChange={(status: boolean) => status ? dispatch(setActive('draw')) : dispatch(setActive(undefined))}                   
                />
                <ModifyButton
                    map={map}
                    isActive={activeButton === 'modify'}
                    onActiveChange={(status: boolean) => status ? dispatch(setActive('modify')) : dispatch(setActive(undefined))}
                />
                <DeleteButton
                    map={map}
                    isActive={activeButton === 'delete'}
                    onActiveChange={(status: boolean) => status ? dispatch(setActive('delete')) : dispatch(setActive(undefined))}
                />
                <InfoButton
                    map={map}
                    isActive={activeButton === 'info'}
                    onActiveChange={(status: boolean) => status ? dispatch(setActive('info')) : dispatch(setActive(undefined))}
                />
            </div>
        </>
    );
}

export default ButtonGroup;