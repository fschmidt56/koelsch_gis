import { currentOverlayState } from '../redux/reducers/OverlayReducer';
import { ActionTypes } from "../redux/actions/index";
import { Action_Overlay } from '../types/interfaces';
import Overlay from '../Components/Overlay';
import React from 'react';
import { Feature } from 'ol';

describe('Overlay Reducer...', () => {

    let props = {
        map: null,
        onSaveClick: jest.fn(),
        testFeature: new Feature(),
        name: 'modify'
    }

    it('returns a correct initial State.', () => {
        const overlay = null;
        const action: Action_Overlay = { type: ActionTypes.SHOW_OVERLAY, payload: overlay }
        const initialState = { overlay: null };
        expect(currentOverlayState(undefined, action)).toEqual(initialState);
    });

    it('returns a new state with the \"modify"\ overlay', () => {
        const modifyOverlay = <Overlay
            map={props.map}
            name='modify'
            feature={props.testFeature}
            onSaveClick={props.onSaveClick}
        />
        const action: Action_Overlay = { type: ActionTypes.SHOW_OVERLAY, payload: modifyOverlay }
        const newState = { overlay: modifyOverlay }
        expect(currentOverlayState(undefined, action)).toEqual(newState);
    });
});