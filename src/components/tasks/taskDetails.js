import React from 'react';
import {Text, View,ScrollView, TouchableOpacity, StyleSheet, Button, Image,} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';



export default class TaskDetails extends React.Component{
constructor(props){
    super(props)

        this.state={
            tasks:'',
            localsupervisor:'',
            role:'',
            image: null,
            file:'',
            type:'',
            facility:'',
            contractor:'',
            statesupervisor:'',
            profile:'',
            stateid:'',
            localid:'',
            phase:''
        
        }
}


componentDidMount(){
    this.setState({
        userId: this.props.userid
    })
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+this.props.pid)
    .then(res=>{
        this.setState({
            tasks: res.data,
            stateid: res.data[0].state_id,      
            localid: res.data[0].local_id,
            phase: res.data[0].phase           
           
          })

          axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+res.data[0].state_id)
.then(res=>{
        this.setState({
            profile: res.data[0],
            statesupervisor:  res.data[0].first_name +' '+res.data[0].last_name,
            statesupervisorphone: res.data[0].phone,

          })
     
}).catch(error=>{console.log(error.message)})

axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+res.data[0].local_id)
.then(res=>{
        this.setState({
            localsupervisor:  res.data[0].first_name +' '+res.data[0].last_name,
            localsupervisorphone: res.data[0].phone,

        })
     
}).catch(error=>{console.log(error.message)})


          axios.get('https://ruwassa.herokuapp.com/api/v1/contractors/'+res.data[0].contractor_id)
          .then(res1=>{
              this.setState({
                  contractor: res1.data[0].company,
                  contractorphone: res1.data[0].phone
                  
       
                })
            })
         
 }).catch(error=>{console.log(error.message)})

 this.setState({
    userId: this.props.userid
})

}

goToWeeklyForm=(pid)=>{
    Actions.weeklyform1({pid, uid:this.props.uid})
}
goToReportForm=(pid)=>{
    if (this.state.role==='State Supervisor'){
   Actions.form1({pid,uid:this.props.uid})
  // alert('you are state')
}
    else if(this.state.role==='Local Supervisor'){
        Actions.form1({pid,uid:this.props.uid})
    //    alert('you are local')
    }
    Actions.form({pid,uid:this.props.uid})

}
    render(){
        return(
            <ScrollView style={{backgroundColor:'#00e9f9'}}>{
            Object.keys(this.state.tasks).map(e=>

            <View key={e}>
                <View style={styles.row}>
                <Text style={styles.title}>Project Title: </Text><Text style={styles.info}> {this.state.tasks[e].title}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Phase: </Text><Text style={styles.info}> {this.state.tasks[e].phase}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Ward </Text><Text style={styles.info}>{this.state.tasks[e].ward}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Community: </Text><Text style={styles.info}>{this.state.tasks[e].community}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Facility: </Text><Text style={styles.info}>{this.state.tasks[e].facility}</Text>
                </View>
             
             
             
                <View style={styles.row}>
                <Text style={styles.title}>Location: </Text><Text style={styles.info}>{this.state.tasks[e].location}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>LGA </Text><Text style={styles.info}>{this.state.tasks[e].lga}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Started on: </Text><Text style={styles.info}> {new Date((this.state.tasks[e].started).substring(1,20))+' '}</Text>
                </View>
                 <View style={styles.row}>
                <Text style={styles.title}>Status: </Text><Text style={styles.info}>{this.state.tasks[e].status}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Contractor: </Text><Text style={styles.info}>{this.state.contractor}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Contractor Phone:</Text><Text style={styles.info}> { this.state.contractorphone}</Text>
                </View> 
                <View style={styles.row}>
                <Text style={styles.title}>State Supervisor:</Text><Text style={styles.info}> { this.state.statesupervisor}</Text>
                </View> 
                <View style={styles.row}>
                <Text style={styles.title}>State Supervisor Phone:</Text><Text style={styles.info}> { this.state.statesupervisorphone}</Text>
                </View> 
                <View style={styles.row}>
                <Text style={styles.title}>Local Supervisor: </Text><Text style={styles.info}>{this.state.localsupervisor}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.title}>Local Supervisor:</Text><Text style={styles.info}> { this.state.localsupervisorphone}</Text>
                </View> 
                <View style={styles.row}>
                <Text style={styles.title}>Role:</Text><Text style={styles.info}> { this.state.profile.role}</Text>
                </View> 
                <View style={styles.row}>
                <Text style={styles.title}>Last Remark: </Text><Text style={styles.info}>{this.state.tasks[e].remark}</Text>
                </View>
                <View style={styles.row}>
                <View style={styles.updateview}>
                    <TouchableOpacity onPress={()=>this.goToReportForm(this.props.pid)} style={styles.updatebtn} ><Text style={{fontSize:17,color:'white',marginTop:5}}>Daily Report</Text></TouchableOpacity>
                </View>
                <View style={styles.updateview}>
                    <TouchableOpacity onPress={()=>this.goToWeeklyForm(this.props.pid)} style={styles.updatebtn} ><Text style={{textAlign:'center', fontSize:17,color:'white',marginTop:5}}>Weekly Report</Text></TouchableOpacity>
                </View>
                </View>
                <View style={{height:40}}/>
            </View>
            )
            }
            </ScrollView>

        )
    }
}



const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        margin:10
    },
    title:{
        fontSize:19,
        color:'red'

    },
    info:{
        fontSize:19,
        color:'black'
    },
    updateview:{
        flexDirection:'column',
        borderRadius:8,
        alignContent:'center',
        alignItems:'center',
        marginTop:40
        
    },
    updatebtn:{
        
        width:100,
        height:60,
        borderRadius:8,
        alignContent:'center',
        alignItems:'center',
        backgroundColor: '#00b4f9',
        margin:10
      
        
    }

})