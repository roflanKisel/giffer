import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../components/navbar';

describe('Navbar', () => {
  it('should renders correctly', () => {
    const wrapper = shallow(<Navbar />);

    expect(wrapper).toMatchSnapshot();
  });
});