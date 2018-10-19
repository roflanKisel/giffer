import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {
  trendingSearchRequest,
  trendingSearchSuccess,
} from '../ducks/searchGifs';
import ConnectedContentArea, {
  ContentArea,
  ContentAreaWithMounting,
} from '../components/content-area';

describe('ContentArea', () => {
  describe('ContentArea DUMB component', () => {
    it('should render DUMB component', () => {
      const wrapper = shallow(
        <ContentArea isLoading={false} isFailure={true} contentList={[]} />
      );

      expect(wrapper.length).toEqual(1);
    });

    it('should receive all props', () => {
      const wrapper = mount(
        <ContentArea
          isLoading={false}
          isFailure={true}
          contentList={[{ test: 'test' }]}
        />
      );

      expect(wrapper.prop('isLoading')).toEqual(false);
      expect(wrapper.prop('isFailure')).toEqual(true);
      expect(wrapper.prop('contentList')).toEqual([{ test: 'test' }]);
    });

    it('should have text `Loading...`', () => {
      const wrapper = mount(
        <ContentArea isLoading={true} isFailure={false} contentList={[]} />
      );

      expect(
        wrapper
          .find('p')
          .first()
          .text()
      ).toEqual('Loading...');
    });

    it('should have text `Error fetching data`', () => {
      const wrapper = mount(
        <ContentArea isLoading={false} isFailure={true} contentList={[]} />
      );

      expect(
        wrapper
          .find('p')
          .first()
          .text()
      ).toEqual('Error fetching data');
    });
  });

  describe('ContentAreaWithMounting', () => {
    let wrapper, spyMounting, mockDispatch;

    beforeAll(() => {
      mockDispatch = jest.fn();
    });

    beforeEach(() => {
      spyMounting = jest.spyOn(
        ContentAreaWithMounting.prototype,
        'componentDidMount'
      );
      wrapper = mount(
        <ContentAreaWithMounting
          isLoading={false}
          isFailure={false}
          contentList={[]}
          dispatchTrendingSearchRequest={mockDispatch}
        />
      );
    });

    afterEach(() => {
      spyMounting.mockRestore();
      mockDispatch.mockReset();
    });

    it('should call componentDidMount once', () => {
      expect(spyMounting.mock.calls.length).toEqual(1);
    });

    it('should receive all props', () => {
      expect(wrapper.prop('dispatchTrendingSearchRequest')).toBeTruthy();
      expect(wrapper.prop('isLoading')).toEqual(false);
      expect(wrapper.prop('isFailure')).toEqual(false);
      expect(wrapper.prop('contentList')).toEqual([]);
    });

    it('should fire dispatchTrendingSearchRequest in componentDidMount', () => {
      expect(spyMounting.mock.calls.length).toEqual(1);
      expect(mockDispatch.mock.calls.length).toBe(1);
    });
  });

  describe('ContentArea with Redux store', () => {
    let initialState = {
      gifsData: {
        isLoading: false,
        isFailure: false,
        content: [],
        searchedGif: null,
      },
    };
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
      store = mockStore({ ...initialState });
      jest
        .spyOn(ContentAreaWithMounting.prototype, 'componentDidMount')
        .mockImplementation(() => {
          store.dispatch(trendingSearchRequest());

          initialState.gifsData = {
            ...initialState.gifsData,
            content: [
              {
                id: '1',
                images: {
                  fixed_height: { url: 'url', width: '200', height: '250' },
                  fixed_height_still: { url: 'url2' },
                },
              },
            ],
          };

          store.dispatch(trendingSearchSuccess());
        });

      wrapper = mount(
        <Provider store={store}>
          <ConnectedContentArea />
        </Provider>
      );
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should render SMART component', () => {
      expect(wrapper.find(ConnectedContentArea).length).toEqual(1);
    });

    it('should receive data from store', () => {
      expect(wrapper.find(ContentArea).prop('contentList')).toEqual(
        initialState.gifsData.content
      );
    });

    it('should perform action on dispatching', () => {
      const action = store.getActions();

      expect(action[0].type).toBe('GIF_TRENDING_REQUEST');
      expect(action[1].type).toBe('GIF_TRENDING_SUCCESS');
    });

    it('should receive data from componentDidMount', () => {
      const action = store.getActions();
      expect(action[0].type).toBe('GIF_TRENDING_REQUEST');
      expect(wrapper.find(ContentArea).prop('contentList')).toEqual(
        initialState.gifsData.content
      );
      expect(action[1].type).toBe('GIF_TRENDING_SUCCESS');
    });
  });
});
