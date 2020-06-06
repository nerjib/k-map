import React, { Components } from 'react';
import {Button,Keyboard,Image,Dimensions, AsyncStorage,KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
//import { saveReport, loadReport } from './reportStorage';
//import Activityform from './activityform'
import Geolo from '../geolo';
import RNPickerSelect from 'react-native-picker-select'





export default class WeeklyForm1 extends React.Component {
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
        gps:'',    
        row:[]  ,
        pStatus:'TOS',
        siteStatus:'ongoing',
        latitude:'',
        longitude:'',
        contactor:'',
        supervisor:''
    }
}


  componentDidMount(){
    // const initialState=loadReport();
    
   // alert('inital'+ JSON.stringify(initialState))
  //  Object.keys(initialState).map(e=>{alert(e)})
    //this.setState(initialState)
    // alert(this.state);
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+this.props.pid)
    .then(res=>{
        this.setState({
            data: res.data[0],
            pStatus: res.data[0].pstatus
          })

          axios.get('https://ruwassa.herokuapp.com/api/v1/contractors/'+res.data[0].contractor_id)
          .then(res1=>{
              this.setState({
                  contractor: res1.data[0].company       
                })
            })

        }).catch(error=>{console.log(error.message)})
        
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.props.uid)
        .then(res=>{
                this.setState({
                    profile: res.data[0],
                    supervisor: res.data[0].first_name +' '+res.data[0].last_name,
                  })
                })
    
    }  
         
    
    handleGps=(gps)=>{
       // alert('gps is'+gps)
        this.setState({
            gps
        })
    }

handleSummary=(text)=>{
    this.setState({
        summary: text
    })
}
handleSummaryfrom=(text)=>{
    this.setState({
        summaryfrom: text
    })}
handleSummaryto=(text)=>{
    this.setState({
        summaryto: text
    })}
handleConclusion=(text)=>{
    this.setState({
        conclusion: text
    })
}

handleFollowup=(text)=>{
    this.setState({
        followup: text
    })
}
handleCompliance=(text)=>{
    this.setState({
        compliance: text
    })
}

handledraft=()=>{
    saveReport(this.state);
    Actions.taskDetails({uid:this.props.uid,pid:this.props.pid})
}
handleUpdate = () =>{
let    obj = {
pid:this.props.pid,
uid:  this.props.uid,
summary: this.state.summary,
summaryfrom: this.state.summaryfrom,
summaryto: this.state.summaryto,
conclusion: this.state.conclusion,
followup: this.state.followup,
compliance: this.state.compliance,
gps: this.state.gps,
pstatus: this.state.pStatus

    }
    axios.post('http://127.0.0.1:5000/api/v1/reports/submitted/weekly',obj)
    .then(res=>{
        Actions.taskDetails({uid:this.props.uid,pid:this.props.pid})
    }).catch(error=>{alert(error.message)})
}
handleActivity=()=>{
    Actions.activityform({uid:this.props.uid,pid:this.props.pid})
}
handleRow=(a)=>{
    this.state.row.push(a)
}
handleStage=(value)=>{
//    alert(value)
    this.setState({
        pStatus:value
    })
}
handleLatitude=(value)=>{
    //    alert(value)
        this.setState({
            latitude:value
        })
    }
    handleLongitude=(value)=>{
        //    alert(value)
            this.setState({
                longitude:value
            })
        }
handleStatus=(value)=>{
 //       alert(value)
       this.setState({
           siteStatus:value
        })
    }
