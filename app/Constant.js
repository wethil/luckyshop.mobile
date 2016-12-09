import {
  StyleSheet, Dimensions
} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
    width:100,
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
    left:18,
    top:13,
    color:'white',
    fontSize:16,
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
    flexBasis:60,
    height: 45
  },
  fruits:{
    width:35,
    height:35
  },

  numbersRow: {
    height: windowHeight * 0.15,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
     width: windowWidth * 0.70,
    height: windowHeight * 0.35
  }
});