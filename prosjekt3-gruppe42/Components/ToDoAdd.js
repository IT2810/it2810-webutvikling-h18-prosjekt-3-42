import React from "react";
import {
  StyleSheet,
  View,
  DatePickerAndroid,
  DatePickerIOS,
  Picker,
  Platform
} from "react-native";
import { TextInput, Button, Searchbar, HelperText } from "react-native-paper";
import { withNavigation } from "react-navigation";
import { saveColor, underlineColor, dateColor } from "../assets/styles";
import { Location, Permissions } from "expo";

class ToDoAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      searchbar: "",
      searched: false,
      key: new Date().getTime().toString(),
      title: "",
      completed: false,
      priority: 0,
      date: { year: "", month: "", day: "" },
      description: "",
      location: {
        latitude: 0,
        longitude: 0
      },
      position: [{ street: "no position found" }],
      helperText: "You must search for a location before saving (Push the icon)"
    };
    var helperText =
      "You must search for a location before saving (Push the icon)";
  }

  static navigationOptions = {
    title: "Add Todo"
  };

  componentDidMount() {
    today = new Date();
    this.setState({
      date: {
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate()
      }
    });
  }

  async pickDate() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ date: { year: year, month: month, day: day } });
        // console.warn(action, year, month, day)
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }

  setIosDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    this.setState({ date: { year: year, month: month, day: day } });
  }

  getIosDate() {
    return new Date(
      this.state.date.year,
      this.state.date.month,
      this.state.date.day
    );
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    let position = await Location.reverseGeocodeAsync(location);
    this.setState({ location: location.coords });
    this.setState({ position: position });
  };

  _updateTodoCoordinates = async place => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let coords = await Location.geocodeAsync(place);

    if (coords.length != 0) {
      this.setState({ location: coords });
      this.setState({ searched: true });
    } else {
      this.setState({
        helperText: "Please select at valid location",
        searched: false
      });
    }
  };

  render() {
    const message = this.props.navigation.getParam("message", "NO_MESSAGE");
    const picker =
      Platform.OS === "android" ? (
        <Button
          mode="contained"
          color={dateColor}
          style={styles.button}
          title="Date"
          onPress={() => this.pickDate()}
        >
          {" "}
          Date{" "}
        </Button>
      ) : (
        <DatePickerIOS date={this.getIosDate} onDateChange={this.setIosDate} />
      );
    return (
      <View style={styles.container}>
        <TextInput
          label="Name"
          style={styles.textBox}
          underlineColor={underlineColor}
          onChangeText={text => this.setState({ title: text })}
          value={this.state.title}
        />
        <TextInput
          label="Description"
          style={styles.textBox}
          multiline={true}
          underlineColor={underlineColor}
          onChangeText={text => this.setState({ description: text })}
          value={this.state.description}
        />

        <Searchbar
          placeholder="Location"
          style={styles.textBox}
          onIconPress={data =>
            this._updateTodoCoordinates(this.state.searchbar)
          }
          onChangeText={query => this.setState({ searchbar: query })}
          value={this.state.searchbar}
        />

        <HelperText type="error" visible={!this.state.searched}>
          {this.state.helperText}
        </HelperText>

        {/* <Button mode="contained" color={ dateColor } style={styles.button} title="Date" onPress={()=>this.pickDate()}> Date </Button> */}
        {picker}
        <Picker
          selectedValue={this.state.priority}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ priority: itemValue })
          }
        >
          <Picker.Item label="High priority" value={2} />
          <Picker.Item label="Medium priority" value={1} />
          <Picker.Item label="Low priority" value={0} />
        </Picker>
        <Button
          mode="contained"
          dark={true}
          color={saveColor}
          style={styles.button}
          title="Save"
          disabled={!this.state.searched}
          onPress={() => {
            this.props.navigation.getParam("handleTodoAdd")(this.state);
            this.props.navigation.goBack();
          }}
        >
          {" "}
          Save{" "}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    margin: 10,
    width: "50%"
  },
  textBox: {
    margin: 10,
    width: "80%",
    backgroundColor: "#f5f5f5",
    elevation: 0
  }
});

export default withNavigation(ToDoAdd);
