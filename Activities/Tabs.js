import { createBottomTabNavigator } from 'react-navigation';
import InfoApp from './Activities/InfoApp';
import User from './Activities/User';

let routeConfigs = {
  'Tab1': {
    screen: InfoApp,
  },
  'Tab2': {
    screen: User,
  },
};

let tabNavigatorConfig = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: 'blue',
    labelStyle: {
      fontSize: 13,
    },
    style: {
      backgroundColor: 'lightgray',
      padding: -10
    },
  },
  order: ['Tab1', 'Tab2'],
};

export const TabNavigator = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);