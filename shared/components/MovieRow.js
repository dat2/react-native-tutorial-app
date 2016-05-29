import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, Dimensions, TouchableHighlight, Modal } from 'react-native';
import Color from 'color';
import { background, main, ios7colours } from './colours';

const underlayColor = Color(background.row).darken(0.2).rgbString();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ios7colours.white,
    width: Dimensions.get('window').width,
    borderBottomColor: main.spaceGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: ios7colours.white
  },
  modalBar: {
    height: 30,
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 5,
    borderBottomColor: main.spaceGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  modalBarContents: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  modalContents: {
    flex: 1,
    backgroundColor: ios7colours.lightGray
  },
  close: {
    color: main.blue
  }
});

class MovieModal extends Component {
  render() {

    const {
      movie: {
        title, year,
        posters: { thumbnail },
        release_dates: { theater },
        ratings: { critics_rating, critics_score, audience_rating, audience_score }
      },
      visible, setVisible
    } = this.props;

    // console.log(this.props.movie);

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        >
        <View style={styles.modal}>
          {/* Close button bar */}
          <View style={styles.modalBar}>
            <View style={styles.modalBarContents}>
              <Text style={styles.close} onPress={() => setVisible(false)}>Close</Text>
            </View>
          </View>

          <View style={styles.modalContents}>
            {/* The actual row */}
            <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
            <View>
              <Text>Title: { title }</Text>
              <Text>Year: { year }</Text>
              <Text>Release Date: { theater }</Text>
              <Text>Critic Rating: { critics_rating } { critics_score }% </Text>
              <Text>Audience Rating: { audience_rating } { audience_score }% </Text>
            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

class MovieRow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  onPress() {
    this.setState({ modalVisible: true });
  }

  render() {
    const { title, year, posters: { thumbnail } } = this.props;
    const { modalVisible } = this.state;

    return (
      <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor={underlayColor}>
        <View style={styles.container}>

          {/* The modal that shows more information */}
          <MovieModal visible={modalVisible} setVisible={(modalVisible) => this.setState({ modalVisible })} movie={this.props} />

          {/* The actual row */}
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{ title }</Text>
            <Text style={styles.year}>{ year }</Text>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
}

export default MovieRow;
