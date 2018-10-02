import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default class ToDoAdd extends React.Component {
    constructor(){
        super()
        this.state = {
            title: "",
            date: {year:"", month:"", day:""},
            description:""
        }
    }
    static navigationOptions = {
        title: 'Todo Add',
      };

      async pickDate() {
            try {
          const {action, year, month, day} = await DatePickerAndroid.open({
            // Use `new Date()` for current date.
            // May 25 2020. Month 0 is January.
            date: new Date()
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
      // console.log(this.props.navigation.getParam('wtf'))
      //fdfkdfjk
    return (
      <View style={styles.container}>
        <TextInput
            label="Name"
            style={styles.textBox}
            underlineColor = '#f4511e'
            onChangeText={(text) => this.setState({title:text})} value={this.state.title} />
        <TextInput
            label="Description"
            style={styles.textBox}
            multiline={true}
            underlineColor = '#f4511e'
            onChangeText={(text) => this.setState({description:text})} value={this.state.description} />

            <Button mode="contained" color='#f4511e' style={styles.button} title="Date" onPress={()=>this.pickDate()}> Date </Button>

        <Button mode="contained"  color='#f4511e' style={styles.button} title="Save" onPress={() => this.props.navigation.getParam('handleTodoAdd')(this.state)}> Save </Button>
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
