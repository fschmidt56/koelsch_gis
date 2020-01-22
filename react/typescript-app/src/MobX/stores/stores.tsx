import { MapStore } from './MapStore';
import { ButtonGroupStore } from './ButtonGroupStore';
import { InfoStore } from './InfoStore'
import { EditStore } from './EditStore';

export const stores = {
    mapStore: new MapStore(),
    buttonGroupStore: new ButtonGroupStore(),
    infoStore: new InfoStore(),
    editStore: new EditStore()
}