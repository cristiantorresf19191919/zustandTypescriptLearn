import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {shallow} from 'enzyme'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

test('renders learn react link', () => {

  const wrapper = shallow(<App />);
  expect(wrapper.find(<Route />)).toHaveLength(4);
 
  expect(1).toBe(1);
});
