import React from 'react';
import { Surface, Button } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DatePickerAndroid,
    AsyncStorage,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';


class ToDo extends React.Component {
    constructor() {
        super()
        this.locale = "nb-no";
        this.months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
        this.prioColors = ['#8FC93A', '#E4CC37', '#CC2936'];
    }
    render() {
        var date = this.props.data.date.year != "" ? new Date(this.props.data.date.year, this.props.data.date.month, this.props.data.date.day) : new Date()
        // var day = date.toLocaleString(this.locale, { day: "2-digit"})
        // var month = date.toLocaleString(this.locale, {month: "long"})
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        // console.log(date.toLocaleString(this.locale, {year: "numeric"}))
        // var year = this.props.data.date.getFullYear();
        // var month =  this.props.data.date.toLocaleString(locale, {month:'long'});
        return (
        <Surface style={styles.container}>
            <Text style={[styles.title, {borderBottomColor: this.prioColors[0]}]}>{this.props.data.title} - Deadline: {day+ ". " + this.months[month] + ' (' + year + ')' } </Text>
            {/*<Button 
            style={styles.button}
            mode="contained"
            onPress={() => this.props.navigation.navigate("Edit") } 
            title="edit" color='#f4511e'>
            <MaterialIcons name="edit" size={18} color="white" />
            </Button>*/}

            <Text>{this.props.data.description}</Text>
            <TouchableOpacity
                onPress={() => 
                    this.props.navigation.navigate('Edit', {
                    data: this.props.data,
                    onChangeTodo: this.props.onChangeTodo,
                })}
                style={{
                alignItems:'center',
                alignSelf: 'flex-end',
                justifyContent:'center',
                width:30,
                height:30,
                backgroundColor:'#f4511e',
                borderRadius:30,
                }}
            >
            <MaterialIcons name="edit" size={18} color="white" />
            </TouchableOpacity>
        </Surface>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // alignItems: 'center',
        margin:8,
        flex:1,
        maxHeight:200,
        minHeight:100,
        padding:10,
        // justifyContent: 'center',
        elevation:2
    },
    title: {
        borderBottomWidth: 1,
        // borderBottomColor: '#e0e0e0',
        fontSize:20,
        color:'grey',
        // padding: 5,
        fontWeight: 'bold'
    },
    button: {
        width: 18,
        height: 18,
        borderRadius: 9,
        padding: 0,
    }
});

export default withNavigation(ToDo)
