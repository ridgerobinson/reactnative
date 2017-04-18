import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class WelcomeScreen extends Component {
  onEnter = () => {
    this.props.navigation.navigate('main');
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar
         barStyle="light-content"
       />
        <View style={styles.headerSection}>
          <Image
            source={require('../assets/img/image.png')}
            style={styles.imageStyle}
          />
          <Text style={styles.name}>Ridge Robinson</Text>
          <Text style={styles.subname}>Development Portfolio</Text>
        </View>
        <View style={styles.buttonSection}>
          <Button
            large
            Component={TouchableOpacity}
            onPress={this.onEnter}
            buttonStyle={styles.buttonStyle}
            icon={{ name: 'code' }}
            title='ENTER'
          />
        </View>
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Built in React Native</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3F5169'
  },
  headerSection: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerSection: {
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  imageStyle: {
    height: 220,
    width: 220
  },
  name: {
    color: 'white',
    fontSize: 37
  },
  subname: {
    color: 'white',
    fontSize: 26
  },
  buttonStyle: {
    backgroundColor: '#2497EC'
  },
  footerText: {
    color: 'white',
    fontSize: 15
  }
}

export default WelcomeScreen;
