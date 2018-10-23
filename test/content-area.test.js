import React from 'react';
import { shallow, mount } from 'enzyme';
import HoverPreview from '../components/hover-preview';
import ConnectedContentArea, {
  ContentArea,
  ContentAreaWithMounting,
} from '../components/content-area';

describe('ContentArea', () => {
  const contentListMock = [
    {
      id: 'id',
      url: 'url',
      previewUrl: 'previewUrl',
      width: '250',
      height: '200',
      title: 'title',
    },
  ];

  describe('ContentArea DUMB component', () => {
    it('should render DUMB component', () => {
      const wrapper = shallow(<ContentArea contentList={[]} />);

      expect(wrapper.length).toEqual(1);
    });

    it('should receive all props', () => {
      const wrapper = mount(
        <ContentArea
          contentList={contentListMock}
        />
      );

      expect(wrapper.prop('contentList')).toEqual(contentListMock);
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
          contentList={contentListMock}
          handleTrendingSearch={mockDispatch}
        />
      );
    });

    afterEach(() => {
      spyMounting.mockRestore();
      mockDispatch.mockReset();
    });

    it('should pass all props to HoverPreview', () => {
      const hoverPreview = wrapper.find(HoverPreview).first();

      expect(hoverPreview.prop('id')).toEqual('id');
      expect(hoverPreview.prop('src')).toEqual('url');
      expect(hoverPreview.prop('preview')).toEqual('previewUrl');
      expect(hoverPreview.prop('width')).toEqual('250');
      expect(hoverPreview.prop('height')).toEqual('200');
      expect(hoverPreview.prop('title')).toEqual('title');
    });

    it('should fire dispatchTrendingSearchRequest in componentDidMount', () => {
      expect(mockDispatch.mock.calls.length).toBe(1);
    });
  });
});
