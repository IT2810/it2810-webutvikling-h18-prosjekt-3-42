import React from 'react';
import {Surface} from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DatePickerAndroid,
    AsyncStorage,
    Button
} from 'react-native';

export default class ToDo extends React.Component {
    constructor() {
        super()
        const locale = "nb-no";
        const months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']

    }
    render() {
        var date = this.props.data.date.year != "" ? new Date(this.props.data.date.year, this.props.data.date.month, this.props.data.date.day) : new Date()
        // var day = date.toLocaleString(this.locale, { day: "2-digit"})
        // var month = date.toLocaleString(this.locale, {month: "long"})
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        // console.log(date.toLocaleString(this.locale, {year: "numeric"}))
        // var year = this.props.data.date.getFullYear();
        // var month =  this.props.data.date.toLocaleString(locale, {month:'long'});
        return (
            <Surface style={styles.container}>
            <Text>
                {this.props.data.title}
            </Text>
            <Text> {year + " " +month + " " + day }</Text>
            <Text>{this.props.data.description}</Text>
        </Surface>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        margin:8,
        width:'50%',
        justifyContent: 'center',
        elevation:2
    }
});
