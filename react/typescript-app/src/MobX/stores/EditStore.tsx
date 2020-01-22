import { observable, action } from 'mobx';
import { InteractionType, IEditStore } from '../../types/interfaces';

export class EditStore implements IEditStore {
    @observable overlay: InteractionType = null;

    @action showOverlay = (overlayName: InteractionType) => {
        this.overlay = overlayName
    }
}