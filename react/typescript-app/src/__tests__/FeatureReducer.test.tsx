import { currentFeatureState} from '../redux/reducers/FeatureReducer';
import { ActionTypes } from "../redux/actions/index";
import { Action_Feature } from '../types/interfaces';
import { Feature } from 'ol';

describe('Feature Reducer...', () => {

    it('returns a correct initial State.', () => {
        const testFeature = new Feature();
        const action: Action_Feature = {type: ActionTypes.SET_SELECTED_FEATURE, payload: testFeature }
        const initialState = { selectedFeature: testFeature };
        expect(currentFeatureState(undefined, action)).toEqual(initialState);
    });

    it('returns a state with a selectedFeature.', () => {
        const beerFeature = new Feature()   
        const action: Action_Feature = {type: ActionTypes.SET_SELECTED_FEATURE, payload: beerFeature }
        const newState = { selectedFeature: beerFeature };
        expect(currentFeatureState(undefined, action)).toEqual(newState);
    }); 
});

