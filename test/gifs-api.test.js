import GifsApi from '../services/gifs-api';
import axios from 'axios';

describe('GifsApi', () => {
  describe('getTrendingGifs', () => {
    let spy, axiosSpy;
    const resultArray = [{ test: 'test1' }, { test: 'test1' }];

    beforeEach(() => {
      spy = jest.spyOn(GifsApi, 'getTrendingGifs');
      axiosSpy = jest
        .spyOn(axios, 'get')
        .mockResolvedValue({ data: { data: resultArray } });
    });

    afterEach(() => {
      spy.mockRestore();
      axiosSpy.mockRestore();
    });

    it('should call axios', async () => {
      await GifsApi.getTrendingGifs();

      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    it('should return right value', async () => {
      const result = await GifsApi.getTrendingGifs();

      expect(result).toEqual(resultArray);
    });
  });

  describe('getGifsByQuery', () => {
    let spy, axiosSpy;
    const resultArray = [{ test: 'test1' }, { test: 'test1' }];

    beforeEach(() => {
      spy = jest.spyOn(GifsApi, 'getGifsByQuery');
      axiosSpy = jest
        .spyOn(axios, 'get')
        .mockResolvedValue({ data: { data: resultArray } });
    });

    afterEach(() => {
      spy.mockRestore();
      axiosSpy.mockRestore();
    });

    it('should call axios', async () => {
      await GifsApi.getGifsByQuery('hello');

      expect(axiosSpy).toHaveBeenCalledTimes(1);
      // TODO: axios with right params
    });

    it('should return right value', async () => {
      const result = await GifsApi.getGifsByQuery('hello');

      expect(result).toEqual(resultArray);
    });
  });

  describe('getGifById', () => {
    let spy, axiosSpy;
    const resultObject = { test: 'test1' };

    beforeEach(() => {
      spy = jest.spyOn(GifsApi, 'getGifById');
      axiosSpy = jest
        .spyOn(axios, 'get')
        .mockResolvedValue({ data: { data: resultObject } });
    });

    afterEach(() => {
      spy.mockRestore();
      axiosSpy.mockRestore();
    });

    it('should call axios', async () => {
      await GifsApi.getGifById('123');

      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    it('should return right value', async () => {
      const result = await GifsApi.getGifById('123');

      expect(result).toEqual(resultObject);
    });
  });
});
