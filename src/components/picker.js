import * as React from 'react';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import { Alert, Keyboard, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
const initialValues = {
  title: '',
  image: '',
  uri:'',
  type:'',
  name:'',
}

export default class FunPost extends React.Component {

  onSubmit(values) {
    //List of form values
    console.log(values);
    Alert.alert(JSON.stringify(values));
    alert(this.state.type+''+this.state.name)
    Keyboard.dismiss();
    const data = new FormData();
 data.append('name', 'avatar');
 data.append('image', {
  uri : this.state.uri,
  type: this.state.type,
  name: this.state.fileName
 });
 const config = {
  method: 'POST',
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'multipart/form-data',
  },
  body: data,
 };
 fetch("http://localhost:5000/api/v1/activityform", config)
 .then((checkStatusAndGetJSONResponse)=>{       
   alert(checkStatusAndGetJSONResponse);
 }).catch((err)=>{alert(err)});

  }

  async _pickImage (handleChange) {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })
    console.log(result)
    if (!result.cancelled) {
        this.setState({
            uri:result.uri,
            type:result.type,
            name: 'imagee'
        })
      handleChange(result.uri)
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.content]}>
        <Formik 
          initialValues={initialValues} 
          onSubmit={this.onSubmit.bind(this)}>
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange('title')}
                value={values.title}
                label="Title"
                placeholder="e.g My Awesome Selfie"
              />
              <Button
                icon="add-a-photo" mode="contained" style={styles.button}
                onPress={() => {this._pickImage(handleChange('image'))}}
              >Pick an image from camera roll</Button>
              {values.image && values.image.length > 0 ?
                <Image source={{ uri: values.image }} style={{ width: 200, height: 200 }} /> : null}
              <Button onPress={handleSubmit} style={styles.button}>Submit</Button>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    paddingTop: 40,
    padding: 16,
  },
  button: {
    marginTop: 16,
  }
});
