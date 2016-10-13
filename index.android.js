/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


//maps key AIzaSyAlcciHoN5v54k5ELOu48A0g2Oqe0xOqBQ
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Header, Title, Content, Button,List, ListItem,Text} from 'native-base';
import _ from 'lodash';

import StoreMap from './StoreMap.js'
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import HomeScreen from './app/HomeScreen.js'


export const Router = createRouter(() => ({
  home: () => HomeScreen,
  storeMap:()=> StoreMap
}));




class luckyshop extends Component {






  render() {
                       
                      
    return (
                          
                            <NavigationProvider router={Router}>
                              <StackNavigation initialRoute={Router.getRoute('home')} />
                            </NavigationProvider>
             

    );
  }

}




const styles = StyleSheet.create({
  numbers: {
    fontSize: 20,
    textAlign: 'center',
    marginLeft:90,
    marginTop:50,
    margin: 10,
  },
  middleText :{
    fontSize:15,
    marginLeft:5,
    marginTop:30
  },
   bottomText :{
    fontSize:15,
    marginLeft:5,
    marginTop:10
  },
    bottomText2 :{
    fontSize:15,
    marginLeft:5,
    marginTop:20
  },
  firstText :{
    fontSize:15,
    marginLeft:70,
    marginTop:20
  }
});

AppRegistry.registerComponent('luckyshop', () => luckyshop);
