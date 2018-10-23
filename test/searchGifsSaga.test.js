import { takeEvery, put, call } from 'redux-saga/effects';
import GifsApi from '../services/gifs-api';
import * as searchGifsDuck from '../ducks/searchGifs';
import formatter from '../services/formatter';

describe('searchGifsSagas', () => {
  it('should take all actions', () => {
    const saga = searchGifsDuck.searchGifsSagas[0]();

    expect(saga.next().value).toEqual(
      takeEvery(searchGifsDuck.trendingSearchRequest().type, searchGifsDuck.getAsyncTrendingGifs)
    );
    expect(saga.next().value).toEqual(
      takeEvery(searchGifsDuck.searchByQueryRequest().type, searchGifsDuck.getAsyncSearchGifs)
    );
    expect(saga.next().value).toEqual(
      takeEvery(searchGifsDuck.searchByIdRequest().type, searchGifsDuck.getAsyncSearchGifById)
    );
  });

  describe('getAsyncTrendingGifs', () => {
    let formatArraySpy;
    const formattedArray = [{ test: 'formatted array' }];
    
    beforeAll(() => {
      formatArraySpy = jest.spyOn(formatter, 'formatFixedHeightGifs').mockReturnValue(formattedArray);
    });
  
    afterAll(() => {
      formatArraySpy.mockRestore();
    });

    it('should fetch gifs without errors', () => {
      const saga = searchGifsDuck.getAsyncTrendingGifs();
      const spyOnApi = jest
        .spyOn(GifsApi, 'getTrendingGifs')
        .mockReturnThis();
  
      expect(saga.next().value).toEqual(put(searchGifsDuck.searchRequest()));
      expect(saga.next().value).toEqual(call(GifsApi.getTrendingGifs));
      expect(saga.next().value).toEqual(put(searchGifsDuck.trendingSearchSuccess(formattedArray)));
  
      spyOnApi.mockRestore();
    });

    it('should handle error while fetching', () => {
      const saga = searchGifsDuck.getAsyncTrendingGifs();
      const spyOnApi = jest
        .spyOn(GifsApi, 'getTrendingGifs')
        .mockRejectedValue(new Error('error fetching data'));
  
      expect(saga.next().value).toEqual(put(searchGifsDuck.searchRequest()));
      expect(saga.next().value).toEqual(call(GifsApi.getTrendingGifs));
      expect(saga.throw(new Error('error fetching data')).value).toEqual(put(searchGifsDuck.searchFailure()));
  
      spyOnApi.mockRestore();
    });
  });

  describe('getAsyncSearchGifs', () => {
    let formatArraySpy;
    const formattedArray = [{ test: 'formatted array 2' }];
    const searchParams = { params: { searchQuery: 'search' } };

    beforeAll(() => {
      formatArraySpy = jest.spyOn(formatter, 'formatFixedHeightGifs').mockReturnValue(formattedArray);
    });

    afterAll(() => {
      formatArraySpy.mockRestore();
    });

    it('should fetch gifs without errors', () => {
      const saga = searchGifsDuck.getAsyncSearchGifs(searchParams);
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifsByQuery')
        .mockReturnThis();

      expect(saga.next().value).toEqual(put(searchGifsDuck.searchRequest()));
      expect(saga.next().value).toEqual(call(GifsApi.getGifsByQuery, 'search'));
      expect(saga.next().value).toEqual(put(searchGifsDuck.searchByQuerySuccess(formattedArray)));

      spyOnApi.mockRestore();
    });

    it('should handle error while fetching', () => {
      const saga = searchGifsDuck.getAsyncSearchGifs(searchParams);
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifsByQuery')
        .mockRejectedValue(new Error('error fetching data'));

      expect(saga.next().value).toEqual(put(searchGifsDuck.searchRequest()));
      expect(saga.next().value).toEqual(call(GifsApi.getGifsByQuery, 'search'));
      expect(saga.throw(new Error('error fetching data')).value).toEqual(put(searchGifsDuck.searchFailure()));

      spyOnApi.mockRestore();
    });
  });

  describe('getAsyncSearchGifById', () => {
    let formatGifSpy;
    const searchParams = { params: { gifId: '123' } };
    const formattedGif = { test: 'formatted gif' };

    beforeAll(() => {
      formatGifSpy = jest.spyOn(formatter, 'formatOriginalGif').mockReturnValue(formattedGif);
    });

    afterAll(() => {
      formatGifSpy.mockRestore();
    });

    it('should fetch gif by id without errors', () => {
      const saga = searchGifsDuck.getAsyncSearchGifById(searchParams);
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifById')
        .mockReturnThis();

      expect(saga.next().value).toEqual(put(searchGifsDuck.searchRequest()));
      expect(saga.next().value).toEqual(call(GifsApi.getGifById, '123'));
      expect(saga.next().value).toEqual(put(searchGifsDuck.searchByIdSuccess(formattedGif)));

      spyOnApi.mockRestore();
    });

    it('should handle error while fetching', () => {
      const saga = searchGifsDuck.getAsyncSearchGifById(searchParams);
      const spyOnApi = jest
        .spyOn(GifsApi, 'getGifById')
        .mockRejectedValue(new Error('error fetching data'));

      expect(saga.next().value).toEqual(put(searchGifsDuck.searchRequest()));
      expect(saga.next().value).toEqual(call(GifsApi.getGifById, '123'));
      expect(saga.throw(new Error('error fetching data')).value).toEqual(put(searchGifsDuck.searchFailure()));

      spyOnApi.mockRestore();
    });
  });
});
