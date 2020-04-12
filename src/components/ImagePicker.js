import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from  'axios';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    file:'',
    type:'',
    uri:''
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button name='image'
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

          <Button title='upload' onPress={this.handleupload}/>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ 
        image: result.uri,
         file:result,
          type:result.type,
          uri: result.uri.replace("file://", "")
        });
    }
  };

  handleupload=()=>{
  let   obj ={
         title:'default image',
         image: this.state.file.uri,
         rid:1,
         pid:1,
         activity:'jjj',
         outcome:'yghhj',
     }
     const data= new FormData();
     data.append('rid',1)
     data.append('pid',1)
     data.append('activity','activity')
     data.append('outcome','outcome')
     data.append('image',{
         uri: this.state.file,
         type: 'image/jpeg',
         name:'ttt'
     })
     const config = {
         headers:{
             'Accept':'application/json',
             'Content-Type':'multipart/form-data'
         },
         method:'POST',
         body:data
     }
     //'application/x-www-form-urlencoded'
 /*    fetch("http://192.168.43.252:5000/api/v1/activityform", config)
 .then((checkStatusAndGetJSONResponse)=>{       
   alert(checkStatusAndGetJSONResponse);
 }).catch((err)=>{alert(err)});
 */

  axios.post('http://192.168.43.252:5000/api/v1/activityform',config)
     .then(req=>{
         alert(req.data[0].imgurl)
     }).catch(error=>{alert('error jjj'+error)})
     //alert(this.state.file)
  }
}