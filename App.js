import  React, { Component } from "react";
import {Provider} from 'react-redux'
import {createAppContainer,createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import store from './src/_redux/store'
import Welcome from './src/screens/Welcome'
import OrderItem from './src/screens/OrderItem';
import Main from './src/screens/Main'
import Modals from './src/components/Modals'

const RootNavigation = createAppContainer(
  createSwitchNavigator({
  Welcome: {
    screen : Welcome,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
    },
  },
    OrderItem : {
      screen: OrderItem
    },
    Main : {
      screen: Main,
      navigationOptions: {
        title: 'Pembayaran',
        header: null //this will hide the header
      },
    },
    Modals : {
      screen: Modals,
      navigationOptions: {
    },
    },
  })
)

console.disableYellowBox = true;
class App extends Component {
  
  render() { 
    return ( <Provider store={store}>  
                <RootNavigation />
        </Provider> );
  }
}

export default App