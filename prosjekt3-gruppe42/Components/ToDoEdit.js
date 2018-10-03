import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { saveColor, underlineColor, dateColor } from '../assets/styles'

export default class ToDoEdit extends React.Component {
    constructor(){
        super()
        this.state = {
        }
    }
    static navigationOptions = {
        title: 'Todo Edit',
      };
  
  componentWillMount() {
    let data = this.props.navigation.getParam("data")
    this.setState(data)
  }

  async pickDate() {
      try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(this.state.date.year, this.state.date.month, this.state.date.day)
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
    console.log("render", this.state)
    return (
      <View style={styles.container}>
        <TextInput
            label="Name"
            style={styles.textBox}
            underlineColor = { underlineColor }
            onChangeText={(text) => this.setState({title:text})} 
            value={this.state.title} />
        <TextInput
            label="Description"
            style={styles.textBox}
            multiline={true}
            underlineColor = { underlineColor }
            onChangeText={(text) => this.setState({description:text})} value={this.state.description} />

            <Button mode="contained" color={ dateColor } style={styles.button} title="Date" onPress={()=>this.pickDate()}> Date </Button>

        <Button mode="contained" dark={ true }  color={ saveColor } style={styles.button} title="Save" 
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
    width:'80%',
    backgroundColor: '#f5f5f5'
}
});
