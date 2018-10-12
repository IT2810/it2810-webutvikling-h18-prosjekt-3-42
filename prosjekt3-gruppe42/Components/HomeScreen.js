import React from 'react';
import { StyleSheet, Text, View,FlatList,  TouchableOpacity, DatePickerAndroid, AsyncStorage, Picker } from 'react-native';
import {Button} from 'react-native-paper';
import ToDo from './ToDo.js'
import { MaterialIcons } from '@expo/vector-icons';
import { addColor } from '../assets/styles';
import { Constants, Location, Permissions, MapView } from 'expo';
import { haversine, toRadians } from '../functions';


export default class HomeScreen extends React.Component {
  constructor() {
        super()
        this.state = {
                YearMonthDay: "Loading",
                todos: [],
                location: {
                    latitude: 0,
                    longitude: 0,
                },
                currentLocation: {
                  latitude: 0,
                  longitude: 0,
                },
                sortMethod: this.sortDate,
                pickerValue: 0,
                sortMethods: [this.sortDate.bind(this), this.sortDistance.bind(this), this.sortTitle.bind(this), this.sortKey.bind(this)]

        }
      //this.sortDistance = this.sortDistance.bind(this)
      }

  static navigationOptions = {
      title:'Todo'
  }

  componentDidMount() {
      this._retrieveData()
      this._getLocationAsync()
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
    let location = await Location.getCurrentPositionAsync();
    // This might go boom
    this.setState({ currentLocation: location.coords }, console.log("Currentlocation coords:", location.coords))
  };


  handleTodoAdd( data ) {
      this.setState(prevState => ({
          todos: [...prevState.todos, data]
      }),this._storeData)

      //console.log(this.state.todos)
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

  sortKey(x, y, reverse = false){
    if (reverse) {
        return -(parseInt(x.key) - parseInt(y.key))
    } else {
        return parseInt(x.key) - parseInt(y.key)
    }
  }
  sortTitle(x, y, reverse = false) {
      /*
      if (reverse) {
            console.log("Comparing", x.title, y.title, "result ", x.title < y.title);
      } else {
            console.log("Comparing", x.title, y.title, "result ", x.title > y.title);
      }
      */
      sorted  = reverse ? ( x.title > y.title) : ( x.title < y.title)
      return sorted ? 1 : -1;
  }

  sortDate(x, y) {
      // console.log ( "Date1", x.date.year, x.date.month, x.date.day)
      // console.log ( "Date2", y.date.year, y.date.month, y.date.day)
      // console.log("Date 1 ", new Date ( x.date.year, x.date.month, x.date.day),'Date 2 ', new Date( y.date.year, y.date.month, y.date.day), "date 1 > date 2: ", new Date( x.date.year, x.date.month, x.date.day) > new Date ( y.date.year, y.date.month, y.date.day)  )
      console.log(x.date.year, y.date.year, new Date (x.date.year, x.date.month, x.date.day) - new Date ( y.date.year, y.date.month, y.date.day))
      return new Date (x.date.year, x.date.month, x.date.day) - new Date ( y.date.year, y.date.month, y.date.day);

  }

  sortDistance(x, y) {
    return haversine(this.state.currentLocation, x.location[0]) - haversine(this.state.currentLocation, y.location[0])
  }

  render() {

      // console.log("FILTER ME", this.state.todos.filter(item => this.checkTitle(item)))
      // console.log("SORT ME", this.state.todos.sort((x, y) => this.sortTitle(x, y)))
      // console.log("SORT ME DEUX", this.state.todos.sort((x, y) => x.title > y.title ? 1 : -1))

      const sortedList = this.state.todos.sort(this.state.sortMethod);
      console.log(this.state.sortMethod.name)
      // console.log(this.state)
    return (
      <View style={styles.container}>
         <FlatList
          extraData={this.state}
          data={sortedList}
          keyExtractor={(item, index) => item.key}
          renderItem={({item}) => <ToDo data={item}
          currentLocation={this.state.currentLocation}
          onChangeTodo={this.onChangeTodo.bind(this)}
          onDeleteTodo={this.onDeleteTodo.bind(this)}/>} />
 
        <Picker
            selectedValue={this.state.pickerValue}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemPosition) => this.setState({sortMethod: this.state.sortMethods[itemValue], pickerValue: itemPosition})}>
            <Picker.Item label="Date" value={0}/>
            <Picker.Item label="Distance" value={1} />
            <Picker.Item label="Title" value={2}/>
            <Picker.Item label="Key" value={3} />
        </Picker>

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
