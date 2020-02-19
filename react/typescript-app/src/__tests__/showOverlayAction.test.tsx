import configureStore from 'redux-mock-store';
import { ActionTypes } from "../redux/actions/index";
import { showOverlay } from '../redux/actions/showOverlayAction';

const mockStore = configureStore();
const store = mockStore()

describe('Show Overlay action...', () => {
    beforeEach(() => {
        store.clearActions()
    })

    const activeOverlay = null

    it('dispatches overlay action and payload correctly.', () => {
        const overlayAction = [{
            payload: activeOverlay,
            type: ActionTypes.SHOW_OVERLAY,
     }]
     
     store.dispatch(showOverlay(null));
     expect(store.getActions()).toEqual(overlayAction);
    })

    it('dispatches no incorrect actions or payloads', () => {
        const overlayAction = [{
            payload: activeOverlay,
            type: ActionTypes.SET_ACTIVE_BUTTON,
     }]
     store.dispatch(showOverlay(null));
     expect(store.getActions()).not.toEqual(overlayAction);
    })
})
