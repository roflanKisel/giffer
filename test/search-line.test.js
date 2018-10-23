import React from 'react';
import { shallow, mount } from 'enzyme';
import { SearchLine } from '../components/search-line';

describe('SearchLine', () => {
  describe('SearchLine DUMB component', () => {
    it('should renders correctly errors', () => {
      const wrapper = shallow(<SearchLine handleSearchByQuery={() => {}} />)
  
      expect(wrapper).toMatchSnapshot();
    });

    it('should receive all props', () => {
      const wrapper = mount(<SearchLine handleSearchByQuery={() => {}} />);

      expect(wrapper.prop('handleSearchByQuery')).toBeTruthy();
    });
  
    it('should have state', () => {
      const wrapper = mount(<SearchLine handleSearchByQuery={() => {}} />);
  
      expect(wrapper.state().inputText).toEqual('');
    });
  
    it('should change state on inputing', () => {
      const wrapper = mount(<SearchLine handleSearchByQuery={() => {}} />);
  
      expect(wrapper.state().inputText).toEqual('');
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(wrapper.state().inputText).toEqual('a');
      wrapper.find('input').simulate('change', { target: { value: 'ab' } });
      expect(wrapper.state().inputText).toEqual('ab');
    });
  
    it('should perform action when enter was pressed', () => {
      const wrapper = mount(<SearchLine handleSearchByQuery={() => {}} />)
      const spy = jest.spyOn(wrapper.instance(), 'performSearch');
  
      expect(spy.mock.calls.length).toEqual(0);
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(spy.mock.calls.length).toEqual(0);
      wrapper.find('input').simulate('keypress', { key: 'Enter' });
      expect(spy.mock.calls.length).toEqual(1);
    });
  });
});