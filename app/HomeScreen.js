'use strict';

import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Header, Title, Content, Spinner, Icon,Thumbnail} from 'native-base';
import { Button } from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import luckyshopTheme from '../Themes/luckyshopTheme.js'
import * as Animatable from 'react-native-animatable';
import Modal    from 'react-native-modalbox';
import url from '../connection.js'
import _ from 'lodash';
import {apple,cherries,grapes,orange,pineapple,strawberry,watermelon,lemon,pumpkin,purpleA,yellowA} from '../img/imgConstants.js'
import {
  View,
  Image,
  Text,
  BackAndroid
} from 'react-native';
import {styles} from './Constant.js'
import WinnerScreen from './WinnerScreen.js'

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  withNavigation
} from '@exponent/ex-navigation';
import { SocialIcon } from 'react-native-elements'




@withNavigation
class HomeScreen extends Component {
  constructor(props) {
    super(props);
     this.backPress = this.backPress.bind(this);
    this.state = {
     user:{},
     userLoc:{
      id:99,
      latlng:{
        latitude:35,
        longitude:35
    }},
   openModal:false,
   userCredit:3,
   fruits:[apple,apple,apple,apple,apple,apple,apple],
   result:0,
   buttonState:0, // 0 is try again, 1 is lucky state, 2 is add credit
   promoCode:0,
   slotting:false,
   winDecideModal:false

    };
  }


componentDidMount(){
  //  BackAndroid.addEventListener('hardwareBackPress', this.backPress);
    //get position

  

}

   componentWillMount() {
    this.getLoc()
    async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.requestPermission(
      PermissionsAndroid.ACCESS_FINE_LOCATION,
      {
        'title': 'Lucy2Shop location',
        'message': 'Lucky2Shop needs access to your location, ' +
                   'so we can suggest you nearest shops.'
      }
    )
    if (granted) {
     this.getLoc()
    } else {
    this.setState(
      {
        userLoc:{
          id:99,
          latlng:{
                  latitude:30,
                  longitude:30
                 }
        }
      })
    }
  } catch (err) {
    console.warn(err)
  }



