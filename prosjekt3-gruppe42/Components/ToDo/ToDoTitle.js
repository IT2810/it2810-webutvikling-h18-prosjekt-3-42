import React from "react";
import {
  StyleSheet,
  Text,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import {
  todoTitleColor,
} from "../../assets/styles";

export default class ToDoTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [
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
      ],
      prioColors: ["#8FC93A", "#E4CC37", "#CC2936"]
    };
  }

  render() {
    var date =
      this.props.data.date.year != ""
        ? new Date(
            this.props.data.date.year,
            this.props.data.date.month,
            this.props.data.date.day
          )
        : new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var completed = this.props.data.completed ? (
      <MaterialIcons name="check" size={20} color={"green"} />
    ) : null;
    return (
      <Text
        style={[
          styles.title,
          { borderBottomColor: this.state.prioColors[this.props.data.priority] }
        ]}
      >
        {this.props.data.title} - Deadline:{" "}
        {day + ". " + this.state.months[month] + " (" + year + ")"} {completed}{" "}
      </Text>
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
