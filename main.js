import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ProjectScreen from './screens/ProjectScreen';
import ProjectsScreen from './screens/ProjectsScreen';

class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      main: {
        screen: TabNavigator({
          about: {
            screen: StackNavigator({
              about: { screen: AboutScreen }
            })
          },
          projects: {
            screen: StackNavigator({
              projects: { screen: ProjectsScreen },
              project: { screen: ProjectScreen }
            })
          },
          contact: {
            screen: StackNavigator({
              contact: { screen: ContactScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          },
          lazyLoad: true
        })
      }
    }, {
      navigationOptions: {
        tabBar: { visible: false }
      },
      lazyLoad: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
