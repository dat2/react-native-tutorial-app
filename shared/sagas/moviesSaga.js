import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';

import {
  FETCH_MOVIES_REQUESTED,
  createFetchMoviesLoadingAction,
  createFetchMoviesSuccessAction,
  createFetchMoviesFailedAction
} from '../modules/moviesModule';

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

function saveToStorage(movies) {
  return AsyncStorage.setItem('@@MovieLister/movies', movies);
}

function getFromStorage() {
  return AsyncStorage.getItem('@@MovieLister/movies');
}

function getMovies() {
  return getFromStorage()
    .then(value => {
      console.log('Movies were cached.');
      if(value === null) {
        throw new Error('Movies not cached!');
      }
      return value;
    })
    .catch(err => fetch(REQUEST_URL).then(res => res.json()));
}

function* fetchMovies() {
  yield put(createFetchMoviesLoadingAction());

  try {
    // fetch the data
    const movies = yield call(getMovies);
    yield put(createFetchMoviesSuccessAction({ movies }));
  } catch(error) {
    yield put(createFetchMoviesFailedAction({ error }));
  }
}

function* moviesSaga() {
  yield takeLatest(FETCH_MOVIES_REQUESTED, fetchMovies);
}

export default moviesSaga;
