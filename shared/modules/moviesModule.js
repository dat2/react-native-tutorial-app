import Immutable from 'immutable';

// action types
export const FETCH_MOVIES_REQUESTED = '@@MovieLister/FETCH_MOVIES_REQUESTED';
export const FETCH_MOVIES_LOADING = '@@MovieLister/FETCH_MOVIES_LOADING';
export const FETCH_MOVIES_SUCCESS = '@@MovieLister/FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILED = '@@MovieLister/FETCH_MOVIES_FAILED';

// actions
export function createFetchMoviesAction() {
  return { type: FETCH_MOVIES_REQUESTED };
}

export function createFetchMoviesLoadingAction() {
  return { type: FETCH_MOVIES_LOADING };
}

export function createFetchMoviesSuccessAction({ movies }) {
  return { type: FETCH_MOVIES_SUCCESS, payload: { movies: Immutable.fromJS(movies) } };
}

export function createFetchMoviesFailedAction({ error }) {
  return { type: FETCH_MOVIES_FAILED, error };
}

// reducer
const initialState = Immutable.fromJS({
  loading: false,
  error: null,
  movies: { movies: [], links: [], total: 0 }
});
export default function(state = initialState, action) {
  switch(action.type) {
  case FETCH_MOVIES_LOADING:
    return state.set('loading', true);

  case FETCH_MOVIES_SUCCESS:
    return state.set('loading', false)
      .set('movies', action.payload.movies);

  case FETCH_MOVIES_FAILED:
    return state.set('loading', false)
      .set('error', action.error);

  default:
    return state;
  }
}
