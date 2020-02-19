import React from 'react';
import App from '../App';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import Basemap from '../redux/Components/Basemap_Redux';

describe('The App Component...', () => {
  let component: ReactWrapper | ShallowWrapper;

  beforeEach(() => {
    component = mount(<Provider store={redux_store}><App /></Provider>)
  });

  it('should exist.', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('should render the Basemap Component.', () => {
    const map = component.find(Basemap);
    expect(map.exists()).toBeTruthy();
  });

  it('shoud add a div with className = map and id = map.', () => {
    const div = component.containsMatchingElement(<div className='map' id='map'></div>)
    expect(div).toEqual(true);
  });
});
