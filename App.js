import React from 'react';
import { Alert, StyleSheet, Slider, Text, View, Button } from 'react-native';

export default class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.lux = {value: 90};

	    this.adjustLux = this.adjustLux.bind(this);
	    // this.handleSubmit = this.handleSubmit.bind(this);
	}

	adjustLux( event ){
		console.log( event );
		this.lux.value = event;
		setRemoteLux( event );
    }
	
    getLuxVal( val ){
	    console.warn(val);
    } 

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.textBig, styles.textCenter]}>Bienvienue à notre App!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
		<Slider
		    style={{ width: 300 }}
		    step={1}
		    minimumValue={0}
		    maximumValue={250}
		    value={this.lux.value}
		    onSlidingComplete={this.adjustLux} />

		<Button onPress={buttonPress} title="Change Light" color="#ff0000"/>
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
  textBig: {
	  fontSize: 60,
	  lineHeight: 60
  },
  textCenter: {
	  textAlign: 'center'
  }
});

var lightKey = '31cad7165f377c7881aee12b13ee123578060232';
	// lightKey = 'dcae18cb5e5ac78f4ae7d7ae5a171eec8842d28d';




function buttonPress(){
	setRemoteLux( 230 );

	let luxPromise = makeParticleRequest('setColor', {arg: '255,130,50'});
}

// Set Light Brightness
function setRemoteLux( newLux ) {

	let luxPromise = makeParticleRequest('setLux', {arg: newLux});
	// return true;
}

//
// Post a request to remote server
function makeParticleRequest( functionName, postData ){

	let fetchData = {
			method: 'POST',
			// credentials: 'same-origin',
			// mode: 'same-origin',
			body: "",
			headers: {
			    'Accept':       'application/json',
				// 'Content-Type': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Authorization': 'Bearer ' + lightKey
			}
		};

		//
		// Prepare to send the data to Particle for processing
		if ( typeof postData === 'object' && postData !== null && Object.keys( postData ).length > 0 ){
			fetchData.body = [];
			for (var k in postData) {
				fetchData.body.push(encodeURIComponent(k) + "=" + encodeURIComponent( postData[k] ));
			}
			fetchData.body = fetchData.body.join("&");
		}

		return fetch('https://api.particle.io/v1/devices/42003b001347333438373338/' + encodeURIComponent( functionName ), fetchData)
			.then((response) => response.json())
			.then((responseJson) => {
				// console.log(  'Bearer ' + lightKey);
				console.log( responseJson );
				// let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				// this.setState({
				// 	isLoading: false,
				// 	dataSource: ds.cloneWithRows(responseJson.movies),
				// }, function() {
				// 	// do something with new state
				// });
				// Alert.alert(responseJson);
				// Alert.alert('It probably worked!');
			})
			.catch((error) => {
				console.error(error);
			});
}
