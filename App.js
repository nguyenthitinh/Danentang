import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    TouchableHighlight, Image
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import Login from './Activities/Login';
import Main from './Activities/Main';
import Register from './Activities/Register';
import Info from './Activities/Info';
import AddPhong from './Activities/AddPhong';
import AddThongtin from './Activities/AddThongtin';
import EditPhong from './Activities/EditPhong';
import EditThongtin from './Activities/EditThongtin';
import InfoApp from './Activities/InfoApp';
import User from './Activities/User';

// let routeConfigs = {
//   'Tab1': {
//     screen: InfoApp,
//   },
//   'Tab2': {
//     screen: User,
//   },
// };

// let tabNavigatorConfig = {
//   tabBarPosition: 'bottom',
//   animationEnabled: true,
//   swipeEnabled: true,
//   tabBarOptions: {
//     showIcon: true,
//     activeTintColor: 'blue',
//     labelStyle: {
//       fontSize: 13,
//     },
//     style: {
//       backgroundColor: 'lightgray',
//       padding: -10
//     },
//   },
//   order: ['Tab1', 'Tab2'],
// };
// export const TabNavigator = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const AppNavigator = createStackNavigator({
  Login_MH: {
    screen: Login
  },
  Main_MH: {
    screen: Main,
    navigationOptions: {
      title: "Quản Lý Phòng",
      headerLeft: null,
      headerTintColor: 'red',
      
    },
    

  },
  Register_MH: {
    screen: Register,
  },
  Info_MH: {
    screen: Info,
    // navigationOptions:{
    //   title: 'Danh Sách',
    //   headerLeft: (<Button title="Left" onPress={() => this.props.navigation.navigate("Login_MH")} />)
    //   // headerLeft : (
      //   <TouchableHighlight
      //     onPress={() => navigation.navigate('Main', {user: 'a'})}
      //     underlayColor={'#444444'}
      //     >
      //       <Image style={{width: 30, height: 30}} source={require('./img/logo.png')} />
      //   </TouchableHighlight>
      // )
    //}
  },
  AddPhong_MH: {
    screen: AddPhong,
  },
  AddThongtin_MH: {
    screen: AddThongtin,
  },
  
  EditPhong_MH: {
    screen: EditPhong,
    navigationOptions:{
      title: "Sửa Thông Tin Phòng"    
    }
  },
  
  EditThongtin_MH: {
    screen: EditThongtin,
    navigationOptions:{
      title: "Sửa Thông Tin Hóa Đơn"    
    }
  },

});

export default createAppContainer(AppNavigator);
