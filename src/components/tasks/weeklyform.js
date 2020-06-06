import React from 'react';
import {Button,Keyboard,Image,Dimensions, AsyncStorage,KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Geolo from '../geolo'
import RNPickerSelect from 'react-native-picker-select'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class WeeklyForm extends React.Component{
constructor(props){
    super(props)
    this.state={
            gps:'',
            summary:'',
            summaryfrom:'',
            summaryto: '',
            pStatus:'TOS',
            siteStatus:'ongoing',
            activity:'',
            outcome:'',
            date:'',
            image: null,
        file:'',
        type:'',
        imguri:'k',
        uploading: false,
        uploaded:'',
        imgurl:'',
        compliance:'',
        followup:'',
        conclusion:''
    }

}

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

handleDateChange=(text)=>{
    this.setState({date:text})
}
handleActivityChange=(text)=>{
    this.setState({activity:text})
}
handleOutcomeChange=(text)=>{
    this.setState({outcome:text})
}

    handleGps=(gps)=>{
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
    handleStatus=(value)=>{
        //      alert(value)
              this.setState({
                  siteStatus:value
               })
           }

           handleStage=(value)=>{
            //    alert(value)
                this.setState({
                    pStatus:value
                })
            }
            componentDidMount(){
           //     this.getPermissionAsync();
             
            }

            handleSaveToDraft= async()=>{
               /* alert('gps '+this.state.gps+' Statge' +this.state.pStatus+' site '+ this.state.siteStatus+' from '+this.state.summaryfrom+' summaryto '+this.state.summaryto+
                ' summary '+this.state.summary+' acti '+ this.state.activity+ ' date '+this.state.date+' outcome '+ this.state.outcome+' uri'+
                this.state.imguri+' pid '+this.props.pid+' uid '+this.props.uid+' coclusion '+this.state.conclusion+' followup '+ this.state.followup+' compliance '+
                this.state.compliance)
                */
           
                const draft={
                    gps:this.state.gps,
                    stage: this.state.pStatus,
                    status:this.state.siteStatus,
                    summaryfrom: this.state.summaryfrom,
                    summaryto: this.state.summaryto,
                    summary: this.state.summary,
                    activity: this.state.activity,
                    date: this.state.date,
                    outcome:this.state.outcome,
                    uri: this.state.imguri,
                    pid: this.props.pid,
                    uid: this.props.uid,
                    conclusion:this.state.conclusion,
                    followup:this.state.followup,
                    compliance: this.state.compliance
                }


//imm doing this to beat time
AsyncStorage.getItem('1').then((val1)=>{
  //  alert('val1 '+val1)
    if(val1=='empty'||val1==null){
      //  alert('val1 '+val1)
        AsyncStorage.setItem('1',JSON.stringify(draft))
        AsyncStorage.setItem('draftrec1','this.props.pid')
    }
    else{
        AsyncStorage.getItem('2').then(val=>{
            if(val=='empty'||val1==null){
                AsyncStorage.setItem('2',JSON.stringify(draft))
                AsyncStorage.setItem('draftrec2','this.props.pid')

            }
        
        })

    }
})

Actions.home();
   }

  
                   
    render(){
        return(
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
    <ScrollView >
    <View >
        <View><Geolo onGps={this.handleGps}/></View>
    <View style={styles.header}>
{/*
        <View><Text style={styles.txt1}>LGA:{this.state.data.lga}</Text></View>
        <View><Text style={styles.txt1} >Contractor:{this.state.data.contractor}</Text></View>      
        <View><Text style={styles.txt1}>LOT:{this.state.data.lot}</Text></View>
        <View><Text style={styles.txt1}>Supervisor Id: {this.props.uid}</Text></View>
        <View><Text style={styles.txt1}>Stage: {this.state.pStatus}</Text></View>
*/
}
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
    {label:'Final Report ', value:'FR'},    
     
    ]}
    />

     </View>

     <View>
   {/*}      <Text style={styles.txtstatus}>Project Status</Text>
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
     
     <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={0} >
     <View style={styles.row}>
     <View style={styles.rowdate}>
     < TextInput placeholder='Date From dd/mm/yyyy'  value={this.state.summaryfrom}
      onChangeText={this.handleSummaryfrom} style={styles.box}/>
     </View>
     <View style={styles.rowdate}>
     < TextInput placeholder='Date To dd/mm/yyyy' value={this.state.summaryto} onChangeText={this.handleSummaryto}
      style={styles.box}/>
     </View>
     </View>
     </KeyboardAvoidingView>
     <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={0}>
     <View>
         <TextInput multiline maxLength={200} placeholder='Summary' value={this.state.summary} onChangeText={this.handleSummary} 
         style={styles.box1} required />
     </View>
     </KeyboardAvoidingView  >
      </View>
      
   {/*   
      <View style={styles.btnview}>
          <TouchableOpacity onPress={this.handledraft} style={styles.updbtn}><Text style={styles.btntxt}>Save as draft</Text></TouchableOpacity>
      </View>
*/
   }
    </View>

                <Text style={styles.txt}>Activity</Text>
                <TextInput onChangeText={this.handleActivityChange} value={this.state.activity} multiline maxLength={150} style={styles.box1} placeholder=''/>
                <Text style={styles.txt}>Date</Text>
                <TextInput onChangeText={this.handleDateChange} value={this.state.date} style={styles.box} placeholder='dd/mm/yyyy'/>
    
                <Text style={styles.txt}>Outcome</Text>
                <TextInput onChangeText={this.handleOutcomeChange} value={this.state.outcome} multiline maxLength={150} style={styles.box1} placeholder=''/>
       <View>
       <Button
          onPress={this._takePhoto}
          title="Take Photo"
        />

        <Text>Status: {this.state.uploaded}</Text>
         <Image source={{uri: this.state.imguri}}
       style={{width: 150, height: 150}} />
       </View>


       <View>
             <Text style={styles.txt}>Conclusion and Recommendation</Text>
        <View style={styles.row}>
             <TextInput multiline placeholder='Conclusion' value={this.state.conclusion} onChangeText={this.handleConclusion} 
             style={styles.box1}/>
         </View>
         </View>

         <View>
             <Text style={styles.txt}>Planned Follow-up activities for next week</Text>
        <View style={styles.row}>
             <TextInput placeholder='Follow up' value={this.state.followup} onChangeText={this.handleFollowup} 
             style={styles.box1}/>
         </View>
         </View>

         <View>
             <Text style={styles.txt}>Is work Progressing according to submitted plan?</Text>
        <View style={styles.row}>
             <TextInput placeholder='Compliance' value={this.state.compliance} onChangeText={this.handleCompliance} 
             style={styles.box1}/>
         </View>
         </View>
     


<View style={styles.row}>
      <View style={styles.btnview}>
          <TouchableOpacity onPress={this.handleSaveToDraft} style={styles.updbtn}><Text style={styles.btntxt}>Save to Draft</Text></TouchableOpacity>
      </View>

</View>
<View >
 <Text>   {this.state.uploaded}</Text>
      <View style={styles.btnview}>
          <TouchableOpacity onPress={this.handleSend} style={styles.updbtn}><Text style={styles.btntxt}>Send Report</Text></TouchableOpacity>
      </View>

</View>


    <View style={{height:60}}/>
    </ScrollView>
    </KeyboardAvoidingView>

        )
    }

    _takePhoto = async () => {
        const {
          status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);
    
        const {
          status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
          let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
    
          this._handleImagePicked(pickerResult);
        }
      };

      _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
    
        try {
          this.setState({
              uploaded:'',
          });
    
          if (!pickerResult.cancelled) {
this.setState({
    imguri:pickerResult.uri
})

          }else{this.setState({uploaded:'cancelled'})}
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
          this.setState({
            uploaded:'failed',
        });
        } finally {
          this.setState({
            uploading: false
          });
        }
      };

      handleSend=()=>{
        //alert(this.state.imguri)
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.props.uid)
        .then(res=>{
                if (res.data[0].active=='active'){
                    this._handleImagePicked1(this.state.imguri)
                }else{
                    AsyncStorage.setItem('login','denied');
                    alert('you dont have access')
                    Actions.signin()
                }
        }).catch(error=>{alert(error.message)})
            
      }

      _handleImagePicked1 = async pickerResult => {
        let uploadResponse, uploadResult;
    
        try {
          this.setState({
              uploaded:'loading...',
          });
          if (pickerResult) {
           //  alert(pickerResult)
            uploadResponse = await uploadImageAsync(pickerResult,this.props.pid,this.props.uid);
            uploadResult = await uploadResponse.json();
          // alert(uploadResult[0].imgurl)
           if(uploadResult[0].imgurl!=null){
               
            this.setState({
                        imguri:pickerResult,
                           uploaded:'done',
                           imgurl:uploadResult[0].imgurl,
              image: uploadResult.location
            });

  //          alert(this.props.pid+' uid '+this.props.uid+' sumf'+this.state.summaryfrom+' st '+this.state.summaryto+' sum '+this.state.summary)
        const data={
            pid: this.props.pid,
            uid: this.props.uid,
            summaryfrom: this.state.summaryfrom,
            summaryto: this.state.summaryto,
            summary: this.state.summary,
            conclusion: this.state.conclusion,
            followup:this.state.followup,
            compliance: this.state.compliance,
            pstatus: this.state.pStatus,
            sitestatus: this.state.siteStatus,
            sitegps: this.state.gps,
            imgurl: uploadResult[0].imgurl,
            gps:this.state.gps,
            activity: this.state.activity,
            activitydate: this.state.date,
            activityoutcome: this.state.outcome
        }
        axios.post('https://ruwassa.herokuapp.com/api/v1/reports',data)
.then(res=>{alert('done')
//    AsyncStorage.setItem(this.props.draft,'empty');
  //  AsyncStorage.setItem('draftrec'+this.props.draft,'empty'
  const obj2={
    pstatus:this.state.pStatus,
    sitegps: this.state.gps,
    sitestatus: this.state.siteStatus
}
axios.put('https://ruwassa.herokuapp.com/api/v1/projects/pstatus/'+this.props.pid,obj2)
    .then(res1=>{
        Actions.home({userid:this.props.uid})

    }).catch(error=>{alert('err '+error.message)})

    Actions.home();
  }
)

        
        }else{
             
                this.setState({
                    imguri:'k',
                       uploaded:'Check your network',
                       //imgurl:uploadResult[0].imgurl,
          image: uploadResult.location
        })
            }
          }else{this.setState({uploaded:'cancelled'})}
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
    //      alert('Upload failed, sorry :(');
          this.setState({
            uploaded:'failed',
        });
        } finally {
          this.setState({
            uploading: false
          });
        }
      };


}

async function uploadImageAsync(uri,a,b) {
    let apiUrl = 'https://ruwassa.herokuapp.com/api/v1/activityform';
  
    
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  //alert(fileType)
    let formData = new FormData();
    formData.append('rid',a);
    formData.append('pid', b);
    formData.append('activity',1);
    formData.append('outcome',1);
    formData.append('image', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return fetch(apiUrl, options)
   
  
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
        borderBottomWidth:3,
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