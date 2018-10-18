import React from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./Components/HomeScreen.js";
import ToDoAdd from "./Components/ToDoAdd.js";
import ToDoEdit from "./Components/ToDoEdit.js";
import ToDoMap from "./Components/ToDoMap";
import { headerColor } from "./assets/styles.js";

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Edit: ToDoEdit,
    Home: HomeScreen,
    Add: ToDoAdd,
    Map: ToDoMap
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: headerColor
      },
      headerTintColor: "#fff"
    }
  }
);
