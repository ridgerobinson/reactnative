import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const body = 'Hello Ridge,\n\nYour app is amazing! I would like to get in touch with you. Please let me know when you can chat!.\n\nThanks!';
const subject = 'Email From Your App';

class ContactScreen extends Component {
  static navigationOptions = {
    title: 'Contact',
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="send" size={30} color={tintColor} />
      }
    }
  }

  render() {
    return(
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{ uri: 'http://ridgerobinson.com/images/ridgerobinson_profilepicture.png' }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.contactText}>
            Thanks for your interest! There are many ways to contact me, please find a suitable method below! Talk to you soon.
          </Text>
          <View style={styles.contactOptions}>
            <View style={styles.contactTypes}>
              <TouchableOpacity onPress={() => Linking.openURL('http://www.facebook.com/ridgescores')}>
                <Image style={styles.contactTypesImage} source={{ uri: 'http://ridgerobinson.com/images/contact_facebook.png' }} />
                <Text style={{ textAlign: 'center' }}>Facebook Me</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contactTypes}>
              <TouchableOpacity onPress={() => Linking.openURL('http://www.instagram.com/ridgescores')}>
                <Image style={styles.contactTypesImage} source={{ uri: 'http://ridgerobinson.com/images/contact_instagram.png' }} />
                <Text style={{ textAlign: 'center' }}>Instagram Me</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contactTypes}>
              <TouchableOpacity onPress={() => Linking.openURL(`mailto:ridgescores@gmail.com?subject=${subject}&body=${body}`)}>
                <Image style={styles.contactTypesImage} source={{ uri: 'http://ridgerobinson.com/images/contact_gmail.png' }} />
                <Text style={{ textAlign: 'center' }}>Email Me</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  imageView: {
    alignItems: 'center',
    margin: 20
  },
  image: {
    height: 198,
    width: 148,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  content: {
    marginLeft: 20,
    marginRight: 20
  },
  contactText: {
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontSize: 18
  },
  contactOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  contactTypes: {
    alignItems: 'center'
  },
  contactTypesImage: {
    height: 80,
    width: 80
  }
}

export default ContactScreen;
