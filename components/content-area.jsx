import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle, onlyUpdateForKeys } from 'recompose';
import styled from 'styled-components';
import HoverPreview from './hover-preview';
import withLoadingStatus from './loading-status';

export const ContentArea = ({ contentList }) => (
  <ContentAreaWrapper>
    {contentList &&
      contentList.map(content => (
        <HoverPreview
          key={content.id}
          id={content.id}
          src={content.url}
          preview={content.previewUrl}
          width={content.width}
          height={content.height}
          title={content.title}
        />
      ))}
  </ContentAreaWrapper>
);

const ContentAreaWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;
  z-index: 1;
`;

ContentArea.propTypes = {
  contentList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      previewUrl: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

const ExtendedContentArea = onlyUpdateForKeys(['contentList'])(ContentArea);

export const ContentAreaWithLoadingStatus = withLoadingStatus(
  ExtendedContentArea
);

export const ContentAreaWithMounting = lifecycle({
  componentDidMount() {
    const { handleTrendingSearch } = this.props;

    handleTrendingSearch();
  },
})(ContentAreaWithLoadingStatus);

export default ContentAreaWithMounting;