 if (!this.state.accesLoc){
    requestCameraPermission()
  }


}
     


  /*
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
     });*/
 }

 backPress() {
  //if modal is open, do not close app, just close modal
    if (this.state.openModal==true) {
       this.setState({openModal:false})
       return true;
    }
     return false;
 }

 getLoc(){    
  
         navigator.geolocation.getCurrentPosition(
            (position) => {
            let coords = position.coords;
            this.changeLoc(coords)
            },
            (error) => console.log('error with geolocation'),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
         this.watchID = navigator.geolocation.watchPosition((position) => {
           let coords = position.coords;
            this.changeLoc(coords)
          });
     
  }

changeLoc(coords){
      this.setState(
          {
            userLoc:{
            id:99,
            latlng:{
              latitude:coords.latitude,
              longitude:coords.longitude
            }}}
          )
}

 componentWillUnmount(){
  //BackAndroid.removeEventListener('hardwareBackPress', this.backPress);
        }


  _shake() {
    
this.setState({slotting:true,userCredit:this.state.userCredit-1})

/*
this.setState({
  buttonState:2,
  branchList:[]
})*/
this.refs.nums.flash(200).then(()=> {
let numbers= []
let counts = {};
  for ( let i = 0; i < 7; i++) {numbers[i]=parseInt((Math.random() * (9 - 1 + 1)), 10) + 1} //choose random numbers
   numbers.forEach(function(x) { counts[x] = (counts[x] || 0)+1 }); // check same numbers
  let result = _.max(_.values(counts)) //get most quantity for same numbers-*
  this.changeNumToFruit(numbers)
  this.setState({result:result})
  this.refs.result.bounceIn(800)
      if (result>=1) {
            this.refs.modal1.open();
      }
      if(numbers.length!=0){
        this.setState({slotting:false})
      }

  })
}

goWinnerPage(){
   this.setState({winDecideModal:false})
  this.refs.modal1.open();
}

continueToPlay(){
  this.setState({winDecideModal:false})
}

changeNumToFruit(numbers) {
  function getFruit(num) {
        switch (num) {
      case 1:
        return apple
       break;
      case 2:
        return cherries
       break;
      case 3:
        return grapes
       break;  
      case 4:
        return orange
       break; 
      case 5:
        return pineapple
       break; 
      case 6:
        return strawberry
       break;  
      case 7:
        return watermelon
       break;
      case 8:
        return lemon
       break; 
      case 9:
        return pumpkin
       break;    

    }
  }
   var nLength = numbers.length
    for (var i = 0; i < nLength; i++) { 
      numbers[i] = getFruit(numbers[i])
  }

  this.setState({fruits:numbers})
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


  this.setState({buttonState:0, fruits:[apple,apple,apple,apple,apple,apple,apple]})

 }

 
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  openModal(){
       this.setState({openModal:true})
  }

  _closeModal(){
    this.setState({openModal:false})
    this.setState({
     winDecideModal:true,
      fruits:[apple,apple,apple,apple,apple,apple,apple]
    })
  }



  render() {


    var credit = this.state.userCredit>0 ? <Text style= {styles.creditText}>{this.state.userCredit} Credit </Text>  
    :
    <Text onPress={()=> this.setState({userCredit:5})} style= {styles.creditText}>Add Credit </Text> 

   var result = this.state.result
   var button = this.state.slotting == false && this.state.userCredit>0
    ?    <Button
          onPress={this._shake.bind(this)}
          backgroundColor="#2096f3"
          title='Shake It!' />         
      :  <Button
          title='Wait..' />
    


      return (
<Container >
  <Content padder   theme={luckyshopTheme} > 
    <Grid>
      <Row style={styles.headRow} >
        <Image
        resizeMode='stretch'
        style={styles.image}
        source={require('../img/main.png')}
        />
      </Row>
      <Row style={styles.pinkLine}></Row>
      <Row style={styles.numbersRow}>
        {
          this.state.fruits.map((fruit,index)=>{
          return  <Col key={index} style={styles.columns}><Text><Animatable.Image ref="nums" key={fruit} style={styles.fruits} source={fruit} /></Text></Col>
                   })
        }
      </Row>
      <Row style={styles.result}>
        <Image  resizeMode='stretch' style={styles.yellowA} source={yellowA}>
          <Animatable.Text style={styles.resText} ref="result"> {this.state.result} same </Animatable.Text> 
        </Image>
        <Image  resizeMode='stretch' style={styles.purpleA} source={purpleA}>
         <Animatable.Text style={styles.creditText} ref="result"> {credit} </Animatable.Text> 
        </Image>
      </Row>
      <Row style={styles.blueLine}></Row>
       
      {button}
     
    </Grid>
   
    <Modal 
      ref={"modal1"}
      //isOpen={true}
      animationDuration={360}
      swipeToClose={true}
      backButtonClose={true}
      onClosed={()=>this._closeModal()}
      >
       <WinnerScreen result={this.state.result} style={styles.modal} userLoc={this.state.userLoc} />
    </Modal>
   

    <Modal 
      isOpen={this.state.winDecideModal}
      backdrop={true}
      //isOpen={true}
      style={styles.winDecideModal}
      position="bottom"
      animationDuration={360}
      backButtonClose={true}
      //onClosed={()=>this._closeModal()}
      >
     
     
              <Button borderRadius={2} backgroundColor="#3F51B5" title='Go to winner Page' onPress={this.goWinnerPage.bind(this)} />
              <Button borderRadius={2} backgroundColor="#FF5722"   title='Continue To Play'onPress={this.continueToPlay.bind(this)}/>
       
      
    </Modal>
  </Content>
</Container>
    );
  }
}


export default HomeScreen;


