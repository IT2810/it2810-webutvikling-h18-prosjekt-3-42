import React from "react";
import { Surface, Button } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DatePickerAndroid,
  AsyncStorage
} from "react-native";
import { withNavigation } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import {
  todoBackgroundColor,
  todoEditColor,
  todoDeleteColor,
  todoTitleColor,
  todoDescriptionColor
} from "../../assets/styles";
import { haversine, toRadians } from "../../functions";
import ToDoTitle from './ToDoTitle';

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.locale = "nb-no";
    this.months = [
      "januar",
      "februar",
      "mars",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "desember"
    ];
    this.prioColors = ["#8FC93A", "#E4CC37", "#CC2936"];
  }

  render() {
    var date = this.props.data.date.year != "" ? new Date(this.props.data.date.year, this.props.data.date.month, this.props.data.date.day) : new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var completed = this.props.data.completed ? (<MaterialIcons name="check" size={20} color={"green"} />) : null
    return (
      <Surface
        style={
          this.props.data.completed
            ? styles.containerCompleted
            : styles.container
        }>
        <ToDoTitle data={this.props.data} />

        <Text>
          { // Just in case the location data is undefined
            this.props.data.location[0] ? "Distance: " +
            (haversine(this.props.currentLocation, this.props.data.location[0]) > 5000? Math.floor(
                  haversine(this.props.currentLocation, this.props.data.location[0]) / 1000) + " km" :
                 haversine(this.props.currentLocation, this.props.data.location[0]).toFixed(0) + " m")
                 : "Undefined location"
          }
        </Text>
        <Text style={styles.description}>{this.props.data.description}</Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end"
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Edit", {
                data: this.props.data,
                onChangeTodo: this.props.onChangeTodo
              })
            }
            style={{
              alignItems: "center",
              alignSelf: "flex-end",
              justifyContent: "center",
              width: 30,
              height: 30,
              backgroundColor: todoEditColor,
              borderRadius: 30
            }}>
            <MaterialIcons name="edit" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.onDeleteTodo(this.props.data)}
            style={{
              alignItems: "center",
              alignSelf: "flex-end",
              justifyContent: "center",
              width: 30,
              height: 30,
              backgroundColor: todoDeleteColor,
              borderRadius: 30,
              marginLeft: 10
            }}>
            <MaterialIcons name="delete" size={18} color="white" />
          </TouchableOpacity>
        </View>
    </Surface>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: todoBackgroundColor,
    // alignItems: 'center',
    margin: 8,
    flex: 1,
    minHeight: 100,
    padding: 10,
    // justifyContent: 'center',
    elevation: 2
  },
  containerCompleted: {
    backgroundColor: "#eeeeee",
    margin: 8,
    flex: 1,
    minHeight: 100,
    padding: 10,
    // justifyContent: 'center',
    elevation: 2
  },
  title: {
    borderBottomWidth: 2,
    // borderBottomColor: '#e0e0e0',
    fontSize: 20,
    color: todoTitleColor,
    // padding: 5,
    fontWeight: "bold"
  },
  button: {
    width: 18,
    height: 18,
    borderRadius: 9,
    padding: 0
  },
  description: {
    color: todoDescriptionColor
  }
});

export default withNavigation(ToDo);
