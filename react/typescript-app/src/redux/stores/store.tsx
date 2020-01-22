import { createStore, combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { currentMapState } from '../reducers/index'

//wenn mehrere reducer vorhanden
const rootReducer = combineReducers({
    currentMapState,
});

export type RootState = StateType<typeof rootReducer>;

const redux_store = createStore(rootReducer)
redux_store.subscribe(() => console.log(redux_store.getState()));

export default redux_store;