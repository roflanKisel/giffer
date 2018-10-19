import axios from 'axios';
import { GIPHY_API_URL, API_KEY } from '../config/config';

const GifsApi = {};

GifsApi.getTrendingGifs = async () => {
  const trendingGifs = await axios.get(
    `${GIPHY_API_URL}/gifs/trending?limit=15&api_key=${API_KEY}&rating=pg`
  );

  return trendingGifs.data.data;
};

GifsApi.getGifsByQuery = async searchQuery => {
  const gifs = await axios.get(
    `${GIPHY_API_URL}/gifs/search?limit=15&api_key=${API_KEY}&q=${searchQuery}&rating=pg`
  );

  return gifs.data.data;
};

GifsApi.getGifById = async gifId => {
  const gif = await axios.get(
    `${GIPHY_API_URL}/gifs/${gifId}?api_key=${API_KEY}`
  );

  return gif.data.data;
};

export default GifsApi;
