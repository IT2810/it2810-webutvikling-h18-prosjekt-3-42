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

import { MaterialIcons } from "@expo/vector-icons";
import {
  todoBackgroundColor,
  todoEditColor,
  todoDeleteColor,
  todoTitleColor,
  todoDescriptionColor
} from "../../assets/styles";

import { haversine, toRadians } from "../../functions";

export default class ToDoContent extends React.Component {
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
    return (
      <View>
        <Text>
          {// Just in case the location data is undefined
          this.props.data.location[0]
            ? "Distance: " +
              (haversine(
                this.props.currentLocation,
                this.props.data.location[0]
              ) > 5000
                ? Math.round(
                    haversine(
                      this.props.currentLocation,
                      this.props.data.location[0]
                    ) / 1000
                  ) + " km"
                : haversine(
                    this.props.currentLocation,
                    this.props.data.location[0]
                  ).toFixed(0) + " m")
            : "Undefined location"}
        </Text>
        <Text style={styles.description}>{this.props.data.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    borderBottomWidth: 2,
    // borderBottomColor: '#e0e0e0',
    fontSize: 20,
    color: todoTitleColor,
    // padding: 5,
    fontWeight: "bold"
  }
});
