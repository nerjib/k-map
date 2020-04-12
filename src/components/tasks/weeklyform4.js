import React from 'react';
import {Text, View, Button, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class WeeklyForm4 extends React.Component{
constructor(props){
    super(props)
    this.state={
        activities:'',
            title:'',
            contractor:'',
            lot:'',
            lga:'',
            summary: '',
            summaryfrom:  '',
            summaryto: '',
            conclusion: '',
            followup: '',
            date: '',
            compliance: '',
            gps:'',
            pstatus:'',
            sitegps:'',
            sitestatus:''
    }
}

componentDidMount(){
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+this.props.pid)
    .then(res=>{
        this.setState({
            lga: res.data[0].lga,
            lot: res.data[0].lot,
            contractor: res.data[0].contractor
        })
    })

    axios.get('https://ruwassa.herokuapp.com/api/v1/reports/submitted/incomplete/'+this.props.rid)
    .then(res=>{
        this.setState({
            summary: res.data[0].summary,
            summaryfrom: res.data[0].summaryfrom,
            summaryto: res.data[0].summaryto,
            conclusion: res.data[0].conclusion,
            followup: res.data[0].followup,
            date: res.data[0].date,
            compliance: res.data[0].compliance,
            gps: res.data[0].gps,
            pstatus: res.data[0].pstatus,        
            sitestatus: res.data[0].sitestatus,
            sitegps: res.data[0].sitegps     
         

        })
    })

    axios.get('https://ruwassa.herokuapp.com/api/v1/reports/activity/weekly/'+this.props.rid)
    .then(res=>{
        this.setState({
            activities: res.data,
                   
        })
    })
}

handleSave=()=>{

    const obj = {
      uid:  this.props.uid,
      complete: 1
    }
    axios.put('https://ruwassa.herokuapp.com/api/v1/reports/weekly/save/'+this.props.rid,obj)
    .then(res=>{
        const obj2={
            pstatus:this.state.pstatus,
            sitestatus: this.state.sitestatus
        }
        axios.put('https://ruwassa.herokuapp.com/api/v1/projects/weekly/pstatus/'+this.props.pid,obj2)
            .then(res1=>{
                Actions.home({userid:this.props.uid})
                alert('sent')
            }).catch(error=>{alert('err '+error.message)})
    }).catch(error=>{alert(error.message)})
}
handleCancel=()=>{

    const obj = {
      uid:  this.props.uid,
      complete: 0
    }
    axios.put('https://ruwassa.herokuapp.com/api/v1/reports/weekly/save/'+this.props.rid,obj)
    .then(res=>{
       Actions.home({userid:this.props.uid})
    })

}
    render(){
        return(
            <ScrollView style={styles.container}>
                <View>
                <View>
                <View  style={styles.row}>
                    <Text style={styles.txt1}> projectId:</Text><Text style={styles.txt}> {this.props.pid}</Text>
                    </View>
                    <View  style={styles.row}>

                    <Text  style={styles.txt1}> lga:</Text><Text style={styles.txt}> {this.state.lga}</Text>
                    </View>
                    <View  style={styles.row}>

                    <Text  style={styles.txt1}> lot:</Text><Text style={styles.txt}> {this.state.lot}</Text>
                    </View>
                    <View  style={styles.row}>

                    <Text  style={styles.txt1}> contractor:</Text><Text style={styles.txt}> {this.state.contractor}</Text>
                    </View>
                    <View  style={styles.row}>

                    <Text  style={styles.txt1}> gps:</Text><Text style={styles.txt}> {this.state.gps}</Text>
                    </View>
                    <View  style={styles.row}>

                    <Text  style={styles.txt1}> Stage: </Text><Text style={styles.txt}>{this.state.pstatus}</Text>
                    </View>
                    <View  style={styles.row}>

                    <Text  style={styles.txt1}> Status:</Text><Text style={styles.txt}> {this.state.sitestatus}</Text>

                    </View>

                </View>

                <View  style={styles.row1}>
                    <Text  style={styles.txt1}>Summary of planned activities from </Text>
                    <View  style={styles.row}>
                    <Text  style={styles.txt}>{this.state.summaryfrom}  to </Text>
                    <Text  style={styles.txt}>{this.state.summaryto}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.txt1}>Summary</Text>
                    <Text style={styles.txt}>{this.state.summary}</Text>
                </View>
                <View>
                    <Text style={styles.txt1}>Summary of Activities carried out within the period</Text>
                    {Object.keys(this.state.activities).map(e=>
                    <View>
                     <Text key={e} style={styles.txt}>{this.state.activities[e].date}</Text>
                    <Text key={e} style={styles.txt}>{this.state.activities[e].activity}</Text>
                    </View>
                )}
                </View>

                <View>
                  <Text style={styles.txt1}>  Conclusion and Recommendations:</Text>
                  <Text style={styles.txt}>{this.state.conclusion}</Text>
                </View>
                <View>
                    <Text style={styles.txt1}>Planned Follow-up activities</Text>
                    <Text style={styles.txt}>{this.state.followup}</Text>
                </View>
                <View>
                    <Text style={styles.txt1}>Is work progressing according to submitted Plan</Text>
                    <Text style={styles.txt}>{this.state.compliance}</Text>
                </View>
                <View style={styles.row}>
                <View >
                    <TouchableOpacity onPress={this.handleSave} style={styles.updbtn}><Text style={styles.btntxt}>Send Report</Text></TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={this.handleCancel} style={styles.updbtn}><Text style={styles.btntxt}>Cancel</Text></TouchableOpacity>
                </View>
                </View>
                </View>
                <View style={{height:40}}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        paddingTop:5,
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
    
    txt1:{
        fontSize:20,
        marginTop:15,
        marginLeft:5,
        marginRight:2,
        color:'red'
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