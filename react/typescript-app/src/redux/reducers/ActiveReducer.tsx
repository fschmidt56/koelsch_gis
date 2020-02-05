import { InitialButtonState, Actions } from "../../types/interfaces";
import { ActionTypes } from "../actions";

//initialer State des Buttons
const initialButtonState: InitialButtonState = {
    activeButton: undefined
}

//reducer für activeButton-state
export const currentActiveState = (state: InitialButtonState = initialButtonState, action: Actions): InitialButtonState => {
    switch (action.type) {
        //switch active Button
        case ActionTypes.SET_ACTIVE_BUTTON:
            return Object.assign({}, state, {
                activeButton: action.payload
            });
        default:
            return state;
    }
};