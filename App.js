import React from 'react';
import { View, AppRegistry } from 'react-native';
import Routes from './src/components/Route'
import Signin from './src/components/signin'
import Hooks from './src/components/hooks'
import ImagePickerExample from './src/components/ImagePicker'
import FunPost from './src/components/picker'
import App1 from './src/components/picker2'
import App3 from './src/components/picker3'



export default class App extends React.Component {
  state = {
    myState:'fkkf'
  }

render(){
  return (
  
    <Routes/>
  
  );
}
}

AppRegistry.registerComponent('App', ()=>App)