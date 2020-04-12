import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


export default class Tasks extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userId:'',
            tasks:'',
            tasks2:''
        }
    }

loader(){
  //   userId: this.props.userid
 //})
 AsyncStorage.getItem('userid').then((val)=>{

  axios.get('https://ruwassa.herokuapp.com/api/v1/projects/localsupervisors/'+val)
  .then(res=>{
  //    alert(this._isMounted)
 //     if(this._isMounted){
     
      this.setState({
          tasks: res.data                
      })
  //}
  }).catch(error=>{console.log(error)})

  axios.get('https://ruwassa.herokuapp.com/api/v1/projects/statesupervisors/'+val)
  .then(res=>{
  //    alert(this._isMounted)
 //     if(this._isMounted){
     
      this.setState({
          tasks2: res.data                
      })
  //}
  }).catch(error=>{console.log(error)})
 })
}
componentDidMount(){
AsyncStorage.getItem('userid').then((val)=>{this.setState({userId: val})})
///this._isMounted = true;
//alert((AsyncStorage.getItem('userid')))
    this.inInterval= setInterval( ()=>this.loader(),1000);
 // alert(this.state.userId)
}
componentWillUnmount(){
   /// this._isMounted=false
    clearInterval(this.inInterval)
}

goToDetails=(pid,uid)=>{
Actions.taskDetails({pid,uid})
}
    render(){
        return(
            <ScrollView style={{backgroundColor:'#00e9f9'}}>
            <View style={styles.container}>
                {Object.keys(this.state.tasks).map((e)=><TouchableOpacity onPress={()=>this.goToDetails(this.state.tasks[e].id,this.state.userId)} style={styles.row} key={e}>
                <Text  style={styles.txtname} > {this.state.tasks[e].title} </Text>
                <Text style={styles.txtloc}><Text style={styles.txtl}>{this.state.tasks[e].community}<Text style={styles.sep}>|</Text></Text>
                <Text style={styles.txtstat}>{this.state.tasks[e].status}</Text>
                <Text style={styles.sep}>|</Text>
                <Text style={styles.txtstat}>{this.state.tasks[e].pstatus}</Text>
                </Text>
                </TouchableOpacity>
            )
                }

{Object.keys(this.state.tasks2).map((e)=><TouchableOpacity onPress={()=>this.goToDetails(this.state.tasks2[e].id,this.state.userId)} style={styles.row} key={e}>
                <Text  style={styles.txtname} > {this.state.tasks2[e].title} </Text>
                <Text style={styles.txtloc}><Text style={styles.txtl}>{this.state.tasks2[e].community}<Text style={styles.sep}>|</Text></Text>
                    <Text style={styles.txtl}>{this.state.tasks2[e].location}</Text>
                <Text style={styles.txtstat}>{this.state.tasks2[e].status}</Text><Text style={styles.sep}>|</Text>   
                <Text style={styles.txtstat}>{this.state.tasks2[e].pstatus}</Text>
                </Text>
                </TouchableOpacity>
            )
                }
            
            
            </View>
            </ScrollView>
        )
    }
}

//Tasks.navigationOptions = {
  ///  title: ' Taskss'
//}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
       // justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#00e9f9',
        //height:'100%',
        width:'100%',
        marginTop:30,
      //  marginBottom:30
    
    },
    
    row:{
     
        marginTop:2,
        marginLeft:10,
        marginRight:10,
        height:50,
        padding:0,
        alignContent:'center',
        backgroundColor:'#00a9f9',
    },
    txtname:{
        textAlign:'left',
        fontSize:20,
        color:'white'
    },
    txtloc:{
        flexDirection:'column',
        textAlign:'right',
        alignItems:'center',
       fontSize:12,
       color:'white'
   },
   
   txtstat:{
       margin:30,
       color:'white'
   },
   sep:{
       color:'#b1fff5',
       fontSize:20

   }

})
