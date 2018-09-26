import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage } from 'react-native';


export default class App extends React.Component {

  constructor() {
        super()
        this.state = {
                YearMonthDay: "Loading"
        }
      }

  async test() {
        try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this._storeData(year, month, day)
        this._retrieveData()
        console.warn(action, year, month, day)
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  } 

  _storeData = async (year, month, day) => {
  try {
    await AsyncStorage.setItem('YearMonthDay', year + "" + month + "" + day);
  } catch (error) {
    // Error saving data
  }
}

  _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('YearMonthDay');
    if (value !== null) {
      // We have data!!
      console.log(value);
      this.setState({YearMonthDay: YearMonthDay})
    }
   } catch (error) {
     // Error retrieving data
     console.warn(error)
   }
}

  componentDidMount() {
      this._retrieveData()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={()=>this.test()}
        >
        <Text>{ this.state.YearMonthDay}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
