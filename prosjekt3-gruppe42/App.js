import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from  './Components/HomeScreen.js';
import ToDoAdd from './Components/ToDoAdd.js';
import ToDoEdit from './Components/ToDoEdit.js';
import ToDoMap from './Components/ToDoMap';
import { headerColor } from './assets/styles.js'


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
    Edit: ToDoEdit,
    Add: ToDoAdd,
    Map: ToDoMap,
  },
  {
      initialRouteName: 'Home',
      navigationOptions: {
          headerStyle: {
              backgroundColor: headerColor,
          },
          headerTintColor:'#fff'
      },
  }
);
