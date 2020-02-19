import configureStore from 'redux-mock-store';
import { ActionTypes } from "../redux/actions/index";
import { setMap } from '../redux/actions/setMapAction';
import { MapUtils } from '../utils/MapUtils';

const mockStore = configureStore();
const store = mockStore();

describe('Set Map action...', () => {
    //executed before each test
    beforeEach(() => {
        store.clearActions();
    });

    let map = MapUtils.createMap()

    it('creates the expected action', () => {
        const expected = {
            payload: map,
            type: 'SET_MAP'
        };

        const got = setMap(map);

        expect(got).toEqual(expected);
    });

    it('dispatches action and payload correctly.', () => {
        const mapAction = [{
            payload: map,
            type: ActionTypes.SET_MAP,
        }]
        store.dispatch(setMap(map))
        expect(store.getActions()).toEqual(mapAction);
    });

})
