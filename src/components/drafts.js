import React from 'react';
import axios from 'axios';
import {Text, View, ScrollView, AsyncStorage, TouchableOpacity, StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux';



export default class Drafts extends React.Component{
    constructor(props){
        super(props)
        this.state={
                draft1:'',
              dft2:'',
              dft1:'',
              dft3:'',
              dft4:'',
              dft5:'',
              dft6:'',
              draft4:'',
              draft5:''  ,
              draft1info:'empty',
              draft2info:'empty',
              draft3info:'empty',
              draft4info:'empty',
              draft5info:'empty',
              draft6info:'empty'
        }
    }
componentDidMount=()=>{
   //AsyncStorage.getItem('4').then(val=>{this.setState({draft4:JSON.parse(val)})})
 //  AsyncStorage.getItem('5').then(val=>{this.setState({draft5:JSON.parse(val)})})
   //AsyncStorage.getItem('3').then(val=>{this.setState({draft3:JSON.parse(val)})})
   AsyncStorage.getItem('2').then(val=>{
     if(val=='empty'|| val==null){
       this.setState({
            draft2info:this.state.draft2info
          })
        }else{
        this.setState({
          draft2: JSON.parse(val),
          draft2info:'Drafted Message'
        })
        }
    })

   AsyncStorage.getItem('1').then(val=>{
        if(val=='empty'|| val==null){
          this.setState({
            draft1info:draft1info
          })
        }else{
        this.setState({
          draft1:JSON.parse(val),
          draft1info:'Drafted Message'

        })
        }
  })
  AsyncStorage.getItem('3').then(val=>{
    if(val=='empty'|| val==null){
      this.setState({
        draft1info:draft3info
      })
    }else{
    this.setState({
      draft3:JSON.parse(val),
      draft3info:'Drafted Message'

    })
    }
})
AsyncStorage.getItem('4').then(val=>{
  if(val=='empty'|| val==null){
    this.setState({
      draft4info:draft4info
    })
  }else{
  this.setState({
    draft4:JSON.parse(val),
    draft4info:'Drafted Message'

  })
  }
})
AsyncStorage.getItem('5').then(val=>{
  if(val=='empty'|| val==null){
    this.setState({
      draft5info:draft4info
    })
  }else{
  this.setState({
    draft5:JSON.parse(val),
    draft5info:'Drafted Message'

  })
  }
})
AsyncStorage.getItem('draftrec1').then(val=>{this.setState({dft1:val})})
AsyncStorage.getItem('draftrec2').then(val=>{this.setState({dft2:val})})
AsyncStorage.getItem('draftrec3').then(val=>{this.setState({dft3:val})})
AsyncStorage.getItem('draftrec4').then(val=>{this.setState({dft4:val})})
AsyncStorage.getItem('draftrec5').then(val=>{this.setState({dft5:val})})

}

handleDraft1=()=>{
  // AsyncStorage.setItem('1','empty')
    //this.setState({draft1:'emp'})
 //   alert(pid)
    Actions.draftmsg({draft:'1'})
}

handleDraft2=()=>{
    //AsyncStorage.setItem('1','empty')
     //this.setState({draft1:'emp'})
   //  alert(pid)
     Actions.draftmsg({draft:'2'})
 }
 handleDraft3=()=>{
  //AsyncStorage.setItem('1','empty')
   //this.setState({draft1:'emp'})
 //  alert(pid)
   Actions.draftmsg({draft:'3'})
}
handleDraft4=()=>{
  //AsyncStorage.setItem('1','empty')
   //this.setState({draft1:'emp'})
 //  alert(pid)
   Actions.draftmsg({draft:'4'})
}
handleDraft5=()=>{
  //AsyncStorage.setItem('1','empty')
   //this.setState({draft1:'emp'})
 //  alert(pid)
   Actions.draftmsg({draft:'5'})
}
 
render(){
  let  row=[];
      return(
        <ScrollView style={{backgroundColor:'#00e9f9'}} >
          <View style={styles.container}>
<TouchableOpacity onPress={this.handleDraft1} style={styles.btn}>
<View >

<Text style={styles.txt}>Draft 1</Text>
<Text style={styles.txtloc}>{this.state.draft1info}</Text>
</View>

</TouchableOpacity>

<TouchableOpacity onPress={this.handleDraft2} style={styles.btn}>
  <View>
<Text style={styles.txt}>Draft 2</Text>
<Text style={styles.txtloc}>{this.state.draft2info}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={this.handleDraft3} style={styles.btn}>
  <View>
<Text style={styles.txt}>Draft 3</Text>
<Text style={styles.txtloc}>{this.state.draft3info}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={this.handleDraft4} style={styles.btn}>
  <View>
<Text style={styles.txt}>Draft 4</Text>
<Text style={styles.txtloc}>{this.state.draft4info}</Text>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={this.handleDraft5} style={styles.btn}>
  <View>
<Text style={styles.txt}>Draft 5</Text>
<Text style={styles.txtloc}>{this.state.draft5info}</Text>
</View>
</TouchableOpacity>

          </View>
          <View style={{height:60}}/>
          </ScrollView>
      )
  
}

}

const styles= StyleSheet.create({
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

  btn:{
    marginTop:10,
     marginLeft:10,
     marginRight:10,
     padding:25,
     backgroundColor:'#00a1ff',
     color: 'white',
     borderRadius:4,
      height:'18%',
      alignItems:'center',
      width:'90%',
      justifyContent:'center'

 },
 txt:{
  fontSize:18,
  paddingBottom:10,
  color:'white',
  
  alignItems:'center',
  textAlign:'center'

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

})