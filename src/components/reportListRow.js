import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


export default class ReportsListRow extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userId:'',
            reports:'',
            tasks2:'',
            title:'',
            community:''
        }
    }


goToDetails=(pid,uid)=>{
//Actions.taskDetails({pid,uid})
}
componentDidMount=()=>{
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+this.props.pid)
    .then(res=>{
    //    alert(this._isMounted)
   //     if(this._isMounted){
       this.setState({
        title: res.data[0].title,
        community: res.data[0].community
       }) 
       
    //}
    }).catch(error=>{console.log(error)})
  
}
    render(){
        return(
            <View>
                <TouchableOpacity onPress={()=>this.goToDetails(this.props.pid,this.props.userid)} style={styles.row}>
               <Text style={styles.title}>
                <Text  style={styles.txtname} > {this.state.title} </Text>
               <Text>{this.state.community}</Text>

               </Text>
                <Text style={styles.txtloc}><Text style={styles.txtl}>{this.props.summaryfrom}<Text style={styles.sep}>-</Text></Text>
                <Text style={styles.txtstat}>{this.props.summaryto}</Text>
                <Text style={styles.sep}>|</Text>
                <Text style={styles.txtstat}>{this.props.pstatus}</Text>
                <Text style={styles.sep}>|</Text>
                <Text style={{textAlign:'right',color:"#fba9aa", marginLeft:20}}> {this.props.type}</Text>

                </Text>
                </TouchableOpacity>
            
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
   title:{
       color:'#b1fff5'
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