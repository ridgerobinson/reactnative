import React, { Component } from 'react';
import {
  Animated, Modal, PanResponder, View, StatusBar,
  Text, TouchableHighlight, Dimensions,
  ScrollView, Image, LayoutAnimation, UIManager
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

import HorizontalGallery from '../components/HorizontalGallery';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.3 * SCREEN_HEIGHT;
const SWIPE_OUT_DURATION = 250;

class ProjectScreen extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.setState({
          movingPicture: true
        });
        position.setValue({ x: 0, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > SWIPE_THRESHOLD) {
          this.forceSwipe('down');
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          this.forceSwipe('up');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = {
      panResponder,
      position,
      modalVisible: false,
      statusBar: false,
      movingPicture: false
    }
  }

  static navigationOptions = {
    title: 'Project',
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="apps" size={30} color={tintColor} />
      }
    }
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  resizeImage(image, width, height) {
    const widthRatio = width/SCREEN_WIDTH;
    const heightRatio = height/SCREEN_HEIGHT;

    // Does Image Need Resizing?
      // No
        if (width <= SCREEN_WIDTH && height <= SCREEN_HEIGHT) {
          this.setState({ uri: image.uri, modalVisible: true, modalContent: 'image', statusBar: true, imageWidth: width, imageHeight: height, });
        }
      // Yes
        // Compare image proportions to screen proportions for proper scaling
          // Image has larger width than height proportionally to screen size
            if (widthRatio > heightRatio) {
              const newWidth = SCREEN_WIDTH;
              const newHeight = height / widthRatio;
              this.setState({ uri: image.uri, modalVisible: true, modalContent: 'image', statusBar: true, imageWidth: newWidth, imageHeight: newHeight, });
            }
          // Image has larger height than width proportionally to screen size
            else if (widthRatio < heightRatio) {
              const newHeight = SCREEN_HEIGHT;
              const newWidth = width / heightRatio;
              this.setState({ uri: image.uri, modalVisible: true, modalContent: 'image', statusBar: true, imageWidth: newWidth, imageHeight: newHeight, });
            }
          // Image height and width are proportionally equal to screen size but larger than it
            else {
              const newHeight = SCREEN_HEIGHT;
              const newWidth = SCREEN_WIDTH;
              this.setState({ uri: image.uri, modalVisible: true, modalContent: 'image', statusBar: true, imageWidth: newWidth, imageHeight: newHeight, });
            }
  }

  openImage = (image) => {
    Image.getSize(image.uri, (width, height) => {
      this.resizeImage(image, width, height);
    }, (error) => {
      console.error(`Couldn't get the image size: ${error.message}`);
    });
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
      statusBar: false
    });
    this.resetPosition();
  }

  forceSwipe(direction) {
    const y = direction === 'up' ? -SCREEN_HEIGHT : SCREEN_HEIGHT;
    Animated.timing(this.state.position, {
      toValue: { x: 0, y },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.closeModal());
  }

  renderProject(project) {
    const { name, subtitle, experience, codeSnippet, images } = project;
    return(
      <View>
        <Text style={styles.projectName}>{ name }</Text>
        <Text style={styles.projectSubTitle}>{ subtitle }</Text>
        <HorizontalGallery
          data={ images }
          onPress={this.openImage}
        />
        {this.renderExperienceSection(experience)}
      </View>
    );
  }

  renderExperienceSection(experience) {
    return(
      <View style={styles.section}>
        <Text style={styles.sectionHeaderText}>
          EXPERIENCE
        </Text>
        <HTMLView
          value={experience}
          stylesheet={styles}
        />
        {/* <Text style={[styles.regularText]}>
          { experience }
        </Text> */}
      </View>
    );
  }

  renderModalContent() {
    if (this.state.modalContent == 'image') {
      return(
        <Animated.View
          {...this.state.panResponder.panHandlers}
          style={[this.state.position.getLayout(),styles.modalViewImage]}>
         {/* <PhotoView
           source={{uri: this.state.uri }}
           onTap={this.closeImage}
           maximumZoomScale={3}
           androidScaleType="center"
           style={{
             resizeMode: 'contain',
             width: this.state.imageWidth,
             height: this.state.imageHeight
           }}
         /> */}
         <Image
           source={{uri: this.state.uri }}
           style={{
             resizeMode: 'contain',
             width: this.state.imageWidth,
             height: this.state.imageHeight
           }}
         />
       </Animated.View>
      );
    }
  }

  renderModal() {
    return(
      <Modal
        animationType={"fade"}
        transparent={true}
        swipeToClose
        visible={this.state.modalVisible}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }

  render() {
    const { project } = this.props.navigation.state.params;
    return(
      <ScrollView style={styles.container}>
        <StatusBar hidden={this.state.statusBar} />
        {this.renderProject(project)}
        {this.renderModal()}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  projectName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  },
  projectSubTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10
  },
  regularText: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10
  },
  section: {
    backgroundColor: '#F2F2F2',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth: 1,
    flex: 1
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  codeSnippetSection: {
    backgroundColor: '#FAFAFA'
  },
  modalViewImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  modalViewContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20
  },
}

export default ProjectScreen;
