import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage, Button } from 'react-native';

import ToDo from './ToDo.js'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
      title:'Home'
  }
  constructor() {
        super()
        this.state = {
                YearMonthDay: "Loading",
                todos: [],
        }
      }

  async test() {
        try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this._storeData(year, month, day)
        this._retrieveData()
        // console.warn(action, year, month, day)
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

_storeData = async () => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
  } catch (error) {

    console.warn("Store data error" + error);
  }
}

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('todos');
    if (value !== null) {
      // We have data!!
      this.setState({todos: JSON.parse(value)})
      // console.log(value);
    }
   } catch (error) {
     console.warn("Retrieve data error" + error);
   }
}

  componentDidMount() {
      this._retrieveData()
  }

  handleTodoAdd( data ) {
      this.setState(prevState => ({
          todos: [...prevState.todos, data]
      }),this._storeData)

      console.log(this.state.todos)
  }

  render() {
      const todoList = this.state.todos.map((x, i) => <ToDo key={i} data={x}  />)
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity
            onPress={()=>this.test()}
        >
        <Text>{ this.state.YearMonthDay}</Text>
        </TouchableOpacity> */}
        {todoList}
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Edit', {
              itemId: 86,
              message: 'anything you want here',
              handleTodoAdd: this.handleTodoAdd.bind(this)
            });
          }}
        />
      </View>
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
