import { currentMapState } from '../redux/reducers/MapReducer';
import { ActionTypes } from "../redux/actions/index";
import { Action_Map } from '../types/interfaces';
import { MapUtils } from '../utils/MapUtils';

describe('Map Reducer...', () => {

    it('returns a correct inital state.', () => {
        const action: Action_Map = { type: ActionTypes.SET_MAP, payload: null }
        const initialState = { map: null };
        expect(currentMapState(undefined, action)).toEqual(initialState);
    });

    it('returns a new state with a initialized map.', () => {
        const map = MapUtils.createMap()
        const action: Action_Map = { type: ActionTypes.SET_MAP, payload: map }
        const newState = { map: map };
        expect(currentMapState(undefined, action)).toEqual(newState);
    });
});