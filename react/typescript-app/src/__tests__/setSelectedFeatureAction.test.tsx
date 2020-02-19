import configureStore from 'redux-mock-store';
import { Feature } from 'ol';
import { ActionTypes } from "../redux/actions/index";
import { setSelectedFeature } from '../redux/actions/setSelectedFeatureAction';

const mockStore = configureStore();
const store = mockStore()

describe('Set Selected Feature action...', () => {
    beforeEach(() => {
        store.clearActions()
    })

    const testFeature = new Feature()

    it('dispatches selectedfeature action and payload correctly.', () => {
        const featureAction = [{
            payload: testFeature,
            type: ActionTypes.SET_SELECTED_FEATURE,
     }]
     
     store.dispatch(setSelectedFeature(testFeature));
     expect(store.getActions()).toEqual(featureAction);
    })
})
