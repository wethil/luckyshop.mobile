'use strict';

import React, { Component } from 'react';
import { Container, Header, Title, Content, Icon, Button,List,  ListItem, Thumbnail, Spinner} from 'native-base';
import luckyshopTheme from '../Themes/luckyshopTheme.js'
import {
  StyleSheet,
  View,
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
@withNavigation
class WinnerScreen extends Component {
constructor(props) {
  super(props);

  this.state = {
  	branchList:[]
  };
}

componentWillMount(){
	
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
  this.setState({activeBranch:branch})
    //lincoln hal 39.481347, -88.177220
    //arts center 39.480266, -88.174900
    let store={id:branch.id,latlng:branch.latlng}
    let userLoc = this.props.userLoc
  this.props.navigator.push(Router.getRoute('storeMap',{markers:[userLoc,store]}));

 }


  render() {
  	  var userLoc = this.props.userLoc
  	  if (this.state.branchList.length!=0 && this.props.userLoc.id) {
  	  var chooseText = <Text  ref="result" style={styles.choose}>Choose a branch and get your clothes!</Text>
    } else {
     var chooseText = <Text style={styles.chooseWait}>Waiting for branches..</Text>
	   }
    return (
      <Container>
      	 <Content   theme={luckyshopTheme}>
      	 	<Grid> 
      	 		<Row style={styles.avatar}> 
      	 			   <Thumbnail  size={140} source={require('../img/pp.jpg')} />
      	 		</Row>
      	 		<Row style={styles.congRow}> 
      	 			<Animatable.Text animation="tada" iterationCount="infinite" style={styles.congText}>Congratulations!</Animatable.Text>
      	 			{chooseText}
      	 		</Row>
      	 		<Row style={styles.Stores}> 
      	 	  {this.state.branchList.length!=0 && this.props.userLoc.id ? 
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
                    }  
      	 		</Row>
      	 	</Grid>
      	 </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	avatar:{
		marginTop:10,
		justifyContent: 'center',
		height : windowHeight * 0.30,
	},
	congRow:{
	 height: windowHeight * 0.30,
    flexDirection: 'column', 
    justifyContent: 'space-around',
    alignItems:'center'

	},
	congText:{
	  fontFamily:'lobster_regular',
	  alignSelf:'center',
	   fontSize: 50,
	   color:'rgb(255,23,68)'
	},
	choose:{
		alignSelf:'center',
	   fontSize: 12
	},
	chooseWait:{
		alignSelf:'center',
	   fontSize: 10,
	   marginTop:10
	},
	Stores:{
		justifyContent: 'center',
		width: windowWidth,
		height :windowHeight * 0.30,
	}	
});


export default WinnerScreen;
