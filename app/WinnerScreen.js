'use strict';

import React, { Component } from 'react';
import { Container, Header, Title, Content, Icon, Button,List,  ListItem, Thumbnail, Spinner} from 'native-base';
import luckyshopTheme from '../Themes/luckyshopTheme.js'
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import url from '../connection.js'
import { Col, Row, Grid } from "react-native-easy-grid";
import {Router} from '../index.android.js'
import GreatCircle from 'great-circle'
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  withNavigation
} from '@exponent/ex-navigation';


const branchList=[{
            name : 'Store A',
            discount:15,
            id:1,
           latlng:{
                    latitude:51.403175,
                    longitude: 5.415579
                  }
          },
          {
            name : 'Store B',
            discount:13,
            id:1,
           latlng:{
                    latitude:51.411387,
                    longitude:5.425364
                  }
          }]




@withNavigation
class WinnerScreen extends Component {
constructor(props) {
  super(props);

  this.state = {
    branchList:[]
  };
}

componentWillMount(){
  this.setBranch()
  this._getBranches()
}

_getBranches () {
this.setBranch()
//get branch list
       /*   
         fetch(url + '/api/branches')
     .then((response) => response.json())
     .then((responseJson) => {
     
     
        this.setState({
          branchList:responseJson,
          buttonState:0, //make button 'try' or 'add credit'
          result:0  //update branch List
          
        })
        
     })
     .catch((error) => {
       console.error(error);
     });

*/
}

setBranch() {
   this.setState({
          branchList:[{
            name : 'Store A',
            discount:15,
            id:1,
           latlng:{
                    latitude:51.403175,
                    longitude: 5.415579
                  }
          },
          {
            name : 'Store B',
            discount:13,
            id:1,
           latlng:{
                    latitude:51.411387,
                    longitude:5.425364
                  }
          }],
    
           //update branch List
          
        })
}

   _goToMaps (branch) {
 
    //lincoln hal 39.481347, -88.177220
    //arts center 39.480266, -88.174900
    let store={id:branch.id,latlng:branch.latlng}
    let userLoc = this.props.userLoc

  this.props.navigator.push(Router.getRoute('storeMap',{markers:[userLoc,store]}));

 }


  render() {
      var userLoc = this.props.userLoc
      if (branchList&& branchList.length!=0 ) {
      var chooseText = <Text  style={styles.choose}>Choose a branch and get your clothes!</Text>
    } else {
     var chooseText = <Text style={styles.chooseWait}>Waiting for branches..</Text>
     }
   
    return (
     <Container>
         <Content style={{ zIndex:91}} theme={luckyshopTheme}>
          <Grid > 
           <Image  resizeMode='stretch' style={styles.headRow} source={require('../img/avatarFrame.png')}>
              <Thumbnail style={styles.pp}  size={165} source={require('../img/pp.jpg')} />
          </Image>
            <Row style={styles.congRow}> 
              <Text style={styles.congText}>Congratulations!</Text>
            </Row>
             <Row style={styles.pinkLine}></Row>
            <Row style={styles.chosingStat}>
              {chooseText}
            </Row>
             <Row style={styles.Stores}> 
            {branchList && branchList.length!=0 ? 
                   branchList.map((branch,index)=>{
                    return (<Image key={index}  resizeMode='stretch' style={styles.greenApple} source={require('../img/greenApple.png')}>
                             <Col  style={styles.storeInf}>
                               <Icon style={{color:'white'}} name='map-marker' size={20} />
                               <Text onPress={this._goToMaps.bind(this,branch)} style={styles.storeInfText} >  {branch.name}</Text> 
                               <Text onPress={this._goToMaps.bind(this,branch)} style={styles.storeInfText} > {branch.discount}% discount </Text> 
                               <Text onPress={this._goToMaps.bind(this,branch)} style={styles.storeInfText} >  {Math.round(GreatCircle.distance(userLoc.latlng.latitude, userLoc.latlng.longitude, branch.latlng.latitude, branch.latlng.longitude)* 10)/ 10} km    </Text> 
                             </Col>
                           </Image>)
          }) : <Spinner color='red' /> }
            </Row>
          </Grid>
         </Content>
      </Container>
    );
  }
}




const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value
const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function 
function em(value) {
  return unit * value;
} 

const styles = StyleSheet.create({
  headRow: {
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    height: 220
  },
    pinkLine:{
    //marginTop:10,
    backgroundColor:'rgba(242, 126, 188, 0.76)',
    height:20
  },
    blueLine:{
    backgroundColor:'rgba(153, 211, 240, 0.82)',
    height:20,
    marginBottom:30
  },
  pp:{
    marginTop:-20,
    marginLeft:-5
  },
  image:{
     width: x * 0.70,
    height: y * 0.35
  },
  storeInf:{
   justifyContent:'center',
    //left:18,
     alignItems:'center'
    //top:53,
  },
  storeInfText:{
    color:'white',
    fontSize:em(0.7),
    fontWeight: 'bold'
  },
  congRow:{
    marginTop:10,
   justifyContent: 'space-around',
    alignItems:'center',
    backgroundColor:'rgba(242, 126, 188, 0.76)',
  },
    congText:{
    fontFamily:'lobster_regular',
     fontSize: 45,
     alignSelf:'center',
     color:'white'
  },
   greenApple:{
    width: (x - em(1.25) * 2) *(2/6),
    height:150
  },
  chosingStat:{
     justifyContent: 'center',
     alignItems:'center',
  },
  choose:{
    alignSelf:'center',
     fontSize: 12
  },
  chooseWait:{
    alignSelf:'center',
     fontSize: 12,
     marginTop:10
  },
  Stores:{
    justifyContent: 'center',
    height :(x - em(1.25) * 2) * (3/5),

  } 
});


export default WinnerScreen;

/*
      {branchList.length!=0 && this.props.userLoc.id ? 
                 <List dataArray={this.state.branchList}
                        renderRow={(branch) =>
                           <ListItem iconRight button onPress={this._goToMaps.bind(this,branch)} >
                                <Icon name='map-marker' size={20} />
                                    <Text>
                                      {branch.name}
                                    </Text> 
                                    <Text>
                                      {branch.discount}% discount  
                                    </Text>
                                    <Text>
                                      {Math.round(GreatCircle.distance(userLoc.latlng.latitude, userLoc.latlng.longitude, branch.latlng.latitude, branch.latlng.longitude)* 10)/ 10} km   
                                    </Text>
                             
                            </ListItem>
                        }>
                    </List> : <Spinner color='red' /> 
                    }  */

                    /*
           <Row style={styles.Stores}> 
            {branchList && branchList.length!=0 ? 
                   branchList.map((branch,index)=>{
                    return (<Image key={index}  resizeMode='stretch' style={styles.greenApple} source={require('../img/greenApple.png')}>
                             <Col  style={styles.storeInf}>
                               <Icon style={{color:'white'}} name='map-marker' size={20} />
                               <Text onPress={this._goToMaps.bind(this,branch)} style={styles.storeInfText} >  {branch.name}</Text> 
                               <Text onPress={this._goToMaps.bind(this,branch)} style={styles.storeInfText} > {branch.discount}% discount </Text> 
                               <Text onPress={this._goToMaps.bind(this,branch)} style={styles.storeInfText} >  {Math.round(GreatCircle.distance(userLoc.latlng.latitude, userLoc.latlng.longitude, branch.latlng.latitude, branch.latlng.longitude)* 10)/ 10} km    </Text> 
                             </Col>
                           </Image>)
          }) : <Spinner color='red' /> }
            </Row> */
