import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ScrollView, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';

class HorizontalGallery extends Component {
  state = {
    galleryLoaded: false
  }

  componentDidMount() {
    this.setState({ galleryLoaded: true });
  }

  renderThumbnails () {
    return this.props.data.map((image, i) => {
        return (
          <View
            key={image.id}
            style={styles.card}
          >
            <TouchableHighlight onPress={() => this.props.onPress(image)}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={{ uri: image.uri }}
              />
            </TouchableHighlight>
          </View>
        );
      });
  }

  render () {
    if (!this.state.galleryLoaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        horizontal
      >
        {this.renderThumbnails()}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    margin: 5,
    flexDirection: 'row'
  },
  card: {
    height: 70,
    width: 70,
    backgroundColor: 'skyblue',
    margin: 10,
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: -1
    }
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  }
};

export default HorizontalGallery;
