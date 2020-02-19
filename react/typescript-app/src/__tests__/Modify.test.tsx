import React from 'react';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import ModifyPoints from '../redux/Components/Modify_Redux';


describe('The class Modify...', () => {
   
    let props = {
        map: null,
        isActive: false,
        onActiveChange: jest.fn()
    }

    let component: ShallowWrapper | ReactWrapper;

    beforeEach(() => {
        component = mount(<Provider store={redux_store}><ModifyPoints isActive={props.isActive} map={props.map} onActiveChange={props.onActiveChange} /></Provider>)
    });

    it('should exist.', () => {
        let btn = component.find(ModifyPoints)
        expect(btn.exists()).toBeTruthy();
    });

    it('should have a button element and onclick the onActiveChange callback is executed once.', () => {
        let btn = component.find('button');
        btn.simulate('click')
        expect(props.onActiveChange.mock.calls.length).toEqual(1);
    });

    it('should have a button elememt which contains a font awesome icon \"edit"\.', () => {
        let btn = component.find('button');
        expect(btn.containsMatchingElement(<i className="fa fa-edit fa-2x" />)).toBeTruthy()
    });  
 
});