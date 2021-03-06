import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  todoTitleColor,
} from "../../assets/styles";

import { haversine, toRadians } from "../../functions";

export default class ToDoContent extends React.Component {
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
