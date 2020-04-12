import React from 'react';
import { View, Text, Switch, StyleSheet} from 'react-native';

export default class Geolo extends React.Component {
    state ={
        initialPosition:'unknown',
        lastPostion:'unknown'
    }

watchID:?number = null;
loader=()=>{
    navigator.geolocation.getCurrentPosition(
        (position)=>{
            const initialPosition = JSON.stringify(position);
            this.setState({initialPosition:position.coords});
            this.props.onGps(this.state.initialPosition.latitude+','+this.state.initialPosition.longitude)

        },
        (error)=>alert(error.message),
        {enableHighAccuracy:true, timeout: 20000, maximumAge:1000}
    );
}
    componentDidMount=()=>{
   //  this.interval= setInterval(()=>this.loader(),60000)
   navigator.geolocation.getCurrentPosition(
    (position)=>{
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition:position.coords});
        this.props.onGps(this.state.initialPosition.latitude+','+this.state.initialPosition.longitude)

    },
    (error)=>alert(error.message),
    {enableHighAccuracy:true, timeout: 20000, maximumAge:1000}
);
           
    }
    componentWillMount=()=>{
        clearInterval(this.interval)
    }

    componentWillUnmount=()=>{
        navigator.geolocation.clearWatch(this.watchID)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Current Position</Text>
                <Text>{this.state.initialPosition.latitude+','+this.state.initialPosition.longitude}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        margin:5
    }
})