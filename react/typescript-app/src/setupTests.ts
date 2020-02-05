// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { XMLSerializer } from 'xmldom';
import 'jest-canvas-mock';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import '@testing-library/react';
//@ts-ignore
global.URL.createObjectURL = function () {}
//@ts-ignore
global.XMLSerializer = XMLSerializer;
//enzym config
Enzyme.configure({ adapter: new Adapter() });