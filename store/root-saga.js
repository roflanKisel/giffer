import { all, fork } from 'redux-saga/effects';
import { searchGifsSagas } from '../ducks/searchGifs';

function startSagas(...sagas) {
  return function* rootSaga() {
    yield all(sagas.map(saga => fork(saga)));
  };
}

export default startSagas(...searchGifsSagas);
