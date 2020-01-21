import React from 'react';
import { ButtonGroupProps } from '../types/interfaces';
import DrawButton from './Draw_MobX';
import ModifyButton from './Modify_MobX';
import DeleteButton from './Delete';
import InfoButton from './ShowInfo_MobX';
import { stores } from '../stores/stores';
import { observer } from 'mobx-react-lite';

const ButtonGroup = observer((props: ButtonGroupProps) => {

    const { map } = stores.mapStore
    const { activeButton, setActive } = stores.buttonGroupStore

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
})

export default ButtonGroup;