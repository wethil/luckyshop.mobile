'use strict';

import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Header, Title, Content, Spinner, Button,Icon} from 'native-base';
import ActionButton from 'react-native-action-button';
import luckyshopTheme from '../Themes/luckyshopTheme.js'
import * as Animatable from 'react-native-animatable';
import Modal    from 'react-native-modalbox';
import url from '../connection.js'
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  BackAndroid
} from 'react-native';
import WinnerScreen from './WinnerScreen.js'

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  withNavigation
} from '@exponent/ex-navigation';
import { SocialIcon } from 'react-native-elements'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


@withNavigation
class HomeScreen extends Component {
  constructor(props) {
    super(props);
     this.backPress = this.backPress.bind(this);
    this.state = {
     user:{},
     userLoc:{},
     openModal:false,
     userCredit:3,
     numbers:'0 | 0 | 0 | 0 | 0 | 0 | 0',
   result:0,
   buttonState:0, // 0 is try again, 1 is lucky state, 2 is add credit
   promoCode:0,
   slotting:false

    };
  }


componentDidMount(){
  //  BackAndroid.addEventListener('hardwareBackPress', this.backPress);
    //get position

  

}

   componentWillMount() {
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
    this.setState({ numbers:numbers.join(' | ') })
  let result = _.max(_.values(counts)) //get most quantity for same numbers-*
  this.setState({result:result})
  this.refs.result.bounceIn(800)
      if (result>=3) {
            this.refs.modal1.open();
      }
      if(numbers.length!=0){
        this.setState({slotting:false})
      }

} )




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

 
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  openModal(){
       this.setState({openModal:true})
  }

  _closeModal(){
    this.setState({openModal:false})
    this.setState({
      result:0,
      numbers:'0 | 0 | 0 | 0 | 0 | 0 | 0'
    })
  }



  render() {

    var credit = this.state.userCredit>0 ? <Text style= {styles.credit} > {this.state.userCredit}  Credit </Text>  
    :
    <Button onPress={()=> this.setState({userCredit:5})} style= {styles.credit} > Add  Credit </Button> 
  
    var result = this.state.result
   var button = this.state.slotting == false && this.state.userCredit>0
    ?
      <ActionButton
                      icon={<Icon style={{color:"white"}} name='refresh' size={20} />}
                      active={false}
                      buttonColor="rgba(231,76,60,1)"
                      onPress={this._shake.bind(this)}
                    />
      :
          <ActionButton
                      buttonColor="rgb(144,202,249)"
                      icon ={<Icon style={{color:"white"}} name='spinner' size={20} />}
                      active={false}
                     
                    />


      return (
            
 <Container>
                 
                    <Content   theme={luckyshopTheme} > 
 <Grid>
              
             
                <Row style={styles.headRow} >
                    <Image
                    
                        style={styles.image}
                         source={require('../img/Lucky3.png')}
                      />
                </Row>

                  <Row style={styles.numbersRow}>
                   {/* <Text style={styles.result}>  {this.state.result} encounter  </Text> */}
                    <Animatable.Text ref="nums" style={styles.numbers}>  {this.state.numbers} </Animatable.Text> 
                    <Animatable.Text ref="result" style={styles.result}> {this.state.result}  same </Animatable.Text> 
                </Row>
              
               <Row style={styles.bottomRow}>
                {credit}
                {button}
                </Row>
                
          </Grid>





        <Modal style={styles.modal}
        ref={"modal1"}
        animationDuration={360}
        swipeToClose={true}
        backButtonClose={true}
        >
         
          <WinnerScreen userLoc={this.state.userLoc} />
         
        </Modal>
                  </Content>
 
              </Container>
    );
  }
}


export default HomeScreen;


const styles = StyleSheet.create({
  button: {
    height:60
  },
  headRow: {

   
   height: windowHeight * 0.35
  },
  headText:{
    alignSelf:'center'
  },

  numbersRow: {
   
    height: windowHeight * 0.30,
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems:'center'
   
  },
    numbers: {
   fontFamily:'librebaskerville_regular',
   alignSelf:'center',
   fontSize: 32,
   marginBottom:0

  },
 result: {
   alignSelf:'center',
   fontSize: 20,
   marginTop:20

  },
  credit:{
    alignSelf:"center"
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomRow: {
    flexDirection:"column",
    alignItems:"center",
    height: windowHeight * 0.30
  },
  image:{
     width: windowWidth,
    height: windowHeight * 0.35
  }
});