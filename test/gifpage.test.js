import React from 'react';
import { shallow, mount } from 'enzyme';
import { Gifpage } from '../pages/gifpage';

describe('Gifpage', () => {
  describe('Gifpage DUMB component', () => {
    it('should renders correctly when loading', () => {
      const wrapper = shallow(
        <Gifpage
          dispatch={() => {}}
          query={{ id: '1' }}
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
          dispatch={() => {}}
          query={{ id: '1' }}
          gif={null}
          isLoading={false}
          isFailure={true}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should renders correctly when not failed', () => {
      const wrapper = shallow(
        <Gifpage
          dispatch={() => {}}
          query={{ id: '1' }}
          gif={{
            images: { original: { url: 'url', width: '200', height: '250' } },
          }}
          isLoading={false}
          isFailure={false}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should receive all props', () => {
      const wrapper = mount(
        <Gifpage
          dispatch={() => {}}
          query={{ id: '1' }}
          gif={{
            images: { original: { url: 'url', width: '200', height: '250' } },
          }}
          isLoading={false}
          isFailure={false}
        />
      );

      expect(wrapper.prop('dispatch')).toBeTruthy();
      expect(wrapper.prop('query')).toEqual({ id: '1' });
      expect(wrapper.prop('gif')).toEqual({
        images: { original: { url: 'url', width: '200', height: '250' } },
      });
      expect(wrapper.prop('isLoading')).toEqual(false);
      expect(wrapper.prop('isFailure')).toEqual(false);
    });

    // it('should fire getInitialProps on start', () => {
    //   const wrapper = mount(
    //     <Gifpage
    //       dispatch={() => {}}
    //       query={{ id: '1' }}
    //       gif={{
    //         images: { original: { url: 'url', width: '200', height: '250' } },
    //       }}
    //       isLoading={false}
    //       isFailure={false}
    //     />
    //   );
    //   const spy = jest.spyOn(wrapper, 'getInitialProps');

    //   expect(spy.mock.calls.length).toEqual(1);
    // });
  });
});
