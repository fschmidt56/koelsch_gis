import configureStore from 'redux-mock-store';
import { ActionTypes } from "../redux/actions/index";
import { setActive } from '../redux/actions/setActiveAction';

const mockStore = configureStore();
const store = mockStore()

describe('Set Active action...', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches activeButton action and payload correctly.', () => {
        const activeAction = [{
            payload: 'draw',
            type: ActionTypes.SET_ACTIVE_BUTTON,
     }]
     
     store.dispatch(setActive('draw'));
     expect(store.getActions()).toEqual(activeAction);
    })
})
