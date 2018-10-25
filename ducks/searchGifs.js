import { takeEvery, call, put } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';
import GifsApi from '../services/gifs-api';
import formatter from '../services/formatter';

// Actions
const GIF_SEARCH_REQUEST = 'GIF_SEARCH_REQUEST';
const GIF_SEARCH_BY_QUERY_REQUEST = 'GIF_SEARCH_BY_QUERY_REQUEST';
const GIF_TRENDING_REQUEST = 'GIF_TRENDING_REQUEST';
const GIF_SEARCH_BY_ID_REQUEST = 'GIF_SEARCH_BY_ID_REQUEST';
const GIF_SEARCH_FAILURE = 'GIF_SEARCH_FAILURE';
const GIF_SEARCH_BY_QUERY_SUCCESS = 'GIF_SEARCH_BY_QUERY_SUCCESS';
const GIF_TRENDING_SUCCESS = 'GIF_TRENDING_SUCCESS';
const GIF_SEARCH_BY_ID_SUCCESS = 'GIF_SEARCH_BY_ID_SUCCESS';

const INITIAL_STATE = {
  isLoading: true,
  isFailure: false,
  content: [],
  searchedGif: null,
};

// Reducer
export default handleActions(
  {
    [GIF_SEARCH_REQUEST]: state => ({
      ...state,
      isLoading: true,
    }),
    [GIF_SEARCH_BY_QUERY_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      content: action.payload,
    }),
    [GIF_SEARCH_FAILURE]: () => ({
      ...INITIAL_STATE,
      isFailure: true,
      isLoading: false,
    }),
    [GIF_TRENDING_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      content: action.payload,
    }),
    [GIF_SEARCH_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      searchedGif: action.payload,
    }),
  },
  { ...INITIAL_STATE }
);

// Action Creators
export const searchRequest = () => ({
  type: GIF_SEARCH_REQUEST,
});

export const searchFailure = () => ({
  type: GIF_SEARCH_FAILURE,
});

export const trendingSearchRequest = () => ({
  type: GIF_TRENDING_REQUEST,
});

export const trendingSearchSuccess = data => ({
  type: GIF_TRENDING_SUCCESS,
  payload: data,
});

export const searchByQueryRequest = (params = {}) => ({
  type: GIF_SEARCH_BY_QUERY_REQUEST,
  params,
});

export const searchByQuerySuccess = data => ({
  type: GIF_SEARCH_BY_QUERY_SUCCESS,
  payload: data,
});

export const searchByIdRequest = (params = {}) => ({
  type: GIF_SEARCH_BY_ID_REQUEST,
  params,
});

export const searchByIdSuccess = data => ({
  type: GIF_SEARCH_BY_ID_SUCCESS,
  payload: data,
});

// Sagas
export function* getAsyncTrendingGifs() {
  try {
    yield put(searchRequest());
    const trendingGifs = yield call(GifsApi.getTrendingGifs);

    yield put(
      trendingSearchSuccess(formatter.formatFixedHeightGifs(trendingGifs))
    );
  } catch (err) {
    yield put(searchFailure());
  }
}

export function* getAsyncSearchGifs(action) {
  try {
    yield put(searchRequest());
    const gifs = yield call(GifsApi.getGifsByQuery, action.params.searchQuery);

    yield put(searchByQuerySuccess(formatter.formatFixedHeightGifs(gifs)));
  } catch (err) {
    yield put(searchFailure());
  }
}

export function* getAsyncSearchGifById(action) {
  try {
    yield put(searchRequest());
    const gif = yield call(GifsApi.getGifById, action.params.gifId);

    yield put(searchByIdSuccess(formatter.formatOriginalGif(gif)));
  } catch (err) {
    yield put(searchFailure());
  }
}

export const searchGifsSagas = [
  function* searchGifsSaga() {
    yield takeEvery(GIF_TRENDING_REQUEST, getAsyncTrendingGifs);
    yield takeEvery(GIF_SEARCH_BY_QUERY_REQUEST, getAsyncSearchGifs);
    yield takeEvery(GIF_SEARCH_BY_ID_REQUEST, getAsyncSearchGifById);
  },
];
