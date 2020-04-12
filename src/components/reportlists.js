import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import ReportsListRow from './reportListRow'


export default class ReportsList extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userId:'',
            reports:'',
            tasks2:'',
            weeklyreports:''
        }
    }

loader(){
  //   userId: this.props.userid
 //})
 AsyncStorage.getItem('userid').then((val)=>{

    axios.get('https://ruwassa.herokuapp.com/api/v1/reports/myreports/'+val)
    .then(res=>{
    //    alert(this._isMounted)
   //     if(this._isMounted){
       
        this.setState({
            reports: res.data                
        })
    //}
    }).catch(error=>{console.log(error)})

    axios.get('https://ruwassa.herokuapp.com/api/v1/reports/myreports/weekly/'+val)
    .then(res=>{
    //    alert(this._isMounted)
   //     if(this._isMounted){
       
        this.setState({
            weeklyreports: res.data                
        })
    //}
    }).catch(error=>{console.log(error)})
   
})
  
  
}
componentDidMount(){
    AsyncStorage.getItem('userid').then((val)=>{

///this._isMounted = true;
//    this.inInterval= setInterval( ()=>this.loader(),1000);
axios.get('https://ruwassa.herokuapp.com/api/v1/reports/myreports/'+val)
.then(res=>{
//    alert(this._isMounted)
//     if(this._isMounted){
   
    this.setState({
        reports: res.data                
    })
//}
}).catch(error=>{console.log(error)})

axios.get('https://ruwassa.herokuapp.com/api/v1/reports/myreports/weekly/'+val)
.then(res=>{
//    alert(this._isMounted)
//     if(this._isMounted){
   
    this.setState({
        weeklyreports: res.data                
    })
//}
}).catch(error=>{console.log(error)})

})

}
componentWillUnmount(){
   /// this._isMounted=false
    clearInterval(this.inInterval)
}

goToDetails=(pid,uid)=>{
//Actions.taskDetails({pid,uid})
}
getProjectInfo = (pid) => {
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+pid)
  .then(res=>{
  //    alert(this._isMounted)
 //     if(this._isMounted){
     return res.data[0].title
     
  //}
  }).catch(error=>{console.log(error)})

}
    render(){
        let list=[]
        let list2=[]
        Object.keys(this.state.reports).map(e=>{list.push(<ReportsListRow key={e+1} pid={this.state.reports[e].pid}
            summaryfrom={this.state.reports[e].activitydate} summaryto={this.state.reports[e].summaryto}
            pstatus={this.state.reports[e].pstatus} type={'local'}   />)})

            Object.keys(this.state.weeklyreports).map(e=>{list2.push(<ReportsListRow key={e+1} pid={this.state.weeklyreports[e].pid}
                summaryfrom={this.state.weeklyreports[e].summaryfrom} summaryto={this.state.weeklyreports[e].summaryto}
                pstatus={this.state.weeklyreports[e].pstatus} type={'State'}   />)})
        return(
            <View>
                <ScrollView>
                    {list2}
                    {list}
                    <View style={{height:60}}></View>
                    </ScrollView>
            </View>
        )
    }
}

//Tasks.navigationOptions = {
  ///  title: ' Taskss'
//}
const styles = StyleSheet.create({
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
       color:'red',
       fontSize:20

   }

})