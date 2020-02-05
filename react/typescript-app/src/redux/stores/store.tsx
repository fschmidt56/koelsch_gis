import { createStore, combineReducers, applyMiddleware } from 'redux';
import { StateType } from 'typesafe-actions';
import { currentMapState } from '../reducers/MapReducer';
import { currentActiveState } from '../reducers/ActiveReducer';
import { currentOverlayState } from '../reducers/OverlayReducer';
import { currentFeatureState } from '../reducers/FeatureReducer';
import logger from 'redux-logger';

//if multiple reducers available combine reducers
const rootReducer = combineReducers({
    currentMapState,
    currentActiveState,
    currentOverlayState,
    currentFeatureState,
});

//define rootState
export type RootState = StateType<typeof rootReducer>;

//create store
const redux_store = createStore(
    rootReducer,
    applyMiddleware(logger)
)

//subscribe called after every change of state
//redux_store.subscribe(() => console.log(redux_store.getState()));

export default redux_store;