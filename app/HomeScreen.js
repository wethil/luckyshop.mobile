'use strict';

import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Header, Title, Content, Button,List, ListItem, Text , Spinner,Icon} from 'native-base';

import url from '../connection.js'
import _ from 'lodash';
import {
  StyleSheet,
  View
} from 'react-native';


import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  withNavigation
} from '@exponent/ex-navigation';

import {Router} from '../index.android.js'
import GreatCircle from 'great-circle'

@withNavigation
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
     user:{},
     userCredit:0,
     numbers:'0 | 0 | 0 | 0 | 0 | 0 | 0',
   result:0,
   buttonState:0, // 0 is try again, 1 is lucky state, 2 is add credit
   promoCode:0,
   branchList:[],
    activeBranch:""               


    };
  }


componentDidMount(){
    //get position
    navigator.geolocation.getCurrentPosition(
      (position) => {
       var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let coords = position.coords;
      this.setState(
      {
        userLoc:{
          id:99,
          latlng:{
                  latitude:coords.latitude,
                  longitude:coords.longitude
                 }
        }
      })
   
    });
  

}

   componentWillMount() {

   fetch(url + '/api/user/hilal')
     .then((response) => response.json())
     .then((responseJson) => {
        this.setState({
          user:responseJson,
           userCredit : responseJson.profile.credit
        })
     })
     .catch((error) => {
       console.error(error);
     });
 }


  _shake() {

this.setState({
  buttonState:2,
  branchList:[]
})
let numbers= []
let counts = {};
for ( let i = 0; i < 7; i++) {numbers[i]=parseInt((Math.random() * (9 - 1 + 1)), 10) + 1} //choose random numbers
 numbers.forEach(function(x) { counts[x] = (counts[x] || 0)+1 }); // check same numbers
let result = _.max(_.values(counts)) //get most quantity for same numbers-*
 




this.setState({
    numbers:numbers.join(' | '),
    result:result

   })
fetch(url + '/api/userCreditDec/'+this.state.user._id, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}) .then((response) => response.json())
  .then((responseJson) => {
   
      if (result>=3){
        this.setState({
                      buttonState:1, 
                       userCredit : responseJson.profile.credit,//make button get branch
                      result:result 
                    }) 
    } else {
       this.setState({
                      buttonState:0, 
                       userCredit : responseJson.profile.credit,//make button get branch
                      result:result 
                    }) 
    }
     
  })
  .catch((error) => {
    console.error(error);
  });




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
          buttonState:0, //make button 'try' or 'add credit'
          result:0
           //update branch List
          
        })
}

  _addCredit() {


         fetch(url + '/api/userCreditInc/'+this.state.user._id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }) .then((response) => response.json())
        .then((responseJson) => {
           this.setState({
             userCredit : responseJson.profile.credit
           })
        })
        .catch((error) => {
          console.error(error);
        });


  this.setState({buttonState:0, numbers:'0 | 0 | 0 | 0 | 0 | 0 | 0'})

 }

_getBranches () {

//get branch list
 this.setState({buttonState:2})
          
         fetch(url + '/api/branches')
     .then((response) => response.json())
     .then((responseJson) => {
     
     /*
        this.setState({
          branchList:responseJson,
          buttonState:0, //make button 'try' or 'add credit'
          result:0  //update branch List
          
        })*/
        this.setBranch()
     })
     .catch((error) => {
       console.error(error);
     });
  
     

    

      

  if (this.state.userCredit<=0){ this.setState({buttonState:2}) } // if there is no credit, make button add credit
    this.setState({
           numbers:'0 | 0 | 0 | 0 | 0 | 0 | 0'
        
        })

}



   _goToMaps (branch) {
  this.setState({activeBranch:branch})
    //lincoln hal 39.481347, -88.177220
    //arts center 39.480266, -88.174900
    let store={id:branch.id,latlng:branch.latlng}
    let userLoc = this.state.userLoc
  this.props.navigator.push(Router.getRoute('storeMap',{markers:[userLoc,store]}));

 }
 
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  render() {

    
    var userLoc = this.state.userLoc
    var result = this.state.result
    switch (this.state.buttonState) {
    case 0:
        if(this.state.userCredit>0){
           var  MainButton = <Button block onPress={this._shake.bind(this)}> Try!  </Button>
         } else {
          var MainButton = <Button block warning onPress={this._addCredit.bind(this)} > Add Credit! </Button>
         }
        break;
    case 1:
      var MainButton  = <Button danger block onPress={this._getBranches.bind(this)} > Get Branch! </Button>
        break;
    
    case 2:
      var MainButton =  <Spinner color='blue' />
      break;
  
      
}



      return (
            
 <Container>
                  <Header>
                      <Title> luckyshop</Title>
                  </Header>
                    <Content padder > 
          <Grid>
                <Row style={styles.headRow} >
                  <Text style={styles.headText}>Hi {this.state.user.username}, You have {this.state.userCredit} credit. 
                  </Text>
                </Row>
              

               {this.state.branchList.length==0 ? 
                   <Row style={styles.numbersRow}>
                    <Text style={styles.result}>  {this.state.result} encounter  </Text> 
                    <Text style={styles.numbers}>  {this.state.numbers} </Text> 
                </Row>
                :
                 <Text style={styles.numbers}>  Please select a branch </Text> 
               
               }


                {MainButton}
                <Row style={styles.bottomRow}>
                    
                </Row>
                
          </Grid>
               {this.state.branchList.length!=0 ? 
                 <List dataArray={this.state.branchList}
                        renderRow={(branch) =>
                           <ListItem iconRight button onPress={this._goToMaps.bind(this,branch)} >
                                <Icon name='map-marker' size={20} />
                                <Row style={styles.branchList}> 
                                    <Text>
                                      {branch.name}
                                    </Text> 
                                    <Text>
                                      {branch.discount}% discount  
                                    </Text>
                                    <Text>
                                      {Math.round(GreatCircle.distance(userLoc.latlng.latitude, userLoc.latlng.longitude, branch.latlng.latitude, branch.latlng.longitude)* 10)/ 10} km   
                                    </Text>
                               </Row> 
                            </ListItem>
                        }>
                    </List> : <Text></Text>  }  
                  
                  </Content>
              </Container>
    );
  }
}


export default HomeScreen;


const styles = StyleSheet.create({
  headRow: {
   ////backgroundColor:'#D954D7',
    justifyContent: 'center',
    height:100
  },
  headText:{
    alignSelf:'center'
  },

  numbersRow: {
    //backgroundColor:'orange',
    flexDirection: 'column', 
    justifyContent: 'center',
    height:80
  },
    numbers: {
   alignSelf:'center',
   fontSize: 20,
   marginBottom:5

  },
 result: {
   alignSelf:'center',
   fontSize: 16,
   marginBottom:20

  },
  branchList:{
    flexDirection:'row',
     justifyContent:'space-around'
  },
  bottomRow: {
  //backgroundColor:'#D93735',
    height:200
  }
});




/*
          
          */