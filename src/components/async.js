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
    AsyncStorage.getItem('email').then((val)=>this.setState({email:val}))
    AsyncStorage.getItem('pass').then((val)=>this.setState({password:JSON.parse(val)}))

}

render(){
    return(
        <View>
            <Text>{this.state.email+' '+this.state.password.date}</Text>
        </View>
    )
}
    
}