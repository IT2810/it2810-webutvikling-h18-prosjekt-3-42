import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { withNavigation } from 'react-navigation';

export default class ToDoEdit extends React.Component {
    constructor(){
        super()
        this.state = {
          data: {}
        }
    }
    static navigationOptions = {
        title: 'Todo Edit',
      };
  
  componentDidMount() {
    let data = this.props.navigation.getParam("data")
    this.setState({data}, console.log(this.state))
  }

  async pickDate() {
      try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(this.state.data.date.year, this.state.data.date.month, this.state.data.date.day)
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day
      this.setState({date: {year: year, month: month, day: day}})
      // console.warn(action, year, month, day)
    }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  } 

  render() {
      const message = this.props.navigation.getParam('message', 'NO_MESSAGE');
      this.props.navigation.getParam("onChangeTodo")("HEi, dette funker nesten")
      console.log(this.state)
    return (
      <View style={styles.container}>
        <TextInput
            label="Name"
            style={styles.textBox}
            underlineColor = '#f4511e'
            onChangeText={(text) => this.setState({data: {title:text}})} 
            value={this.state.data.title} />
        <TextInput
            label="Description"
            style={styles.textBox}
            multiline={true}
            underlineColor = '#f4511e'
            onChangeText={(text) => this.setState({description:text})} value={this.state.data.description} />

            <Button mode="contained" color='#f4511e' style={styles.button} title="Date" onPress={()=>this.pickDate()}> Date </Button>

        <Button mode="contained"  color='#f4511e' style={styles.button} title="Save" 
          onPress={() => {this.props.navigation.getParam('onChangeTodo')(this.state); this.props.navigation.goBack()}}> Save </Button>
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
  button: {
    margin:10,
    width:'50%',
  },
  textBox: {
    margin:10,
    width:'50%',
    backgroundColor: '#f5f5f5'
}
});
