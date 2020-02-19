import React from 'react';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import Form from '../redux/Components/Form_Redux';

describe('The class Form...', () => {

    const map = null;
    let component: ShallowWrapper | ReactWrapper;

    //executed before each test
    beforeEach(() => {
        component = mount(<Provider store={redux_store}><Form map={map} name='modify' /></Provider>)
    });

    it('should exist.', () => {
        let form = component.find(Form)
        expect(form.exists()).toBeTruthy();
    });

    it('should render four input elements.', () => {
        let inputfields = component.find('input');
        expect(inputfields).toHaveLength(4);
    });

    it('should render a input field with id = name and a default value which is undefined.', () => {
        let nameInput = component.find('#name').props().value
        expect(nameInput).toEqual(undefined);
    });

    it('should render a input field with id = bier and a default value which is undefined.', () => {
        let nameInput = component.find('#bier').props().value
        expect(nameInput).toEqual(undefined);
    });

    it('should render a input field with id = preis and a default value which is undefined.', () => {
        let nameInput = component.find('#preis').props().value
        expect(nameInput).toEqual(undefined);
    });

    it('should render a input field with id = name and if a value is set, the input element should have that as value.', () => {
        let nameInput = component.find('#name')
        nameInput.props().value = 'Neuer Datenpunkt';
        expect(nameInput.props().value).toEqual('Neuer Datenpunkt');
    });

    it('should render a input field with id = preis and attributes min = 1 and max = 5', () => {
        let minInput = component.find('#preis').props().min;
        let maxInput = component.find('#preis').props().max;
        expect(minInput).toEqual("1");
        expect(maxInput).toEqual("5");
    });

    it('should render input field preis with step = 0.05', () => {
        let step = component.find('#preis').props().step;
        expect(step).toEqual("0.05");
    });
});