handleSaveContinue=()=>{
//checkk if user is not remove from the pplatform
if(this.state.pStatus==''|| this.state.siteStatus==''){
    alert('Select project stage and status')
}
else if(this.state.gps==''){
alert('turn on your location')
}
else{
    axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.props.uid)
        .then(res=>{
                if (res.data[0].active=='active'){
                    

    let    obj = {
        pid:this.props.pid,
        uid:  this.props.uid,
        summary: this.state.summary,
        summaryfrom: this.state.summaryfrom,
        summaryto: this.state.summaryto,
        conclusion: this.state.conclusion,
        followup: this.state.followup,
        compliance: this.state.compliance,
        gps: this.state.gps,
        pstatus: this.state.pStatus,
        sitestatus: this.state.siteStatus,
        sitegps: this.state.latitude+','+this.state.longitude
            }
            axios.post('https://ruwassa.herokuapp.com/api/v1/reports/submitted/weekly',obj)
            .then(res=>{
             //   alert('yay'+res.data[0].id)
               
           Actions.weeklyform2({uid:this.props.uid,pid:this.props.pid, rid: res.data[0].id})
            }).catch(error=>{alert(error.message)})

       
        }else{
            AsyncStorage.setItem('login','denied');
            alert('you dont have access')
            Actions.signin()
        }
}).catch(error=>{alert(error.message)})
}
}
render() {

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled keyboardVerticalOffset={0} >
        <ScrollView >
        <View >
            <View><Geolo onGps={this.handleGps}/></View>
        <View style={styles.header}>
            <View><Text style={styles.txt1}>LGA:{this.state.data.lga}</Text></View>
            <View><Text style={styles.txt1} >Contractor:{this.state.contractor}</Text></View>      
            <View><Text style={styles.txt1}>LOT:{this.state.data.lot}</Text></View>
            <View><Text style={styles.txt1}>Supervisor Id: {this.props.uid+' '+this.state.supervisor}</Text></View>
            <View><Text style={styles.txt1}>Stage: {this.state.pStatus}</Text></View>

        </View>
        <View >

        <View>
             <Text style={styles.txtstatus}>Project Stage</Text>
         <RNPickerSelect style={{color:'red'}} onValueChange={this.handleStage}
        items={[

            {label:'Taking Over Site',  value:'TOS'},
            {label:'Geophysical Survey (Water) ', value:'GS'},
            {label:'Drilling (Water) ', value:'Drilling'},
            {label:'Excavation (VIP)', value:'Excavation'},
            {label:'Sub-Structure (VIP) ', value:'SubS'},
            {label:'Super-Structure (VIP) ', value:'SuperS'},
            {label:'Pumping Test (Water)', value:'PT'},
            {label:'Pump Installation (Water)', value:'PI'},
            {label:'Platforming (Water)', value:'Platforming'},
            {label:'Foundation for Stanchion (Solar) ', value:'FS'},
            {label:'Erection of Stanchion (Solar)', value:'ES'},
            {label:'Installation of Solar Pump/Panel ', value:'ISP'},
            {label:'Reticulation (Solar)', value:'Reticulation'},
            {label:'Fittings and Finishing (VIP) ', value:'Finishing'},    
        {label:'Final Report', value:'FR'},             
        ]}
        />

         </View>

         <View>
     {/*}        <Text style={styles.txtstatus}>Project Status</Text>
         <RNPickerSelect style={{color:'red'}} onValueChange={this.handleStatus}
        items={[
            {label:'Ongoin',  value:'ongoing'},
            {label:'Completed ', value:'completed'},
            {label:'Abandoned ', value:'abandoned'}         
        ]}
        />
    */}
         </View>
       
            <View>
         <Text  style={styles.txt}>Summary of planned activities for the week</Text>
         </View>
         
         <View style={styles.row}>
         <View style={styles.rowdate}>
         < TextInput placeholder='Date From dd/mm/yyy'  value={this.state.summaryfrom}
          onChangeText={this.handleSummaryfrom} style={styles.box}/>
         </View>
         <View style={styles.rowdate}>
         < TextInput placeholder='Date To dd/mm/yyy' value={this.state.summaryto} onChangeText={this.handleSummaryto}
          style={styles.box}/>
         </View>
         </View>
         <View>
             <TextInput multiline maxLength={200} placeholder='Summary' value={this.state.summary} onChangeText={this.handleSummary} 
             style={styles.box1} required />
         </View>
          </View>
          
<View style={styles.row}>
          <View style={styles.btnview}>
              <TouchableOpacity onPress={this.handleSaveContinue} style={styles.updbtn}><Text style={styles.btntxt}>Save and Continue</Text></TouchableOpacity>
          </View>
       {/*   
          <View style={styles.btnview}>
              <TouchableOpacity onPress={this.handledraft} style={styles.updbtn}><Text style={styles.btntxt}>Save as draft</Text></TouchableOpacity>
          </View>
*/
       }
</View>
        </View>
        <View style={{height:60}}/>
        </ScrollView>
        </KeyboardAvoidingView>
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
        borderBottomWidth:2,
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
    box3:{
        margin:10,
        height:60,
        borderColor: 'grey',
        borderWidth:5,
        borderBottomWidth:2,
        width:'50%',
        marginRight:20,
        display:'flex',
        borderRadius:4,
        color:'red'
    },
    txt:{
      fontSize:20,
      marginTop:15,
      marginLeft:5,
      marginRight:2
    },
    txt1:{
        fontSize:15,
        marginTop:15,
        marginLeft:5,
        marginRight:2
      },
    txtstatus:{
        fontSize:20,
        marginTop:15,
        marginLeft:5,
        marginRight:2,
        alignItems:'center',
        alignSelf:'center'
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
        height:50,
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