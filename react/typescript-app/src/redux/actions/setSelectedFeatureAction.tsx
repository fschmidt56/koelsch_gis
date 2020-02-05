import { ActionTypes } from ".";
import Feature from "ol/Feature";
import { Action_Feature } from "../../types/interfaces";

export function setSelectedFeature(payload: Feature): Action_Feature {
    return { type: ActionTypes.SET_SELECTED_FEATURE, payload };
}