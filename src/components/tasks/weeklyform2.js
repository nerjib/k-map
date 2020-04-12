import React, { Components } from 'react';
import {Button,Keyboard,Image,Dimensions, AsyncStorage,KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Activityform from './activityform'



export default class WeeklyForm2 extends React.Component {
constructor(props){
    super(props)
    this.state={
        data:'',
       pid: this.props.pid,
       uid:this.props.id,
        summary: '',
        summaryfrom: '',
        summaryto: '',
        conclusion: '',
        followup: '',
        compliance: '' ,
        gps:'890,654',    
        row:[]   
    }
}


  componentDidMount(){
    
   // alert('inital'+ JSON.stringify(initialState))
  //  Object.keys(initialState).map(e=>{alert(e)})
    // alert(this.state);
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects'+this.props.pid)
    .then(res=>{
        this.setState({
            data: res.data[0],
          })
        }).catch(error=>{console.log(error.message)})
       
        
        
    }  
         
    

handleSaveContinue=()=>{
    let    obj = {
        pid:this.props.pid,
        uid:  this.props.uid,
        summary: this.state.summary,
        summaryfrom: this.state.summaryfrom,
        summaryto: this.state.summaryto,
        conclusion: this.state.conclusion,
        followup: this.state.followup,
        compliance: this.state.compliance,
        gps: this.state.gps
            }
            axios.post('https://ruwassa.herokuapp.com/api/v1/reports/submitted/weekly',obj)
            .then(res=>{
                console.log('yay'+res.data[0].id)
           //     Actions.taskDetails({uid:this.props.uid,pid:this.props.pid})
            }).catch(error=>{console.log(error.message)})
}
render() {

    return (
        <ScrollView style={styles.container}>
        <View >
          
        <View>
            <Activityform pid={this.props.pid} uid={this.props.uid} rid={this.props.rid}/>
        </View>

            </View>
        </ScrollView>
    )

}
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        paddingTop:45,
        backgroundColor: '#f0f0f4',
      /*  flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00e9f9',
        height: '100%',
        width:'100%'*/
    },
    header:{
        fontSize: 25,
        textAlign:'left',
        margin:10,
        fontWeight:'bold'
    },
    box:{
        margin:10,
        height:40,
        borderColor: 'grey',
        borderWidth:2,
        width:'90%',
        marginRight:20,
        borderRadius:4
    },
    box1:{
        margin:10,
        height:60,
        borderColor: 'grey',
        borderWidth:1,
        borderBottomWidth:2,
        width:'90%',
        marginRight:20,
        display:'flex',
        borderRadius:4
    },
    txt:{
      fontSize:20,
      marginTop:15,
      marginLeft:5,
      marginRight:2
    },
    row:{
        flexDirection:'row',
        alignContent:'stretch',
        alignSelf:'auto'

    },
    updbtn:{
        backgroundColor:'#00c3f9',
        width:150,
        borderRadius:7,
        height:50
    },
    btnview:{
        flexDirection:'column',
        alignItems:'center',
        marginTop:50
    },
    btntxt:{
        color:'white',
        textAlign:'center',
        fontSize:20
    },
    img:{
        backgroundColor:"#00b1b0",
        margin:1
    },
    head:{
        flexDirection:'column',
        flex:1,
        alignItems:'flex-start',
        alignContent:'flex-start',
    }

})