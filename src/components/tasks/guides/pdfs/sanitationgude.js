import React from 'react';
import { StyleSheet, View } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { Constants } from 'expo';

export default class SanitationGuide extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PDFReader
          source={{ uri: "http://ruwassa.nklere.com.ng/pdfs/2critical.pdf" }}
        //source={{uri:require('./sp.pdf')}} 
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
})