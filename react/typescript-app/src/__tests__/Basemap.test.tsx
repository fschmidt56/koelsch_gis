import React from 'react';
import Basemap from '../redux/Components/Basemap_Redux';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { ShallowWrapper, ReactWrapper, mount } from 'enzyme';
import ButtonGroup from '../redux/Components/ButtonGroup_Redux';
import { setMap } from '../redux/actions/setMapAction';
import { MapUtils } from '../utils/MapUtils';


describe('The class Basemap...', () => {

  let component: ShallowWrapper | ReactWrapper;

  //executed before each test
  beforeEach(() => {
    component = mount(<Provider store={redux_store}><Basemap /></Provider>)
    redux_store.dispatch = jest.fn()
  });

  it('should exist.', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch redux store once.', () => {
    const map = MapUtils.createMap();
    redux_store.dispatch(setMap(map));
    expect(redux_store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch redux store with SET_MAP Action', () => {
    const map = MapUtils.createMap();
    redux_store.dispatch(setMap(map));
    expect(redux_store.dispatch).toHaveBeenCalledWith(
      setMap(map)
    );
  });

  it('should render the ButtonGroup Component.', () => {
    let group = component.find(ButtonGroup);
    expect(group.exists()).toBeTruthy();
  });

  it('passes a property map to the ButtonGroup.', () => {
    let group = component.find(ButtonGroup);
    expect(group).toHaveProperty('map');
  });

  //fails
  it('should render a canvas element', () => {   
      console.log(component.debug());
      let canvas = component.find('canvas');
      expect(canvas).toBeInTheDocument();
  });

  it('should add a width and height property to the canvas element', () => {
    let canvas = component.find('canvas');
    expect(canvas).toHaveAttribute('height');
    expect(canvas).toHaveAttribute('width');
  });
});
