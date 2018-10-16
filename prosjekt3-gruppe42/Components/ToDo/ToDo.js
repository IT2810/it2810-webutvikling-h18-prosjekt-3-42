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

import ToDoTitle from './ToDoTitle';
import ToDoContent from './ToDoContent';

class ToDo extends React.Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <Surface
        style={
          this.props.data.completed
            ? styles.containerCompleted
            : styles.container
        }>
        <ToDoTitle data={this.props.data} />

        <ToDoContent data={this.props.data} currentLocation={this.props.currentLocation}  />
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
