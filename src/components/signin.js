import React, { Components } from 'react';
import {AsyncStorage, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
export default class Signin extends React.Component {
state={
email:'',
password:'',
id:''
}

componentDidMount=()=>{
    AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
            Actions.home();
        }
    })
}
handleChangeEmail =(text)=>{
this.setState({
email:text
})
}
   handleChangePass = (text)=>{
       this.setState({
           password:text
       })
   }
  goToHome=(userid)=>{
    Actions.home({userid})
}
    saveUserId=async userId=>{
        try {
            await AsyncStorage.setItem('userId', userId);
        }catch(error) {
            alert(error.message)
        }
    }

login=(a,b)=>{
  //alert('HelloEmail: '+a+' check your  Password and try again '+b)

const pts={
    item:'ggg',
    date:'78888'
}

/*const existingpts = await AsyncStorage.getItem('products')
let newproduct = JSON.parse(existingpts);
if (!newproduct){
    newproduct=[]
} 
newproduct.push(pts)

await AsyncStorage.setItem('products', JSON.stringify(newproduct)).then(()=>alert('success')).catch(()=>{alert('error')})
*/
AsyncStorage.setItem('email', a)
AsyncStorage.setItem('pass', JSON.stringify(pts))

axios.get('https://ruwassa.herokuapp.com/api/v1/users/signin/'+a)
    .then(res=>{
   if((res.data[0].phone===b && res.data[0].active==='active')){
       const userDetails={
           id: res.data[0].id,
       }
       AsyncStorage.setItem('userid', JSON.stringify(res.data[0].id))
      AsyncStorage.setItem('login','granted')
      Actions.home();
     // alert(res.data[0].id)
     
   }
   else{alert('You have been remove from this platform')}
    }).catch(error=>{alert('You have no access to this platform, check your details and try again')})
   //alert('wrong combination')


}

check=()=>{
    AsyncStorage.getItem('email').then((val)=>alert(val))
    AsyncStorage.getItem('pass').then((val)=>alert(val))
Actions.async();
}
render(){
    return(
        <View style={styles.container}>
            <TextInput style={styles.input}
            underlineColorAndroid ="transparent"
            placeholder="Email"
                        onChangeText={this.handleChangeEmail}
            />

            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Phone no"
            onChangeText={this.handleChangePass}
                        
            />  
            <TouchableOpacity style={styles.submitbutton}
            onPress={()=>this.login(this.state.email,this.state.password)}>
            <Text style={styles.text}> Signin</Text>

            </TouchableOpacity>
            
        </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 23
    },
    input:{
        margin:15,
        height:40,
        borderColor: 'grey',
        borderWidth:1
    },
    submitbutton:{
        backgroundColor:'blue',
        padding:10,
        margin:15,
        height:42,
        alignItems:'center',
        borderRadius:7
    },
    text:{
        color:'white',
        fontSize:25,
        
    }

})