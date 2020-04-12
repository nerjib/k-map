import React, { Component } from 'react';
import {
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios'

export default class App3 extends Component {
  state = {
    image: null,
    uploading: false,
    uploaded:'',
    imgurl:'',
    imguri:'k'
  };

  render() {
    let {
      image
    } = this.state;

    return (
      <View style={styles.container}>

        <Text
          style={styles.exampleText}>
          Example: Upload ImagePicker result
        </Text>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Text>Status: {this.state.uploaded}</Text>
         <Image source={{uri: this.state.imguri}}
       style={{width: 150, height: 150}} />
      </View>
    );
  }

  
  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
          uploaded:'loading...',
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
       // alert(uploadResult[0].imgurl)
       if(uploadResult[0].imgurl!=null){
        this.setState({
                    imguri:pickerResult.uri,
                       uploaded:'done',
                       //imgurl:uploadResult[0].imgurl,
          image: uploadResult.location
        });}else{
         
            this.setState({
                imguri:'kk',
                   uploaded:'Check your network',
                   //imgurl:uploadResult[0].imgurl,
      image: uploadResult.location
    })
        }
      }
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
}

async function uploadImageAsync(uri) {
  let apiUrl = 'http://192.168.43.252:5000/api/v1/activityform';

  
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
//alert(fileType)
  let formData = new FormData();
  formData.append('rid',1);
  formData.append('pid',1);
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
  //.then((resdata)=>{
    //this.setState({uploaded: 'done'})
    //alert((resdata[0].id))
  //});
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});