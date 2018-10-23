import reducer from '../ducks/searchGifs';

describe('SearchGifs Reducer', () => {
  const initialState = {
    isLoading: true,
    isFailure: false,
    content: [],
    searchedGif: null,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state when action is undefined', () => {
    expect(reducer()).toEqual(initialState);
  });

  it('should handle GIF_SEARCH_REQUEST', () => {
    expect(reducer(initialState, { type: 'GIF_SEARCH_REQUEST' })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GIF_SEARCH_BY_QUERY_SUCCESS', () => {
    const successAction = {
      type: 'GIF_SEARCH_BY_QUERY_SUCCESS',
      payload: [{ test: 'test1' }],
    };

    expect(reducer(initialState, successAction)).toEqual({
      ...initialState,
      isLoading: false,
      content: [{ test: 'test1' }],
    });
  });

  it('should handle GIF_SEARCH_FAILURE', () => {
    const failureAction = {
      type: 'GIF_SEARCH_FAILURE',
    };

    expect(reducer(initialState, failureAction)).toEqual({
      ...initialState,
      isFailure: true,
      isLoading: false,
    });
  });

  it('should handle GIF_TRENDING_SUCCESS', () => {
    const successAction = {
      type: 'GIF_TRENDING_SUCCESS',
      payload: [{ test: 'test2' }],
    };

    expect(reducer(initialState, successAction)).toEqual({
      ...initialState,
      isLoading: false,
      content: [{ test: 'test2' }],
    });
  });

  it('should handle GIF_SEARCH_BY_ID_SUCCESS', () => {
    const successAction = {
      type: 'GIF_SEARCH_BY_ID_SUCCESS',
      payload: { test: 'test3' },
    };

    expect(reducer(initialState, successAction)).toEqual({
      ...initialState,
      isLoading: false,
      searchedGif: { test: 'test3' },
    });
  });
});
