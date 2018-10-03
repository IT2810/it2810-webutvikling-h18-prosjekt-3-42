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
import { todoBackgroundColor, todoEditColor, todoDeleteColor, todoTitleColor, todoDescriptionColor } from '../assets/styles'


class ToDo extends React.Component {
    constructor(props) {
        super(props)
        this.locale = "nb-no";
        this.months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
        this.prioColors = ['#8FC93A', '#E4CC37', '#CC2936'];
    }

    // Math stuff
    // https://www.movable-type.co.uk/scripts/latlong.html
    haversine(currentLocation = this.props.currentLocation, location = this.props.data.location[0]) {
        const R = 6371e3
        const theta_1 = this.toRadians(currentLocation.latitude)
        const theta_2 = this.toRadians(location.latitude)
        const delta_theta = this.toRadians(location.latitude - currentLocation.latitude)
        const delta_lambda = this.toRadians(location.longitude - currentLocation.longitude)

        const a = Math.sin(delta_theta / 2) * Math.sin(delta_theta / 2) + Math.cos(theta_1) * Math.cos(theta_2) * Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

        const d = R * c

        return d
    }

    toRadians(number) {
        return number * (Math.PI / 180)
    }

    render() {
        this.haversine()
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

            <Text>{"Distance: " + (this.haversine() > 1000 ? Math.floor(this.haversine() / 1000) + " km" : this.haversine().toFixed(0) + " m")}</Text>
            <Text style={ styles.description }>{this.props.data.description}</Text>
            <View style={{
                flexDirection: "row",
                alignSelf: "flex-end",
        }}>
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
                backgroundColor: todoEditColor,
                borderRadius:30,
                }}
            >
            <MaterialIcons name="edit" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.onDeleteTodo(this.props.data)}
                style={{
                alignItems:'center',
                alignSelf: 'flex-end',
                justifyContent:'center',
                width:30,
                height:30,
                backgroundColor: todoDeleteColor,
                borderRadius:30,
                marginLeft: 10,
                }}
            >
            <MaterialIcons name="delete" size={18} color="white" />
            </TouchableOpacity>
            </View>
        </Surface>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: todoBackgroundColor,
        // alignItems: 'center',
        margin:8,
        flex:1,
        minHeight:100,
        padding:10,
        // justifyContent: 'center',
        elevation:2
    },
    title: {
        borderBottomWidth: 1,
        // borderBottomColor: '#e0e0e0',
        fontSize:20,
        color: todoTitleColor,
        // padding: 5,
        fontWeight: 'bold'
    },
    button: {
        width: 18,
        height: 18,
        borderRadius: 9,
        padding: 0,
    },
    description: {
        color: todoDescriptionColor
    }
});

export default withNavigation(ToDo)
