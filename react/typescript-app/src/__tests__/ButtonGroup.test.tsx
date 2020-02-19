import React from 'react';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import ButtonGroup from '../redux/Components/ButtonGroup_Redux';
import DrawPoints from '../redux/Components/Draw_Redux';
import ModifyButton from '../redux/Components/Modify_Redux';


describe('The class ButtonGroup...', () => {
    const map = null
    let component: ShallowWrapper | ReactWrapper;

    beforeEach(() => {
        component = mount(<Provider store={redux_store}><ButtonGroup map={map} /></Provider>)
    });

    it('should exist.', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render a Draw and Info Button', () => {
        let draw = component.find(DrawPoints);
        let info = component.find(ModifyButton)
        expect(draw.exists).toBeTruthy();
        expect(info.exists).toBeTruthy();
    });

    it('should render a button with a font awesome icon (map-marker)', () => {
        const button = component.containsMatchingElement(<button><i className="fa fa-map-marker fa-2x"></i></button>)
        expect(button).toEqual(true);
    });

    it('should render four buttons', () => {
        let buttonCount = component.find('button').length
        expect(buttonCount).toBe(4);
    });

    it('should pass props map, isActive and onActiveChange to the DrawPoints Component', () => {
        let draw = component.find(DrawPoints).get(0);
        const drawprop = draw.props
        expect(drawprop).toHaveProperty('map');
        expect(drawprop).toHaveProperty('isActive', false);
        expect(drawprop).toHaveProperty('onActiveChange');
    });
});
