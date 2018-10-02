import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { withNavigation } from 'react-navigation';

export default class ToDoEdit extends React.Component {
    constructor(){
        super()
        this.state = {
        }
    }
    static navigationOptions = {
        title: 'Todo Edit',
      };

  render() {
      const message = this.props.navigation.getParam('message', 'NO_MESSAGE');
    return (
      <View style={styles.container}>
        <Text> </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
