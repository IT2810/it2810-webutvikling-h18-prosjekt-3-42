import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, AsyncStorage, Button, TextInput } from 'react-native';

export default class ToDoEdit extends React.Component {
    constructor(){
        super()
        this.state = {
            title: "",
            date: "2019",
            description:"Lorem ipsum dolar sit amet blalsajasj"
        }
    }
    static navigationOptions = {
        title: 'Todo Edit',
      };
  render() {
      const message = this.props.navigation.getParam('message', 'NO_MESSAGE');
      // console.log(this.props.navigation.getParam('wtf'))
      //fdfkdfjk
    return (
      <View style={styles.container}>
        <Text>Name</Text>
        <TextInput
            style={{height:40, width:80}}
            onChangeText={(text) => this.setState({title:text})} value={this.state.title} />
        <Text> {JSON.stringify(message)} </Text>
        <Button title="test" onPress={() => this.props.navigation.getParam('handleTodoAdd')(this.state)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf:'flex-start'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
