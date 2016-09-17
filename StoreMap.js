import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import {Spinner} from 'native-base';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  withNavigation
} from '@exponent/ex-navigation';
import {Router} from './index.android.js'
import MapView from 'react-native-maps';

  

@withNavigation
class StoreMap extends Component {
	constructor(props) {
	  super(props);
	  
	  this.state = {
      method:0,
      initialPosition:'unknown',
	  	title:'storeMap',
      userCoords:{},
      markers:[]
	  }
	}




  componentWillMount(){

    if (this.props.route.params.markers) {
      this.setState({markers:this.props.route.params.markers})
    }
  }

   componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  componentDidMount(){
    //hilal loc 51.405658, 5.418293
    //asml plaza 51.403175, 5.415579,
    //fedex 51.411387, 5.425364
    //e.gazi 38.007677, 32.534479
    //hizmet sitesi 38.009173, 32.531325
    // uni 37.999758, 32.516930
      points=[
      {
          lat:this.state.markers[0].latlng.latitude,// markers[0] is user location
          lng:this.state.markers[0].latlng.longitude
        },
        {
          lat:this.state.markers[1].latlng.latitude,
          lng:this.state.markers[1].latlng.longitude
        }
        
      ]
      this.regionFrom(points)
   
  
  }



   _goBackHome () {
  this.props.navigator.pop()
 }


 regionFrom(points) { // calculate zoom and make user location center point

let centerPoint = points[0]
let store = points[1]
let latDelta  = Math.max(centerPoint.lat, store.lat) - Math.min(centerPoint.lat, store.lat);
let longDelta = Math.max(centerPoint.lng, store.lng) - Math.min(centerPoint.lng, store.lng);
let maxLatDelta = Math.max(0.0, latDelta);
let maxLongDelta = Math.max(0.0, longDelta);
let deltaX = maxLatDelta * 2
let deltaY = maxLongDelta * 2



    this.setState({
      method:1,
      latitudeDelta: deltaX,
      longitudeDelta:deltaY
    })
  }
 

  render() {
       let userLat = this.state.markers[0].latlng.latitude //user locaton
      let userLng  = this.state.markers[0].latlng.longitude

    return (
        
                <View style ={styles.container}>
					   {
              this.state.latitudeDelta  //if no latitudeDelta, do not render map
              ?   <MapView
                    style={ styles.map }
                    initialRegion={{
                    latitude: userLat,
                    longitude: userLng,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta
                                    }}>
                        <MapView.Marker  key={2}
                        coordinate={{ latitude: userLat,
                        longitude:userLng
                        }}
                          
                          />
                      {this.state.markers.map(marker => {
                      return (
                      <MapView.Marker  key={marker.id}
                      coordinate={marker.latlng}
                      />)})}
                 </MapView> : <Spinner color='blue' />
             }

					       <View style={styles.back}>
					         <Text>Map screen!</Text>
					        <Text onPress={this._goBackHome.bind(this)}>
					          {this.state.latitude} and {this.state.longitude} m {this.state.method} 
					        </Text>
					       </View> 
   				 </View>  
             
    );
  }
}




const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
  },
  back: {
  	position:'absolute',
  	bottom:50
  }
});

export default StoreMap;



/*
let minX, maxX, minY, maxY;

((point) => {
   minX = point.lat;
   maxX = point.lat;
   minY = point.lng;
  maxY = point.lng;
})(points[0]);

points.map((point) => {
  minX = Math.min(minX, point.lat);
    maxX = Math.max(maxX, point.lat);
    minY = Math.min(minY, point.lng);
    maxY = Math.max(maxY, point.lng);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);*/