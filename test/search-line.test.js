import React from 'react';
import { shallow, mount } from 'enzyme';
import { SearchLine } from '../components/search-line';

describe('SearchLine', () => {
  describe('SearchLine DUMB component', () => {
    it('should renders correctly errors', () => {
      const wrapper = shallow(<SearchLine searchQuery="search query" onSearchQueryChange={() => {}} />)
  
      expect(wrapper).toMatchSnapshot();
    });

    it('should receive all props', () => {
      const wrapper = mount(<SearchLine searchQuery="search query" onSearchQueryChange={() => {}} />);

      expect(wrapper.prop('onSearchQueryChange')).toBeTruthy();
      expect(wrapper.prop('searchQuery')).toEqual('search query');
    });
  });
});