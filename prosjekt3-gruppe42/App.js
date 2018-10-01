import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from  './Components/HomeScreen.js';
import ToDoAdd from './Components/ToDoAdd.js';


export default class App extends React.Component {
  render() {
    return (
       <RootStack />
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Edit: ToDoAdd,
  },
  {
      initialRouteName: 'Home',
      navigationOptions: {
          headerStyle: {
              backgroundColor: '#f4511e',
          },
          headerTintColor:'#fff'
      },
  }
);
