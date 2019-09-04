import  React, { Component } from "react";
import { View, ScrollView, StyleSheet,Text} from "react-native";
import {Provider} from 'react-redux'
import { createStackNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import store from './src/_redux/store'
import Welcome from './src/screens/Welcome'
import Users from './src/screens/Users';
import Menu from './src/screens/Menu';
import Booking from './src/screens/Booking';
import Pembayaran from './src/screens/Pembayaran';
import Kasir from './src/screens/Kasir';
import DaftarMeja from './src/screens/Daftarmeja'

const RootNavigation = createAppContainer(
  createStackNavigator({
  Welcome: {
    screen : Welcome,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
  },
  },
    Menu : {
      screen: Menu,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
    },
    },
    Booking : {
      screen: Booking,
      navigationOptions: { headerTitle: 'Konfirmasi Pesanan', headerTitleStyle: {
        color: 'green',
        } 
      },
    },
    Pembayaran : {
      screen: Pembayaran,
      navigationOptions: {
        title: 'Pembayaran',
        header: null //this will hide the header
    },
    },
    DaftarMeja : {
      screen: DaftarMeja,
      navigationOptions: { headerTitle: 'Daftar Meja', headerTitleStyle: {
        color: 'green',
        } 
      },
    },
  })
)


class App extends Component {
  
  render() { 
    return ( <Provider store={store}>  
                <RootNavigation />
        </Provider> );
  }
}

export default App