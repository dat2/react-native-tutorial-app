import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';

import { createFetchMoviesAction } from '../modules/moviesModule';

const mapStateToProps = ({ movies }) => ({
  loading: movies.get('loading'),
  error: movies.get('error'),
  movies: movies.get('movies')
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: createFetchMoviesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
