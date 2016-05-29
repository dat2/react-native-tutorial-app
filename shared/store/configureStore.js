import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import reducer from '../modules/root';
import moviesSaga from '../sagas/moviesSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configureStore(initialState = undefined) {
  // mount it on the Store
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger),
    initialState
  );

  // then run the sagas
  sagaMiddleware.run(moviesSaga);

  return store;
}
