import { ActiveButton, Action_Button } from "../../types/interfaces";
import { ActionTypes } from ".";

export function setActive(payload: ActiveButton): Action_Button {
    return { type: ActionTypes.SET_ACTIVE_BUTTON, payload };
}