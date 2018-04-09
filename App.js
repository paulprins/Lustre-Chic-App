import React from 'react';
import { Alert, StyleSheet, Slider, Text, View, Button } from 'react-native';

// Ensure that a valid config file exists - You must copy 'DEFAULT_config.json' to 'config.json' and fill it out
var configObject = require('./config.json');
const particleLightKey = configObject.AccessToken,
	particleDeviceID = configObject.DeviceID;
// Ensure that a valid config file exists



export default class App extends React.Component {
	constructor(props) {
	    super(props);
		this.state = {
			lux: 250,
			HSL: {hue: 23, saturation: 100, lightness: 60},
		};

	    this.adjustLux = this.adjustLux.bind(this);
	    this.activeHue = this.activeHue.bind(this);
	    this.adjustHue = this.adjustHue.bind(this);
	    this.activeSaturation = this.activeSaturation.bind(this);
	    this.adjustSaturation = this.adjustSaturation.bind(this);
	    this.activeLightness = this.activeLightness.bind(this);
	    this.adjustLightness = this.adjustLightness.bind(this);
	    this.resetLight = this.resetLight.bind(this);
	    // this.handleSubmit = this.handleSubmit.bind(this);
	}

	adjustLux( event ){
		this.setState({
			lux: parseInt( event )
		});

		let luxPromise = makeParticleRequest('setLux', {arg: event });
    }

	activeHue( event ){
		let tmpHSL = this.state.HSL;
		tmpHSL.hue = parseInt( event );
		this.setState({
			HSL: tmpHSL
		});
	}
	adjustHue( event ){
		// console.log( event );
		let tmpHSL = this.state.HSL;
		tmpHSL.hue = parseInt( event );
		this.setState({
			HSL: tmpHSL
		});

		let hslPromise = makeParticleRequest('setHue', {arg: event });
    }


	activeSaturation( event ){
		let tmpHSL = this.state.HSL;
		tmpHSL.saturation = parseInt( event );
		this.setState({
			HSL: tmpHSL
		});
	}
	adjustSaturation( event ){
		// console.log( event );
		let tmpHSL = this.state.HSL;
		tmpHSL.saturation = parseInt( event );
		this.setState({
			HSL: tmpHSL
		});

		let hslPromise = makeParticleRequest('setSat', {arg: event });
    }

	activeLightness( event ){
		let tmpHSL = this.state.HSL;
		tmpHSL.lightness = parseInt( event );
		this.setState({
			HSL: tmpHSL
		});
	}
	adjustLightness( event ){
		// console.log( event );
		let tmpHSL = this.state.HSL;
		tmpHSL.lightness = parseInt( event );
		this.setState({
			HSL: tmpHSL
		});

		let hslPromise = makeParticleRequest('setLight', {arg: event });
    }



	resetLight( event ){
		// this.lux.value = 250;
		// let luxPromise = makeParticleRequest('setLux', {arg: this.lux.value });

		this.setState({
			lux: parseInt( 250 )
		}, function(){
			let luxPromise = makeParticleRequest('setLux', {arg: this.state.lux });
		});

		let tmpHSL = this.state.HSL;
		tmpHSL.hue = 23;
		tmpHSL.saturation = 100;
		tmpHSL.lightness = 60;
		this.setState({
			HSL: tmpHSL
		}, function(){
			let hslPromise = makeParticleRequest('setHue', {arg: this.state.HSL.hue});
			let hsl2Promise = makeParticleRequest('setSat', {arg: this.state.HSL.saturation});
			let hsl3Promise = makeParticleRequest('setLight', {arg: this.state.HSL.lightness});
		});
	}

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.textBig, styles.textCenter]}>l’Étoile du Nord</Text>

		<View style={styles.label}>
			<Text style={styles.labelText}>Brightness</Text>
		</View>
		<Slider
		    style={{ width: 300 }}
		    step={1}
		    minimumValue={0}
		    maximumValue={250}
		    value={this.state.lux}
		    onSlidingComplete={this.adjustLux} />


		<View style={[styles.label, {borderBottomWidth: 0}]}>
			<Text style={styles.labelText}>Custom Color Preview</Text>
		</View>
		<View style={styles.colorSwatchHolder}>
			<View style={[styles.colorSwatch, {backgroundColor: `hsl(${this.state.HSL.hue}, ${this.state.HSL.saturation}%, ${this.state.HSL.lightness}%)`}]} />
		</View>

		<View style={styles.label}>
			<Text style={styles.labelText}>Hue</Text>
		</View>
		<Slider
			nativeID="SliderHue"
		    style={{ width: 300 }}
		    step={1}
		    minimumValue={1}
		    maximumValue={360}
		    value={this.state.HSL.hue}
			onValueChange={this.activeHue}
		    onSlidingComplete={this.adjustHue} />
			

		<View style={styles.label}>
			<Text style={styles.labelText}>Saturation</Text>
		</View>
		<Slider
		    style={{ width: 300  }}
		    step={1}
		    minimumValue={0}
		    maximumValue={100}
		    value={this.state.HSL.saturation}
			onValueChange={this.activeSaturation}
		    onSlidingComplete={this.adjustSaturation} />
			

		<View style={styles.label}>
			<Text style={styles.labelText}>Lightness</Text>
		</View>
		<Slider
		    style={{ width: 300  }}
		    step={1}
		    minimumValue={0}
		    maximumValue={100}
		    value={this.state.HSL.lightness}
			onValueChange={this.activeLightness}
		    onSlidingComplete={this.adjustLightness} />

		<Button onPress={this.resetLight} title="Reset Light" color="#ff0000"/>
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
	colorSwatchHolder: {
		flexDirection: 'row',
	},
	colorSwatch: {
		flex: 1,
		height: 100,
		// backgroundColor: '#ff0000'
		// backgroundColor: 'hsl(23, 100%, 60%)',
		borderColor: '#404140',
		borderStyle: 'solid',
		borderWidth: 2,
		borderRightWidth: 0,
		borderLeftWidth: 0
	},
	textBig: {
		fontSize: 35,
		lineHeight: 35
	},
	textCenter: {
		textAlign: 'center'
	},
	label: {
		borderTopWidth: 15,
		borderTopColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#404140',
		width: 300
	},
	labelText: {
		textAlign: 'left',
		fontSize: 20,
		fontWeight: '700',
	}
});


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
				'Authorization': 'Bearer ' + particleLightKey
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

		return fetch('https://api.particle.io/v1/devices/' + particleDeviceID + '/' + encodeURIComponent( functionName ), fetchData )
			.then((response) => response.json())
			.then((responseJson) => {
				// console.log( responseJson );
			})
			.catch((error) => {
				console.error(error);
			});
}
