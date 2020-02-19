import React from 'react';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import DrawPoints from '../redux/Components/Draw_Redux';
import { setActive } from '../redux/actions/setActiveAction';


describe('The class Draw...', () => {
    const map = null
    const onActiveChange = jest.fn()

    let component: ShallowWrapper | ReactWrapper;

    beforeEach(() => {
        component = mount(<Provider store={redux_store}><DrawPoints isActive={false} map={map} onActiveChange={onActiveChange} /></Provider>);
        redux_store.dispatch = jest.fn();
    });

    it('should exist.', () => {
        let btn = component.find(DrawPoints)
        expect(btn.exists()).toBeTruthy();
    });

    it('should have a button element and onclick the callback function is executed once.', () => {
        let btn = component.find('button');
        btn.simulate('click')
        expect(onActiveChange.mock.calls.length).toEqual(1);
    });

    it('should have a button elememt which contains a font awesome icon \"map-marker"\ .', () => {
        let btn = component.find('button');
        expect(btn.containsMatchingElement(<i className="fa fa-map-marker fa-2x" />)).toBeTruthy()
    });

    it('should have a button element with a \"onClick"\ property.', () => {
        let btn = component.find('button').props()
        expect(btn).toHaveProperty('onClick');
    });

    it('should dispatch redux store twice.', () => {
        const activeButton = 'draw'
        const nextActiveButton = 'modify'
        redux_store.dispatch(setActive(activeButton))
        redux_store.dispatch(setActive(nextActiveButton))
        expect(redux_store.dispatch).toHaveBeenCalledTimes(2);
    });

});