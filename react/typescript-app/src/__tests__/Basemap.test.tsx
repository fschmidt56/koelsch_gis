import React from 'react';
import Basemap from '../redux/Components/Basemap_Redux';
import redux_store from '../redux/stores/store';
import { Provider } from 'react-redux';
import { shallow, ShallowWrapper, ReactWrapper, mount } from 'enzyme';
import ButtonGroup from '../redux/Components/ButtonGroup_Redux';

describe('The class Basemap', () => {
  let component: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
  component = mount(<Provider store={redux_store}><Basemap /></Provider>)
  });

  it('should exist.', () => {
    expect(component.exists()).toBeTruthy(); 
  });

  it('should render the ButtonGroup Component.', () => {
    let group = component.find(ButtonGroup);
    expect(group.exists()).toBeTruthy(); 
  });

  it('passes a property map to the ButtonGroup.', () => {
    let group =  component.find(ButtonGroup);
    expect(group).toHaveProperty('map');
  })

  // it('should render a canvas element', () => {
  //   console.log(component.debug())
  //   let canvas = component.find('canvas');
  //   expect(canvas).toBeInTheDocument();
  // });

  //  it('should add a width and height property to the canvas', () => {
  //    let canvas = component.find('canvas');
  //    expect(canvas).toHaveAttribute('height');
  //    expect(canvas).toHaveAttribute('width');
  // });
});
