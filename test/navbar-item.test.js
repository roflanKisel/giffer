import React from 'react';
import { shallow } from 'enzyme';
import NavbarItem from '../components/navbar-item';

describe('NavbarItem', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <NavbarItem name="Button" link="/" />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render the DUMB component', () => {
    const wrapper = shallow(<NavbarItem name="Button" link="/" />);

    expect(wrapper.length).toEqual(1);
  });
});
