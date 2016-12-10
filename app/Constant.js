import {
  StyleSheet, Dimensions
} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




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


export const styles = StyleSheet.create({
  button: {
    height:60
  },
  headRow: {
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems:'center'
   
  // height: windowHeight * 0.35
  },
  yellowA:{
    width:80,
    height:40
  },
  purpleA:{
    marginTop:-13,
    width:(x - em(0.02)*2)  * (2/7),
    height:50
  },
   resText:{
    left:18,
    top:8,
    color:'black',
    fontSize:12,
    fontWeight: 'bold'
  },
  creditText:{
    left:16,
    top:13,
    color:'white',
    fontSize:em(1),
    fontWeight: 'bold'
  },
  pinkLine:{
    marginTop:10,
    backgroundColor:'rgba(242, 126, 188, 0.76)',
    height:20
  },
  blueLine:{
    backgroundColor:'rgba(153, 211, 240, 0.82)',
    height:20,
    marginBottom:30
  },
  columns:{
    borderColor:'red',
    borderWidth: 2,
    borderRadius: 5,
    flexGrow:0,
     alignItems:'center',
    flexShrink:1,
    flexBasis:75,
    height: 45
  },
  fruits:{
    width:(x - em(0.02)*2)  * (1/10),
    height:35
  },

  numbersRow: {
    height: 80,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems:'center'
   
  },
 result: {
   alignSelf:'center',
  flexDirection: 'column',
  marginBottom:10

  },
  credit:{
    alignSelf:"center"
  },
  modal: {
   // justifyContent: 'center',
    //alignItems: 'center'
    zIndex:20
  },
  image:{
     width: windowWidth * 0.70,
    height: windowHeight * 0.35
  }
});