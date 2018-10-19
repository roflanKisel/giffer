import GifsApi from '../services/gifs-api';
import axios from 'axios';

describe('GifsApi', () => {
  describe('getTrendingGifs', () => {
    let spy, axiosSpy;

    beforeEach(() => {
      spy = jest.spyOn(GifsApi, 'getTrendingGifs');
      axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: { data: [{ test: 'test1' }, { test: 'test1' }] } });
    });

    afterEach(() => {
      spy.mockRestore();
      axiosSpy.mockRestore();
    });

    it('should call axios and return right values', async () => {
      await GifsApi.getTrendingGifs();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    it('should return right value', async () => {
      const result = await GifsApi.getTrendingGifs();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ test: 'test1' }, { test: 'test1' }]);
    });
  });

  describe('getGifsByQuery', () => {
    let spy, axiosSpy;
    
    beforeEach(() => {
      spy = jest.spyOn(GifsApi, 'getGifsByQuery');
      axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: { data: [{ test: 'test1' }, { test: 'test1' }] } });
    });

    afterEach(() => {
      spy.mockRestore();
      axiosSpy.mockRestore();
    });

    it('should receive right params', async () => {
      await GifsApi.getGifsByQuery('hello');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual('hello');
    });

    it('should call axios', async () => {
      await GifsApi.getGifsByQuery('hello');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    it('should return right value', async () => {
      const result = await GifsApi.getGifsByQuery('hello');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ test: 'test1' }, { test: 'test1' }]);
    });
  });

  describe('getGifById', () => {
    let spy, axiosSpy;
    
    beforeEach(() => {
      spy = jest.spyOn(GifsApi, 'getGifById');
      axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: { data: [{ test: 'test1' }, { test: 'test1' }] } });
    });

    afterEach(() => {
      spy.mockRestore();
      axiosSpy.mockRestore();
    });

    it('should receive right params', async () => {
      await GifsApi.getGifById('123');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual('123');
    });

    it('should call axios', async () => {
      await GifsApi.getGifById('123');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    it('should return right value', async () => {
      const result = await GifsApi.getGifById('123');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ test: 'test1' }, { test: 'test1' }]);
    });
  });
});