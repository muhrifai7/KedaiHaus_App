import React, { Component } from 'react';
import { View, Alert, StyleSheet,TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, H3, Tabs, Tab, Text, ScrollableTab } from "native-base";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/AntDesign';

import Allmenu from '../components/AllMenu'
import FoodScreen from '../components/FoodScreen'
import DrinkScreen from '../components/DrinkScreen'



class Main extends Component {
     state = {
        total : 0,
        tableNumber: 0,
        buttondisabled : true,
        subTotal : 0,
        transactionId : undefined
      }
    async componentDidMount() {
      const tableNum = await AsyncStorage.getItem('@tableNumber');
        this.setState({
            tableNumber : tableNum
        });
        this._count();
    }
    totalAdd = ()=> {
        this.setState({
            buttondisabled : false
        })
    }
    _count = () => {
      totalku = 0
      this.props.orders.orders.map((item) => {
          let data = item.price * item.qty
          totalku = data + totalku
      })
      this.setState({
          subTotal: totalku
      })
    }
    
    handleOrder = async()=> {
       let user = this.props.transactions.dataBefore.transaction
       let parse = JSON.stringify(user)
       await this.props.navigation.navigate('OrderItem')
            await AsyncStorage.setItem('@TRANSACTION_ID', parse);
          // }catch (error) {
          //   console.log(error)
          // }
      await this.props.navigation.navigate('OrderItem')
    }
     
    render() { 
        return ( 
        <Container>
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
                            <Allmenu />
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

                   {this.props.orders.orders.length == 0 ? null : 
                    
                  <TouchableOpacity onPress={this.handleOrder}>
                   <View style={styles.cart}>
                        
                        <View style={{flex:3}}>
                            <Text style={{color:'salmon'}}>Total Item : {this.props.orders.orders.length}</Text>
                            <Text style={{color:'white'}}>Please tap for see detail</Text>
                        </View>
                         
                        <View style={{marginLeft:150,flex:1}}>
                         <Icon type="shoppingcart"  size={50} color="#900"/>
                        </View>
                   </View>
                  </TouchableOpacity>}
                    


                </Container> 
          );
    }
}
 const mapStateToProps = state => {
    return {
      orders: state.orders,
      transactions : state.transactions
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
    cart : {marginBottom:0,flexDirection:'row',padding:7,backgroundColor:'#3498db',alignContent:'space-around'}
})