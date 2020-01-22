import { Feature } from "ol";
import { ActionTypes } from "../actions/index";
import { InitialState, Actions } from '../../types/interfaces'

//initialer State
const initialState: InitialState = {
    map: null,
    activeButton: undefined,
    overlay: null,
    selectedFeature: new Feature(),
}

//reducer für State-Changes
export const currentMapState = (state: InitialState = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case ActionTypes.SET_MAP:
            return {
                ...state,
                map: action.payload,
            };
        case ActionTypes.SET_ACTIVE_BUTTON:
            return {
                ...state,
                activeButton: action.payload
            }
        case ActionTypes.SHOW_OVERLAY:
            return {
                ...state,
                overlay: action.payload
            }
        case ActionTypes.SET_SELECTED_FEATURE:
            return {
                ...state,
                selectedFeature: action.payload
            }
        default:
            return state
    }
};