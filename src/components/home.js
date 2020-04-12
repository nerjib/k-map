import React, {component } from 'react';
import {AsyncStorage,BackHandler, Text,TouchableOpacity,ScrollView, Button, StyleSheet, View} from 'react-native'
import {Actions} from 'react-native-router-flux';
//import RNPickerSelect from 'react-native-picker-select'
import RNExitApp from 'react-native-exit-app'

const Home=(props)=>{
//    alert(props.userid)

    
    const goToSignIn=()=>{
        Actions.signin()
    }
    const goToUsers=()=>{
        Actions.task2()
    } 
  

    const getUserId = async () =>{
        let userId = '';
        try{
          userId = await  AsyncStorage.getItem('userId') || 'none';
        }catch(error){
            Console.log(error.message)
        }
        alert(Number(userId)+1);
        return userId;
    }
     const goToTasks =()=>{
     //    alert(this.state.userId)
        Actions.tasks()
    }

    const goToMyReports =()=>{
        //    alert(props.userid)
           Actions.reportslist()
       }

const gotoExit =()=>{
    BackHandler.exitApp();
   //Actions.welcome();
  //Actions.picker();
}
const goToDrafts=()=>{
    Actions.drafts()
}

const goToBoreholesGuide = () => {
    Actions.boreholeguide()
}

const goToSanitationsGuide = () => {
    Actions.sanitationguide()
}
const picker=()=>alert('hi')

    
    return(
        <ScrollView style={styles.scrl}>

        <View style={styles.container}>

         <TouchableOpacity style={styles.btn} onPress={()=>{goToTasks()}}>
         <Text style={styles.txt}
         > Tasks</Text>
     </TouchableOpacity>
    
    <TouchableOpacity style={styles.btn} onPress={()=>{goToMyReports(props.userid)}}>
         <Text style={styles.txt}
         >Reports</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.btn} onPress={()=>{goToDrafts()}}>
         <Text style={styles.txt}
         > Draft</Text>
     </TouchableOpacity>

    <TouchableOpacity style={styles.btn} onPress={goToBoreholesGuide}>
         <Text style={styles.txt}
         >Guidelines for Boreholes Supervision</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.btn} onPress={goToSanitationsGuide}>
            <Text style={styles.txt}
            >Guidelines for Latrines Supervision</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={gotoExit}>
            <Text style={styles.txt}
            > Exit</Text>
        </TouchableOpacity>

      <View style={{height:40}}/>
     </View>
     </ScrollView>

    )
}
const styles=StyleSheet.create({
    
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00e9f9',
        //height:'100%',
        width:'100%',
        marginTop:30,
      //  marginBottom:30

    },
    scrl:{
        backgroundColor: '#00e9f9',

    },
    btn:{
       marginTop:10,
        marginLeft:30,
        marginRight:30,
        padding:25,
        backgroundColor:'#00a1ff',
        color: 'white',
        borderRadius:4,
         height:'15%',
         alignItems:'center',
         width:'60%',
         justifyContent:'center'

    },
    
    txt:{
        fontSize:18,
        paddingBottom:10,
        color:'white',
        
        alignItems:'center',
        textAlign:'center'

    }

})

export default Home