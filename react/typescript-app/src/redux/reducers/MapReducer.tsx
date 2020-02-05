import { InitialMapState, Actions } from "../../types/interfaces";
import { ActionTypes } from "../actions";

//initialer State des Projektes
const initialMapState: InitialMapState = {
    map: null,
   
}

//reducer für map-state
export const currentMapState = (state: InitialMapState = initialMapState, action: Actions): InitialMapState => {
    switch (action.type) {
        //set Basemap
        case ActionTypes.SET_MAP:
            return Object.assign({}, state, {
                map: action.payload,
            });
        default:
            return state;
    }
};