import React from 'react';
import {Image, AsyncStorage, View, Text} from 'react-native'
import { Actions } from 'react-native-router-flux';


export default class Welcome extends React.Component{

    loader=()=>{
        AsyncStorage.getItem('login').then((val)=>{
            if(val=='granted'){
                Actions.home();
            }else{
                Actions.signin()
            }
        })
    }
    componentDidMount=()=>{
     this.loader()
        //.interval=setInterval(()=>this.loader(),3000)

    }
    componentWillUnmount=()=>{
        clearInterval(this.interval)
    }
    render(){
        return(
            <View>
 <Image source={ require('./icon.png') }
       style={{width: 150, height: 150, marginTop:'50%', marginLeft:'30%'}} />
                   </View>
        )
    }
}