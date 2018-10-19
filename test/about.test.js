import React from 'react';
import { shallow } from 'enzyme';
import About from '../pages/about';

describe('About page', () => {
  it('should renders correctly', () => {
    const wrapper = shallow(<About />);

    expect(wrapper).toMatchSnapshot();
  });
});
