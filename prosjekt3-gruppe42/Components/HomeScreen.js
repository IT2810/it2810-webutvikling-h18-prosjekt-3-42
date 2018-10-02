import React from 'react';
import { StyleSheet, Text, View,FlatList,  TouchableOpacity, DatePickerAndroid, AsyncStorage} from 'react-native';
import {Button} from 'react-native-paper';
import ToDo from './ToDo.js'
import { MaterialIcons } from '@expo/vector-icons';


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

_storeData = async () => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
  } catch (error) {

    console.warn("Store data error" + error);
  }
}

_retrieveData = async () => {
  try {
    // await AsyncStorage.clear();
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

  navigate(place) {
    this.props.navigation.navigate(place)
  }

  onChangeTodo(data) {
    let oldState = this.state
    let index = oldState.todos.indexOf(data)
    console.log(index)
  }

  render() {
      const todoList = this.state.todos.map((x, i) => <ToDo navigator={this.navigate.bind(this)} key={i} data={x} />)
    return (
      <View style={styles.container}>
         <FlatList data={this.state.todos} keyExtractor={(item, index) => item.key} renderItem={({item}) => <ToDo data={item} onChangeTodo={this.onChangeTodo.bind(this)} />} />
        {/*<Button
          title="Go to Details"
          mode="contained"
          color='#f4511e'
          style={styles.button}
          onPress={() => {
            // 1. Navigate to the Details route with params
            this.props.navigation.navigate('Add', {
              itemId: 86,
              message: 'anything you want here',
              handleTodoAdd: this.handleTodoAdd.bind(this)
            });
          }}
            ><MaterialIcons name="edit" size={18} color="white" />
      Add new ToDo </Button>
      */}
          <TouchableOpacity
                onPress={() => 
                  this.props.navigation.navigate('Add', {
                  itemId: 86,
                  message: 'anything you want here',
                  handleTodoAdd: this.handleTodoAdd.bind(this)
                })}
                style={{
                alignItems:'center',
                alignSelf: 'flex-end',
                justifyContent:'center',
                width:60,
                height:60,
                backgroundColor:'#f4511e',
                borderRadius:60,
                margin: 10,
                }}
            >
            <MaterialIcons name="add" size={36} color="white" />
            </TouchableOpacity>
  {/* </FlatList> */}
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  button: {
      margin:10,
      width:'50%',
      alignSelf:'center'
  },
});
