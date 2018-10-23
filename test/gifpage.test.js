import React from 'react';
import { shallow, mount } from 'enzyme';
import { Gifpage } from '../pages/gifpage';

describe('Gifpage', () => {
  const gifMock = {
    images: { original: { url: 'url', width: '200', height: '250' } },
  };

  const queryMock = { id: '1' };

  describe('Gifpage DUMB component', () => {
    it('should renders correctly when loading', () => {
      const wrapper = shallow(
        <Gifpage
          query={{ id: '1' }}
          dispatchSearchByIdRequest={() => {}}
          gif={null}
          isLoading={true}
          isFailure={false}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should renders correctly when failed', () => {
      const wrapper = shallow(
        <Gifpage
          query={queryMock}
          gif={null}
          dispatchSearchByIdRequest={() => {}}
          isLoading={false}
          isFailure={true}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should renders correctly when not failed', () => {
      const wrapper = shallow(
        <Gifpage
          dispatchSearchByIdRequest={() => {}}
          query={queryMock}
          gif={gifMock}
          isLoading={false}
          isFailure={false}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should receive all props', () => {
      const wrapper = mount(
        <Gifpage
          dispatchSearchByIdRequest={() => {}}
          query={queryMock}
          gif={gifMock}
          isLoading={false}
          isFailure={false}
        />
      );

      expect(wrapper.prop('dispatchSearchByIdRequest')).toBeTruthy();
      expect(wrapper.prop('query')).toEqual(queryMock);
      expect(wrapper.prop('gif')).toEqual(gifMock);
      expect(wrapper.prop('isLoading')).toEqual(false);
      expect(wrapper.prop('isFailure')).toEqual(false);
    });
  });
});
