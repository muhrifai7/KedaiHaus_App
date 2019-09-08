import React, { Component } from 'react';
import { View, FlatList, Alert, ActivityIndicator, StyleSheet,TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, H3, Spinner, Tabs, Tab, Button, Text, ScrollableTab } from "native-base";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import Allmenu from '../components/AllMenu'
import FoodScreen from '../components/FoodScreen'
import DrinkScreen from '../components/DrinkScreen'

import { addNewOrders,updateOrderQty } from '../_actions/orders';


class Main extends Component {
    constructor() {
        super();
        
        this.state = {
            total : 0,
            tableNumber: 0,
            buttondisabled : true
        }
      }
    
    async componentDidMount() {
        const tableNum = await AsyncStorage.getItem('tableNumber');
        this.setState({
            tableNumber : tableNum
        });
    }
    totalAdd = (data)=> {
        this.setState({
            total : this.state.total + 1,
            buttondisabled : false
        })
    }
    totalMinus = ()=> {
            this.setstate({
                total : this.state.total - 1
            })
    }
    handleConfirmOrder = () => {
        Alert.alert(
          "Confirm Order",
          "Are you sure to order this?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => this.handleOrder() }
          ],
          { cancelable: false }
        );
      };

    handleOrder = ()=> {
        this.props.navigation.navigate('OrderItem')
    }

     
    
    render() { 
        return ( <Container>
                    <View style={styles.spaceBetween}>
                    <View style={{flex:4}}>
                    <Header style={{backgroundColor:'#3498db'}}>
                        <Left>
                        <H3 style={styles.cicleText}>{this.state.tableNumber}</H3>
                        </Left>
                        <Right>
                        <H3 style={{color: '#fff'}}>
                           Menu List
                        </H3>
                        </Right>
                    </Header>
                       
                        <Tabs renderTabBar={() => (<ScrollableTab />)}>
                        <Tab heading="AllMenu">
                            <Allmenu totalAdd={this.totalAdd} totalMinus={this.totalMinus}/>
                        </Tab>
                        <Tab heading="Food">
                            <FoodScreen />
                        </Tab>
                        <Tab heading="Drink">
                            <DrinkScreen />
                        </Tab>
                       
                        </Tabs>
                    </View>
                    </View>

                   
                    <View style={{marginBottom:0,flexDirection:'row',padding:10,margin:3,justifyContent:'flex-end'}}>
                     <TouchableOpacity disabled={this.state.buttondisabled}
                     onPress={()=> this.props.navigation.navigate('OrderItem')}>
                        <View style={{backgroundColor:'salmon',borderRadius:8,alignSelf:'center',paddingVertical:10,paddingHorizontal:10,margin:4}}>
                                <Text>Lihat Detail</Text>
                        </View>  
                        </TouchableOpacity>


                        <View style={{backgroundColor:'salmon',borderRadius:8,alignSelf:'center',paddingVertical:10,paddingHorizontal:10,margin:4}}>
                                <Text>Total Item: {this.state.total}</Text>
                        </View> 

                        <TouchableOpacity onPress={this.handleConfirmOrder}
>
                        <View
                            style={{backgroundColor:'#3498db',borderRadius:8,alignSelf:'center',paddingVertical:10,paddingHorizontal:10,margin:4}}>
                                <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Konfirm</Text>
                        </View>  
                        </TouchableOpacity>
                    </View>
                    

                    {/* modal */}
                         
                    {/* modal */}

                </Container> 
          );
    }
}
 const mapStateToProps = state => {
    return {
      orders: state.orders
    };
  };
  
  export default connect(mapStateToProps)(Main);

const styles = StyleSheet.create({
    spaceBetween: {
      flex:1, justifyContent: "space-between"
    },
    cicleText: {
        color: '#fff', 
        borderColor: '#fff', 
        borderWidth: 1, 
        borderRadius: 100, 
        padding: 5, 
        paddingTop: 7, 
        paddingBottom: 3,
        width: 36,
        textAlign: 'center'
      },
})