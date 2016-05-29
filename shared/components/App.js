import React, { Component } from 'react';
import { StyleSheet, ListView, View, Text, ActivityIndicatorIOS } from 'react-native';
import MovieRow from './MovieRow';
import SearchBar from 'react-native-search-bar';

import { background, main } from './colours';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background.default
  },
  listView: {
    backgroundColor: background.default
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.props.fetchMovies();
  }

  componentWillUpdate(nextProps) {
    // Immutable yaya :D
    if(this.props.movies !== nextProps.movies) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.movies.get('movies').toJS())
      });
    }
  }

  renderMovie(movie) {
    return <MovieRow {...movie} />;
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS color={main.green} />
        <Text> The movies are loading... </Text>
      </View>
    );
  }

  updateFilter(text) {
    const { movies } = this.props;

    const filteredMovies = movies.get('movies').toJS()
      .filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredMovies)
    });
  }

  onChangeText(searchText) {
    this.updateFilter(searchText);
  }

  onSearchButtonPress(...args) {
    console.log(...args);
  }

  onCancelButtonPress(searchText) {
    this.updateFilter('');
  }

  renderMovieList() {
    const { dataSource } = this.state;

    return (
      <View style={styles.wrapper}>
        <SearchBar
          ref='searchBar'
          placeholder='Search Movies'
          onChangeText={this.onChangeText.bind(this)}
          onSearchButtonPress={this.onSearchButtonPress.bind(this)}
          onCancelButtonPress={this.onCancelButtonPress.bind(this)}
          />
        <View style={styles.container}>
          <ListView dataSource={dataSource} renderRow={this.renderMovie} style={styles.listView} />
        </View>
      </View>
    );
  }

  render() {
    const { loading } = this.props;
    console.log(this.state.searchText);
    return loading ? this.renderLoading() : this.renderMovieList();
  }
}

export default App;
