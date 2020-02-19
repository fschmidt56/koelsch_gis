import { currentActiveState } from '../redux/reducers/ActiveReducer';
import { ActionTypes } from "../redux/actions/index";
import { Action_Button } from '../types/interfaces';

describe('Active Reducer...', () => {

    const initialAction: Action_Button = { type: ActionTypes.SET_ACTIVE_BUTTON, payload: undefined }
    const drawAction: Action_Button = { type: ActionTypes.SET_ACTIVE_BUTTON, payload: 'draw' }
    const modifyAction: Action_Button = { type: ActionTypes.SET_ACTIVE_BUTTON, payload: 'modify' }
    const deleteAction: Action_Button = { type: ActionTypes.SET_ACTIVE_BUTTON, payload: 'delete' }

    it('returns a correct initial state.', () => {
        const initialState = { activeButton: undefined };
        expect(currentActiveState(undefined, initialAction)).toEqual(initialState);
    });

    it('returns a new state with \"draw"\ as activeButton.', () => {
        const newState = { activeButton: 'draw' };
        expect(currentActiveState(undefined, drawAction)).toEqual(newState);
    });

    it('returns a new state with \"modify"\ as activeButton.', () => {
        const newState = { activeButton: 'modify' };
        expect(currentActiveState(undefined, modifyAction)).toEqual(newState);
    });

    it('returns a new state with \"delete"\ as activeButton.', () => {      
        const newState = { activeButton: 'delete' };
        expect(currentActiveState(undefined, deleteAction)).toEqual(newState);
    });

    it('should not equal new state.', () => {
        const newState = { activeButton: 'modify' };
        expect(currentActiveState(undefined, drawAction)).not.toEqual(newState);
    });
});