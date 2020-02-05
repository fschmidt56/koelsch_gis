import { InteractionType, Action_Overlay } from "../../types/interfaces";
import { ActionTypes } from "./index";

export function showOverlay(payload: InteractionType): Action_Overlay {
    return { type: ActionTypes.SHOW_OVERLAY, payload };
}