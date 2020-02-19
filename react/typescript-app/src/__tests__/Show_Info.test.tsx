import React from 'react';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import ShowInfo from '../redux/Components/Show_Info_Redux';

describe('The class ShowInfo...', () => {

    const props = {
        map: null,
        onActiveChange: jest.fn(),
        isActive: false,
    }

    let component: ShallowWrapper | ReactWrapper;

    beforeEach(() => {
        component = mount(<Provider store={redux_store}><ShowInfo {...props} /></Provider>)
    });

    it('should exist.', () => {
        let btn = component.find(ShowInfo)
        expect(btn.exists()).toBeTruthy();
    });

    it('should have a button element and onclick the callback function is executed once.', () => {
        let btn = component.find('button');
        btn.simulate('click')
        expect(props.onActiveChange.mock.calls.length).toEqual(1);
    });

    it('should have a button elememt which contains a font awesome icon \"info"\ .', () => {
        let btn = component.find('button');
        expect(btn.containsMatchingElement(<i className="fa fa-info fa-2x" />)).toBeTruthy()
    });
 
});