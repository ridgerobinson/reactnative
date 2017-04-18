import React, { Component } from 'react';
import {
  Animated, Modal, PanResponder, View, StatusBar,
  Text, TouchableHighlight, WebView, Dimensions,
  ScrollView, Image, LayoutAnimation, UIManager, Linking
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import PhotoView from 'react-native-photo-view';
import Swiper from 'react-native-swiper';
import YouTube from 'react-native-youtube';
import moment from 'moment';

import HorizontalGallery from '../components/HorizontalGallery';
import Charts from '../components/Chart';
import HomemadeChart from '../components/HomemadeChart';

// Constants
const IMAGES = [
  { id: 1, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/17077227_1440013156063486_6670907744897204224_n.jpg' },
  { id: 2, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/17126313_108693566328923_1572531584563675136_n.jpg' },
  { id: 3, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e35/17076413_1229848383788659_2425501163152474112_n.jpg' },
  { id: 4, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/17125914_1951001701786791_5714016149771911168_n.jpg' },
  { id: 5, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s480x480/e35/17265739_1762282957419953_6339866573553008640_n.jpg' },
  { id: 6, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e35/17127013_1738027549841018_2185512040058060800_n.jpg' },
  { id: 7, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/17125887_123808488146525_8470058245132648448_n.jpg' },
  { id: 8, uri: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/e15/17076357_1650505058588045_4691924180839432192_n.jpg' },
];
const FACTS = [
  { id: 1, location: 'http://ridgerobinson.com/images/app/otherfacts_mensa.png', fact: 'I became a Mensa Member in March, 2017' },
  { id: 2, location: 'http://ridgerobinson.com/images/app/otherfacts_coastal.png', fact: 'Graduated from Coastal Carolina University' },
  { id: 3, location: 'http://ridgerobinson.com/images/app/otherfacts_kids.png', fact: 'I am 1 of 6 kids, and the second oldest' },
  { id: 4, location: 'http://ridgerobinson.com/images/app/otherfacts_soccer.png', fact: 'I have played soccer professionally in USA, Canada and Norway' },
  { id: 5, location: 'http://ridgerobinson.com/images/app/otherfacts_dogs.png', fact: 'I love dogs' },
];
const PHYSICAL_GOALS = [
  { id: 1, goal: 'Muscle Ups - 10', date: '2017-05-01', uri: 'https://www.youtube.com/embed/eXJYPBSj9MA?rel=0&autoplay=0&showinfo=0&controls=0' },
  { id: 2, goal: 'Human Flag - 10 Seconds', date: '2017-06-01', uri: 'https://www.youtube.com/embed/bG0h7bSfxQI?rel=0&autoplay=0&showinfo=0&controls=0' },
  { id: 3, goal: 'Front Lever - 10 Seconds', date: '2017-07-01', uri: 'https://www.youtube.com/embed/h44EAv6ExiA?rel=0&autoplay=0&showinfo=0&controls=0' },
  { id: 4, goal: 'Flikkflakk', date: '2017-08-01', uri: 'https://www.youtube.com/embed/ggs6XgZl_oE?rel=0&autoplay=0&showinfo=0&controls=0' },
  { id: 5, goal: 'Standing Backflip', date: '2017-09-01', uri: 'https://www.youtube.com/embed/ltho8_PzC2U?rel=0&autoplay=0&showinfo=0&controls=0' },
  { id: 6, goal: '1-Arm Chinup', date: '2017-10-01', uri: 'https://www.youtube.com/embed/Nj1NvN7Te_s?rel=0&autoplay=0&showinfo=0&controls=0' },
  { id: 7, goal: 'Handstand Pushup', date: '2017-11-01', uri: 'https://www.youtube.com/embed/rghpvUUy7bA?rel=0&autoplay=0&showinfo=0&controls=0' },
  { id: 8, goal: '1-Arm Handstand', date: '2017-12-01', uri: 'https://www.youtube.com/embed/5orjYQupmWo?rel=0&autoplay=0&showinfo=0&controls=0' }
];
const CHARTS = [
  {
    title: 'Favorite Foods',
    subtitle: 'Tap on bar to reveal food item',
    data: [
      { height: 80, color: 'green', label: 'Pineapple Pizza' },
      { height: 95, color: '#3F5169', label: 'Fruit Smoothie' },
      { height: 75, color: 'red', label: 'Chocolate Milk' },
      { height: 10, color: 'orange', label: 'Macaroni and Cheese' },
      { height: 65, color: 'purple', label: 'Honey Bunches of Oats' },
      { height: 35, color: 'blue', label: 'Greek Yogurt' },
    ]
  }
];
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.3 * SCREEN_HEIGHT;
const SWIPE_OUT_DURATION = 250;

const NOW = moment().format();

class AboutScreen extends Component {
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
    title: 'About',
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="person" size={30} color={tintColor} />
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

  renderIntro() {
    return(
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          Welcome!
        </Text>
        <Text style={styles.subHeaderText}>
          My name is Ridge Robinson and I am a UX Engineer and Designer!
        </Text>
        <Text style={[styles.regularText, styles.introText]}>
          Please take a look through my app to learn all about me.
        </Text>
      </View>
    );
  }

  renderWhenNotOnline() {
    return(
      <View style={[styles.section, styles.whenNotOnline]}>
        <Text style={styles.sectionHeaderText}>
          WHEN NOT ONLINE
        </Text>
        <HomemadeChart
          data={CHARTS}
        />
        <Text style={[styles.regularText, styles.textCenter]}>
          Personal Goals
        </Text>
        {this.renderPersonalGoals()}
      </View>
    );
  }

  renderLink(url, text) {
    return(
      <Text style={{color: '#3366BB'}}
            onPress={() => Linking.openURL(url)}>
        {text}
      </Text>
    );
  }

  renderCodeAlong() {
    return(
      <View style={styles.section}>
        <Text style={styles.sectionHeaderText}>
          CODE ALONG
        </Text>
        <Text style={styles.regularText}>
          The following video provides a code-along for some of my development while creating my {this.renderLink('http://www.ridgerobinson.com', 'personal portfolio')}.
        </Text>
        <WebView
          style={{ flex:1, width: SCREEN_WIDTH - 40, height: 300 }}
          javaScriptEnabled={true}
          source={{ uri: 'https://www.youtube.com/embed/Qg5yz0g0zA0?rel=0&autoplay=0&showinfo=0&controls=0' }}
        />
      </View>
    );
  }

  onPressPhysicalGoals = () => {
    this.resetPosition();
    this.setState({ modalVisible: true, modalContent: 'physical goals', statusBar: true });
  }

  renderPersonalGoals() {
    return(
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{'\u2022'}</Text>
          <Text style={styles.bulletPoints}>
            Travel to every capital in the world (plus other major cities and landmarks)
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{'\u2022'}</Text>
          <Text
            onPress={this.onPressPhysicalGoals}
            style={[styles.bulletPoints,styles.link]}
          >
            Assortment of Physical Goals
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{'\u2022'}</Text>
          <Text style={styles.bulletPoints}>
            Net Worth of (roughly) $115,476,130.00
          </Text>
        </View>
      </View>
    );
  }

  renderOtherFacts() {
    return(
      <View style={[styles.section, styles.otherFacts]}>
        <Text style={[styles.sectionHeaderText, styles.otherFactsHeaderText]}>
          OTHER FACTS
        </Text>
        <Swiper
          height={220}
          width={SCREEN_WIDTH - 40}
          horizontal
          autoplay
          autoplayTimeout={5}
        >
          {this.renderFacts(FACTS)}
        </Swiper>
      </View>
    );
  }

  renderFacts(facts) {
    return facts.map((fact) => {
      return(
        <View
          key={fact.id}
          style={styles.slide1}
        >
          <Image
            resizeMode="stretch"
            style={{ width: 120, height: 120 }}
            source={{ uri: fact.location }}
          />
          <Text style={[styles.text, styles.otherFactsText]}>{fact.fact}</Text>
        </View>
      );

    });
  }

  renderPhysicalGoals(goals) {
    return goals.map((goal) => {
      var eventdate = moment(goal.date);
      var todaysdate = moment();
      const daysLeft = eventdate.diff(todaysdate, 'days');
      return(
        <View key={goal.id} style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.textCenter}>{goal.goal}</Text>
          <Text style={styles.daysLeft}>{goal.date} ({daysLeft} days left)</Text>
          <WebView
            style={{ flex:1, width: SCREEN_WIDTH - 40, height: 300 }}
            javaScriptEnabled={true}
            source={{ uri: goal.uri }}
          />
        </View>
      );

    });
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
    } else if (this.state.modalContent == 'physical goals') {
      return (
        <ScrollView
          style={styles.modalViewContent}>
          {/* Header */}
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{ flex: 7, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Physical Goals</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={styles.closeXButton}
                  onPress={this.closeModal}
                >
                  X
                </Text>
              </View>
            </View>
          {/* Separating Line */}
            <View style={{ flex: 1, marginTop: 10, marginBottom: 10, height: 2, backgroundColor: 'rgba(204,204,204,0.5)' }} />
          <Text style={styles.physicalGoals}>
            Be in the <Text style={{ fontWeight: 'bold' }}>top 1%</Text> by being able to accomplish every exercise here. My aggressive timeline is also shown.
          </Text>
          {this.renderPhysicalGoals(PHYSICAL_GOALS)}
       </ScrollView>
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
      return(
        <ScrollView style={styles.container}>
          <StatusBar hidden={this.state.statusBar} barStyle="dark-content" />
          <HorizontalGallery
            data={IMAGES}
            onPress={this.openImage}
          />
          {this.renderIntro()}
          {this.renderWhenNotOnline()}
          {this.renderOtherFacts()}
          {this.renderCodeAlong()}
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
  imageViewContainer: {
    flex: 1,
    backgroundColor: '#000000'
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
  headerView: {
    marginLeft: 10,
    marginRight: 10
  },
  headerText: {
    fontSize: 37,
    fontWeight: 'bold',
    margin: 10
  },
  subHeaderText: {
    fontSize: 21,
    margin: 10
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
    fontSize: 15,
    marginBottom: 5
  },
  introText: {
    margin: 10
  },
  whenNotOnline: {
    marginTop: 20
  },
  otherFacts: {
    backgroundColor: '#FAFAFA',
    marginBottom: 0
  },
  otherFactsHeaderText: {
    // color: '#ffffff'
  },
  otherFactsTitleText: {
    // color: '#ffffff'
  },
  otherFactsText: {
    // color: '#ffffff',
    fontSize: 15,
    marginTop: 10
  },
  chart : {
    width: 200,
		height: 200
  },
  textCenter: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  bulletPoints: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 15
  },
  slide1: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
  },
  link: {
    color: '#3366BB',
  },
  physicalGoals: {
    textAlign: 'center',
    fontSize: 15
  },
  closeXButton: {
    fontSize: 30,
    textAlign: 'right',
    color: 'rgba(0,0,0,0.4)'
  },
  daysLeft: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 5
  }
}

export default AboutScreen;
