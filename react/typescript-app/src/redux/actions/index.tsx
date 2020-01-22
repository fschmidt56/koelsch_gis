import { Feature } from 'ol';
import { ActiveButton, Action_Map, Action_Button, BasemapState, Action_Overlay, Action_Feature, InteractionType } from '../../types/interfaces';

export enum ActionTypes {
    SET_MAP = 'SET_MAP',
    SET_ACTIVE_BUTTON = 'SET_ACTIVE_BUTTON',
    SHOW_OVERLAY = 'SHOW_OVERLAY',
    SET_SELECTED_FEATURE = 'SET_SELECTED_FEATURE'
}

export function setMap(payload: BasemapState): Action_Map {
    return { type: ActionTypes.SET_MAP, payload };
}

export function setActive(payload: ActiveButton): Action_Button {
    return { type: ActionTypes.SET_ACTIVE_BUTTON, payload };
}

export function showOverlay(payload: InteractionType): Action_Overlay {
    return { type: ActionTypes.SHOW_OVERLAY, payload };
}

export function setSelectedFeature(payload: Feature): Action_Feature {
    return { type: ActionTypes.SET_SELECTED_FEATURE, payload };
}