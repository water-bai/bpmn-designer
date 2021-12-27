import React from 'react';
import { shallow } from 'enzyme';
import BpmnEditor from '../src/index';
import '../src/main.scss';

it('renders', () => {
  const wrapper = shallow(<BpmnEditor />);
  expect(wrapper.find('.BpmnEditor').length).toBe(1);
});
