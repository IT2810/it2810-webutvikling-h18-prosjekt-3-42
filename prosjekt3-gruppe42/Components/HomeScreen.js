import React from 'react';
import { StyleSheet, Text, View,FlatList,  TouchableOpacity, DatePickerAndroid, AsyncStorage} from 'react-native';
import {Button} from 'react-native-paper';
import ToDo from './ToDo.js'
import { MaterialIcons } from '@expo/vector-icons';
import { addColor } from '../assets/styles';
import { Constants, Location, Permissions, MapView } from 'expo';



export default class HomeScreen extends React.Component {
  static navigationOptions = {
      title:'Home'
  }
  constructor() {
        super()
        this.state = {
                YearMonthDay: "Loading",
                todos: [],
                location: {
                  coords: {
                    latitude: 0,
                    longitude: 0,
                  }
                },
                position: 
                  [
                    {street: "No position found"}
                  ]
              
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

  // https://docs.expo.io/versions/latest/sdk/location.html
 _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let position = await Location.reverseGeocodeAsync(location.coords)
    this.setState({ location: location }, console.log(position));
    this.setState({ position: position })
    //let coords = await Location.geocodeAsync("Storgata 1, Oslo")
    //console.log("Coords:", coords)
    console.log( Location.geocodeAsync("Storgata 1, Oslo"))
  };

  componentDidMount() {
      this._retrieveData()
      this._getLocationAsync()
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
    for (let i = 0; i < oldState.todos.length; i++) {
      if (oldState.todos[i].key == data.key) {
        oldState.todos[i] = data
      }
    }
    this.setState(oldState, this._storeData)
  }

  onDeleteTodo(data) {
    let oldState = this.state
    for (let i = 0; i < oldState.todos.length; i++) {
      if (oldState.todos[i].key == data.key) {
        oldState.todos.splice(i, 1)
      }
    }
    this.setState(oldState, this._storeData)
  }

  render() {
      const todoList = this.state.todos.map((x, i) => <ToDo navigator={this.navigate.bind(this)} key={i} data={x} />)
      let map = this.state.location.coords.longitude !== 0 ? <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/> : <Text>Please wait for the gps coords to load</Text>

    return (
      <View style={styles.container}>
         <FlatList 
         extraData={this.state} 
         data={this.state.todos} 
         keyExtractor={(item, index) => item.key} 
         renderItem={({item}) => <ToDo data={item} 
                                  onChangeTodo={this.onChangeTodo.bind(this)}
                                  onDeleteTodo={this.onDeleteTodo.bind(this)}/>} />
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
                backgroundColor: addColor,
                borderRadius:60,
                margin: 10,
                }}
            >
            <MaterialIcons name="add" size={36} color="white" />
            </TouchableOpacity>
            <Text>{ this.state.position[0].street }</Text>
            {map}
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
