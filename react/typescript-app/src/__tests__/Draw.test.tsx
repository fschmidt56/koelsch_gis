import React from 'react';
import { render, getByRole, getByTestId } from '@testing-library/react';
import redux_store, { RootState } from '../redux/stores/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { mount, configure, ShallowWrapper, ReactWrapper } from 'enzyme';
import DrawPoints from '../redux/Components/Draw_Redux';


describe('The class Draw', () => {
    const map = null
    let onActiveChange = () => {}
    let component: ShallowWrapper | ReactWrapper;

    beforeEach(() => {
        component = mount(<Provider store={redux_store}><DrawPoints isActive={false} map={map} onActiveChange={onActiveChange} /></Provider>)
    });

    it('should add a draw interaction to the map', () => {
        console.log(component.debug())
        let btn = component.find(DrawPoints)
        btn.simulate('click');
        console.log(component.debug());
        
    })
});