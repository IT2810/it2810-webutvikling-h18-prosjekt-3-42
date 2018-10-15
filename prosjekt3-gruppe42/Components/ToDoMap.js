import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Location, Permissions, MapView } from 'expo';

class ToDoMap extends React.Component {
  constructor(){
    super()
    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
      },
    }
  }

  static navigationOptions = {
    title: 'Map',
  };

  componentDidMount() {
    this._getLocationAsync()
  }

  // Somewhat copied from https://docs.expo.io/versions/latest/sdk/location as my code didn't work >:(
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      console.log(this.state.errorMessage)
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location.coords });
  };

  render() {
    const {Marker} = MapView
    let  markers = this.props.navigation.getParam("data", [])
      .filter(x => !x.completed)
      .map(x => <Marker coordinate={x.location[0]} title={x.title} key={x.key} description={x.description} />)

    
    console.log("Data:", this.props.navigation.getParam("data", "no_data"))

    let map = this.state.location.longitude !== 0 ? <MapView
      style={{ flex: 1 , width: "100%", height: "100%"}}
      initialRegion={{
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {markers}
      </MapView> : <Text>Please wait for the gps coords to load</Text>
    return (
      <View style={styles.container}>
      {map}
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
});

export default withNavigation(ToDoMap)