import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage, Picker} from 'react-native';
import { TextInput, Button, Switch, Searchbar, HelperText } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { Constants, Location, Permissions, MapView} from 'expo';
import { saveColor, underlineColor, dateColor } from '../assets/styles'

export default class ToDoEdit extends React.Component {
    constructor(){
        super()
        this.state = {
        }
    }
    static navigationOptions = {
        title: 'Edit Todo',
      };

  componentWillMount() {
    let data = this.props.navigation.getParam("data")
    this.setState(data)
  }

  async pickDate() {
      try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(this.state.date.year, this.state.date.month, this.state.date.day)
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day
      this.setState({date: {year: year, month: month, day: day}})
      // console.warn(action, year, month, day)
    }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  _updateTodoCoordinates = async (place) => {
    console.log(place)
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let coords = await Location.geocodeAsync(place)

    if (coords.length != 0) {
      this.setState({ location: coords })
      this.setState({searched: true})
    }
    else {
      this.setState({
        helperText: "Please select at valid location",
        searched: false,
      })
    }
  }

  render() {
    const message = this.props.navigation.getParam('message', 'NO_MESSAGE');
    console.log("render", this.state)
    return (
      <View style={styles.container}>
        <TextInput
            label="Name"
            style={styles.textBox}
            underlineColor = { underlineColor }
            onChangeText={(text) => this.setState({title:text})}
            value={this.state.title} />
        <TextInput
            label="Description"
            style={styles.textBox}
            multiline={true}
            underlineColor = { underlineColor }
            onChangeText={(text) => this.setState({description:text})} value={this.state.description} />

        <Searchbar placeholder="Location" style={styles.textBox}
          onIconPress={(data) => this._updateTodoCoordinates(this.state.searchbar)}
          onChangeText={query => this.setState({searchbar: query})} value={this.state.searchbar}/>

        <HelperText type="error" visible={ !this.state.searched }>{this.state.helperText}</HelperText>
            <Picker
                selectedValue={this.state.priority}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) => this.setState({priority: itemValue})}>
                <Picker.Item label="High priority" value={2} />
                <Picker.Item label="Medium priority" value={1} />
                <Picker.Item label="Low priority" value={0} />
            </Picker>
            <View style={styles.switchContainer}>
            <Text> Completed: </Text>
            <Switch
                value={this.state.completed}
                color={underlineColor}
                onValueChange={() =>
                    { this.setState({ completed: !this.state.completed }); }
                }
            />
            </View>
            <Button mode="contained" color={ dateColor } style={styles.button} title="Date" onPress={()=>this.pickDate()}> Date </Button>

        <Button mode="contained" dark={ true }  color={ saveColor } style={styles.button} title="Save"
          onPress={() => {this.props.navigation.getParam('onChangeTodo')(this.state); this.props.navigation.goBack()}}> Save </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  switchContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    margin:10,
    width:'50%',
  },
  textBox: {
    margin:10,
    width:'80%',
    backgroundColor: '#f5f5f5'
  }
});
