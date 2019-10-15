import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Tab2';
    let tabBarIcon = () => (
      <Image
        source={require('../img/logo.png')}
        style={{ width: 26, height: 26, tintColor: '#e97600' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#e97600',
        alignItems: 'center',
        justifyContent: 'center'
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
            This is Promotion Screen</Text>
      </View>
    );
  }
}