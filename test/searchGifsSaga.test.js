import { takeEvery, put, call } from 'redux-saga/effects';
import GifsApi from '../services/gifs-api';
import {
  searchGifsSagas,
  getAsyncTrendingGifs,
  getAsyncSearchGifs,
  getAsyncSearchGifById,
} from '../ducks/searchGifs';

describe('searchGifsSagas', () => {
  it('should take all actions', () => {
    const saga = searchGifsSagas[0]();

    expect(saga.next().value).toEqual(
      takeEvery('GIF_TRENDING_REQUEST', getAsyncTrendingGifs)
    );
    expect(saga.next().value).toEqual(
      takeEvery('GIF_SEARCH_BY_QUERY_REQUEST', getAsyncSearchGifs)
    );
    expect(saga.next().value).toEqual(
      takeEvery('GIF_SEARCH_BY_ID_REQUEST', getAsyncSearchGifById)
    );
  });

  describe('getAsyncTrendingGifs', () => {
    it('should fetch gifs without errors', () => {
      const saga = getAsyncTrendingGifs();
      const requestAction = {
        type: 'GIF_SEARCH_REQUEST',
      };
      const successAction = {
        type: 'GIF_TRENDING_SUCCESS',
        payload: [{ test: 'test1' }],
      };
      const spyOnApi = jest
        .spyOn(GifsApi, 'getTrendingGifs')
        .mockResolvedValue([{ test: 'test1' }]);
  
      expect(saga.next().value).toEqual(put(requestAction));
      expect(saga.next().value).toEqual(call(GifsApi.getTrendingGifs));
      expect(saga.next([{ test: 'test1' }]).value).toEqual(put(successAction));
  
      spyOnApi.mockRestore();
    });

    it('should handle error while fetching', () => {
      const saga = getAsyncTrendingGifs();
      const requestAction = {
        type: 'GIF_SEARCH_REQUEST',
      };
      const failureAction = {
        type: 'GIF_SEARCH_FAILURE',
      };
      const spyOnApi = jest
        .spyOn(GifsApi, 'getTrendingGifs')
        .mockRejectedValue(new Error('error fetching data'));
  
      expect(saga.next().value).toEqual(put(requestAction));
      expect(saga.next().value).toEqual(call(GifsApi.getTrendingGifs));
      expect(saga.throw(new Error('error fetching data')).value).toEqual(put(failureAction));
  
      spyOnApi.mockRestore();
    });
  });

  describe('getAsyncSearchGifs', () => {
    it('should fetch gifs without errors', () => {
      const saga = getAsyncSearchGifs({ params: { searchQuery: 'search' } });
      const requestAction = {
        type: 'GIF_SEARCH_REQUEST',
      };
      const successAction = {
        type: 'GIF_SEARCH_BY_QUERY_SUCCESS',
        payload: [{ test: 'test2' }],
      };
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifsByQuery')
        .mockResolvedValue([{ test: 'test2' }]);

      expect(saga.next().value).toEqual(put(requestAction));
      expect(saga.next().value).toEqual(call(GifsApi.getGifsByQuery, 'search'));
      expect(saga.next([{ test: 'test2' }]).value).toEqual(put(successAction));

      spyOnApi.mockRestore();
    });

    it('should handle error while fetching', () => {
      const saga = getAsyncSearchGifs({ params: { searchQuery: 'search' } });
      const requestAction = {
        type: 'GIF_SEARCH_REQUEST',
      };
      const failureAction = {
        type: 'GIF_SEARCH_FAILURE',
      };
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifsByQuery')
        .mockRejectedValue(new Error('error fetching data'));

      expect(saga.next().value).toEqual(put(requestAction));
      expect(saga.next().value).toEqual(call(GifsApi.getGifsByQuery, 'search'));
      expect(saga.throw(new Error('error fetching data')).value).toEqual(put(failureAction));

      spyOnApi.mockRestore();
    });
  });

  describe('getAsyncSearchGifById', () => {
    it('should fetch gif by id without errors', () => {
      const saga = getAsyncSearchGifById({ params: { gifId: '123' } });
      const requestAction = {
        type: 'GIF_SEARCH_REQUEST',
      };
      const successAction = {
        type: 'GIF_SEARCH_BY_ID_SUCCESS',
        payload: { test: 'test3' },
      };
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifById')
        .mockResolvedValue({ test: 'test3' });

      expect(saga.next().value).toEqual(put(requestAction));
      expect(saga.next().value).toEqual(call(GifsApi.getGifById, '123'));
      expect(saga.next({ test: 'test3' }).value).toEqual(put(successAction));

      spyOnApi.mockRestore();
    });

    it('should handle error while fetching', () => {
      const saga = getAsyncSearchGifById({ params: { gifId: '123' } });
      const requestAction = {
        type: 'GIF_SEARCH_REQUEST',
      };
      const failureAction = {
        type: 'GIF_SEARCH_FAILURE',
      };
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifById')
        .mockRejectedValue(new Error('error fetching data'));

      expect(saga.next().value).toEqual(put(requestAction));
      expect(saga.next().value).toEqual(call(GifsApi.getGifById, '123'));
      expect(saga.throw(new Error('error fetching data')).value).toEqual(put(failureAction));

      spyOnApi.mockRestore();
    });
  });
});
