import { BasemapState, Action_Map } from "../../types/interfaces";
import { ActionTypes } from ".";

export function setMap(payload: BasemapState): Action_Map {
    return { type: ActionTypes.SET_MAP, payload };
}