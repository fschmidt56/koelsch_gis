import { observable, action } from 'mobx';
import { ButtonGroupState, ActiveButton } from '../../types/interfaces';

export class ButtonGroupStore implements ButtonGroupState {
    @observable activeButton: ActiveButton = undefined;

    @action setActive = (activeBtn: ActiveButton) => {
        this.activeButton = activeBtn
    }
};

