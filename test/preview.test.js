import React from 'react';
import { shallow } from 'enzyme';
import Preview from '../components/preview';

describe('Preview', () => {
  it('should renders correctly errors', () => {
    const wrapper = shallow(<Preview src="" preview="" height="" width="" id="id" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should receive all props', () => {
    const wrapper = mount(<Preview src="source" preview="preview" height="120" width="240" id="id" />);

    expect(wrapper.prop('src')).toEqual('source');
    expect(wrapper.prop('preview')).toEqual('preview');
    expect(wrapper.prop('height')).toEqual('120');
    expect(wrapper.prop('width')).toEqual('240');
    expect(wrapper.prop('id')).toEqual('id');
  });

  it('should change state on mouseenter', () => {
    const wrapper = mount(<Preview src="source" preview="preview" height="120" width="240" id="id" />);

    expect(wrapper.state().isFocused).toEqual(false);
    wrapper.find('img').simulate('mouseenter');
    expect(wrapper.state().isFocused).toEqual(true);
    wrapper.find('img').simulate('mouseleave');
    expect(wrapper.state().isFocused).toEqual(false);
  });
});