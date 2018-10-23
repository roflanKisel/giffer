import React from 'react';
import { shallow } from 'enzyme';
import Preview from '../components/preview';

describe('Preview', () => {
  it('should renders correctly errors', () => {
    const wrapper = shallow(<Preview src="source" height="120" width="240" alt="alt" selected />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should receive all props', () => {
    const wrapper = mount(<Preview src="source" height="120" width="240" alt="alt" selected />);

    expect(wrapper.prop('src')).toEqual('source');
    expect(wrapper.prop('height')).toEqual('120');
    expect(wrapper.prop('width')).toEqual('240');
    expect(wrapper.prop('alt')).toEqual('alt');
    expect(wrapper.prop('selected')).toBeTruthy();
  });
});