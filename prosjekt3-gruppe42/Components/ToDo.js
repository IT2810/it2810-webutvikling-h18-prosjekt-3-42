import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage, Button } from 'react-native';

export default class ToDo extends React.Component {
  render() {
    return (
    <View style={styles.container}>
        <Text> {this.props.data.title} </Text>
        <Text> {this.props.data.date} </Text>
        <Text> {this.props.data.description} </Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
