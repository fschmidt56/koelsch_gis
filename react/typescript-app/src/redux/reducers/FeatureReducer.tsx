import { Actions, InitialFeatureState } from "../../types/interfaces";
import { ActionTypes } from "../actions";
import Feature from "ol/Feature";

//initialer State des Features
const initialFeatureState: InitialFeatureState = {
    selectedFeature: new Feature(),
}

//reducer für selectedFeature-state
export const currentFeatureState = (state: InitialFeatureState = initialFeatureState, action: Actions): InitialFeatureState => {
    switch (action.type) {
        //set selected Feature
        case ActionTypes.SET_SELECTED_FEATURE:
            return Object.assign({}, state, {
                selectedFeature: action.payload
            });
        default:
            return state;
    }
};