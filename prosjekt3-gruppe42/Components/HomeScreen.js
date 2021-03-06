import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Picker
} from "react-native";
import { ProgressBar } from "react-native-paper";
import ToDo from "./ToDo/ToDo.js";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { addColor, headerColor } from "../assets/styles";
import { Location, Permissions } from "expo";
import {
  haversine,
  sortKey,
  sortTitle,
  sortPriority,
  sortDate
} from "../functions";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      // This one isn't either
      YearMonthDay: "Loading",
      todos: [],
      // Don't think this is needed at all
      location: {
        latitude: 0,
        longitude: 0
      },
      currentLocation: {
        latitude: 0,
        longitude: 0
      },
      sortMethod: sortDate,
      pickerValue: 0,
      sortMethods: [
        sortDate,
        this.sortDistance.bind(this),
        sortTitle,
        sortKey,
        sortPriority
      ]
    };
  }

  static navigationOptions = {
    title: "Todo"
  };

  componentDidMount() {
    this._retrieveData();
    this._getLocationAsync();
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(this.state.todos));
    } catch (error) {
      console.warn("Store data error" + error);
    }
  };

  _retrieveData = async () => {
    try {
      // await AsyncStorage.clear();
      const value = await AsyncStorage.getItem("todos");
      if (value !== null) {
        this.setState({ todos: JSON.parse(value) });
      }
    } catch (error) {
      console.warn("Retrieve data error" + error);
    }
  };

  // https://docs.expo.io/versions/latest/sdk/location.html
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync();
    // This might go boom
    this.setState({ currentLocation: location.coords });
  };

  handleTodoAdd(data) {
    this.setState(
      prevState => ({
        todos: [...prevState.todos, data]
      }),
      this._storeData
    );
  }

  navigate(place) {
    this.props.navigation.navigate(place);
  }

  onChangeTodo(data) {
    let oldState = this.state;
    for (let i = 0; i < oldState.todos.length; i++) {
      if (oldState.todos[i].key == data.key) {
        oldState.todos[i] = data;
      }
    }
    this.setState(oldState, this._storeData);
  }

  onDeleteTodo(data) {
    let oldState = this.state;
    for (let i = 0; i < oldState.todos.length; i++) {
      if (oldState.todos[i].key == data.key) {
        oldState.todos.splice(i, 1);
      }
    }
    this.setState(oldState, this._storeData);
  }

  sortDistance(x, y) {
    // We used to accept undefined locations so we needed these checks to allow for them to be sorted
    // This is not needed anymore, but just in case we wont delete them.
    if (x.location[0] && y.location[0]) {
      return (
        haversine(this.state.currentLocation, x.location[0]) -
        haversine(this.state.currentLocation, y.location[0])
      );
    } else if (x.location[0]) {
      return -1;
    } else if (y.location[0]) {
      return 1;
    }
    return 0;
  }

  render() {
    const sortedList = this.state.todos
      .sort(this.state.sortMethod)
      // Adds the completed todos before the non-completed ones.
      .sort((x, y) => (x.completed ? 1 : y.completed ? -1 : 0));

    return (
      <View style={styles.container}>
        <ProgressBar
          progress={
            this.state.todos.filter(x => x.completed).length /
            this.state.todos.length
          }
          style={{ width: "90%", alignSelf: "center" }}
          color={headerColor}
        />
        <FlatList
          extraData={this.state}
          data={sortedList}
          keyExtractor={(item, index) => item.key}
          renderItem={({ item }) => (
            <ToDo
              data={item}
              currentLocation={this.state.currentLocation}
              onChangeTodo={this.onChangeTodo.bind(this)}
              onDeleteTodo={this.onDeleteTodo.bind(this)}
            />
          )}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                marginLeft: 5
              }}
            >
              Sort by
            </Text>
            <Picker
              selectedValue={this.state.pickerValue}
              style={{
                height: 50,
                width: 140,
                alignSelf: "center",
                marginLeft: 5
              }}
              onValueChange={(itemValue, itemPosition) =>
                this.setState({
                  sortMethod: this.state.sortMethods[itemValue],
                  pickerValue: itemPosition
                })
              }
            >
              <Picker.Item label="Date" value={0} />
              <Picker.Item label="Distance" value={1} />
              <Picker.Item label="Title" value={2} />
              <Picker.Item label="Key" value={3} />
              <Picker.Item label="Priority" value={4} />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() =>
              this.props.navigation.navigate("Map", {
                data: this.state.todos
              })
            }
          >
            <Feather name="map" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() =>
              this.props.navigation.navigate("Add", {
                itemId: 86,
                message: "anything you want here",
                handleTodoAdd: this.handleTodoAdd.bind(this)
              })
            }
          >
            <MaterialIcons name="add" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "stretch",
    justifyContent: "center"
  },
  button: {
    margin: 10,
    width: "50%",
    alignSelf: "center"
  },
  roundButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: addColor,
    borderRadius: 60,
    margin: 10
  },
  mapButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: headerColor,
    borderRadius: 60,
    margin: 10
  }
});
