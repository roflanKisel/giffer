const formatFixedHeightGifs = gifs =>
  gifs.map(gif => ({
    id: gif.id,
    url: gif.images.fixed_height.url,
    previewUrl: gif.images.fixed_height_still.url,
    width: gif.images.fixed_height.width,
    height: gif.images.fixed_height.height,
    title: gif.title,
  }));

const formatOriginalGif = gif => ({
  url: gif.images.original.url,
  height: gif.images.original.height,
  width: gif.images.original.width,
  slug: gif.slug,
  username: gif.username,
  rating: gif.rating,
});

export default {
  formatFixedHeightGifs,
  formatOriginalGif,
};
