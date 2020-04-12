import React, { Components } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {Actions} from 'react-native-router-flux'
import axios from 'axios';

export default class BoreholeConstGuides extends React.Component{
    state={
        data:''
    }
    goToStagesofContracts=()=>{
        Actions.pdf1()
    }
    goToSupervisionReport=()=>{
        Actions.supervisionTem()
    }
    goToBorehole=()=>{
        Actions.borehole()
    }
    componentDidMount(){
   /*    axios.get('http://192.168.43.252:5000/api/v1/users')
        .then((res)=>{
            this.setState({
                data: res.data
            })
        }).catch(error=>{alert(error)})

    }
    info=(i)=>{
        alert('Email is: ' +i)
    */
    }

   
    render(){
        return(
            <View style={styles.contatiner}>
      <ScrollView>
            <TouchableOpacity style={styles.btn}
            onPress={this.goToSupervisionReport}>
            <Text style={styles.txt}>Supervision Report</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}
            onPress={this.goToStagesofContracts}>
            <Text style={styles.txt}>Stages of Contract Supervisors, Roles and Levels </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}
            onPress={this.goToBorehole}>
            <Text style={styles.txt}>Borehole Manuals</Text>

            </TouchableOpacity>
            </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    // #00e9f9
    contatiner:{
         backgroundColor:"#00e9f9",
         height:'100%'
    },
     btn:{
         marginTop:20,
         marginLeft:10,
         marginRight:10,
         padding:25,
         backgroundColor:'#00a1ff',
         color: 'white',
         borderRadius:4,
      //    height:4,
          alignItems:'center'
     },
     txt:{
         fontSize:18,
         paddingBottom:10,
         color:'white'
     }
 
 })