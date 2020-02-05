import { InitialOverlayState, Actions } from "../../types/interfaces";
import { ActionTypes } from "../actions";

//initialer State des Overlays
const initialOverlayState: InitialOverlayState = {
    overlay: null
}

//reducer für overlay-state
export const currentOverlayState = (state: InitialOverlayState = initialOverlayState, action: Actions): InitialOverlayState => {
    switch (action.type) {
        //show corresponding Overlay
        case ActionTypes.SHOW_OVERLAY:
            return Object.assign({}, state, {
                overlay: action.payload
            });
        default:
            return state;
    }
};