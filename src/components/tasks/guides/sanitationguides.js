import React from 'react';
import { TouchableOpacity,View, Text, StyleSheet, ScrollView} from 'react-native';
import { Actions }  from 'react-native-router-flux';

 class SanitationGuides extends React.Component{

    goToStagesofContract =()=>{
        Actions.pdf1()
    }
    goToSupervisionReport =()=>{
        Actions.supervisionTem()
    }
    goToSanitation =()=>{
        Actions.sanitation()
    }
 
        
        render(){
    return (
            <View style={styles.contatiner}>
       <ScrollView>
       <TouchableOpacity style={styles.btn}
            onPress={this.goToSupervisionReport}>
            <Text style={styles.txt}>Supervision Report</Text>
            </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={this.goToStagesofContract}>
            <Text style={styles.txt}>Stages of contract Supervisors, Roles and Levels</Text>
        </TouchableOpacity>
       
            
            <TouchableOpacity style={styles.btn}
            onPress={this.goToSanitation}>
            <Text style={styles.txt}>2 CRITICAL STAGES FOR SANITATION FACILITY CONSTRUCTION</Text>

            </TouchableOpacity>
            <View style={{height:50}}/>
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
export default SanitationGuides