import React, { Component } from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import { convertToRupiah } from '../env/convert'
import { addNewOrders } from '../_actions/orders';

class ListMenu extends Component {
    state = { 
        isSelected : false
     }

    handleAddOrder = async (data) => {
        let order = this.props.allmenus.data
        const index = order.findIndex(item => item.id === data.id)
        // alert(JSON.stringify(index))
        if(index >= 0 ) {
                this.setState({
                    isSelected : !false
                })
             data = {
                ...data,
                qty: 1,
                status: 1,
                sumPrice: data.price
            }
            await this.props.dispatch(addNewOrders(data))
        }
    }

    render() { 
    const menuall = this.props.menuall
    return (    
        <View style={styles.container}>
      
       <TouchableOpacity>
                    <Image
                    style={styles.img}
                    source={{uri: menuall.img}}
                    />
                </TouchableOpacity>

        <View style={{paddingHorizontal:14}}>
            <Text style={styles.menuName}>{menuall.menus}
            </Text>
            <Text>Ini adalah Menu yang kami sediakan</Text>
            <Text
            style={styles.price}>{convertToRupiah(menuall.price)}
            </Text>
           
           
            <View style={styles.button}>
           {!this.state.isSelected ?  <TouchableOpacity onPress={()=> this.handleAddOrder(menuall)}>
              <View style={styles.addCart}>
                <Text style={styles.textCart}>Add to cart</Text>
              </View>
            </TouchableOpacity> : 
            <TouchableOpacity disabled={true}
            onPress={()=> this.handleAddOrder(menuall)}>
              <View style={styles.button2}>
                <Text style={styles.textCart}>Add to cart</Text>
              </View>
            </TouchableOpacity>
            }
            </View>
        </View>
    </View>
         );
    }
}
const mapStateToProps = state => {
    return {
      allmenus: state.allmenus
    };
  };
  
export default connect(mapStateToProps)(ListMenu);

const styles = StyleSheet.create({
    container : {
      padding:10,flexDirection:'row',flex:1
    },
    img : {width: 100, height: 96,resizeMode:'cover',borderRadius:8,flex:1
    },
    menuName : {
        fontSize:16,fontWeight:'bold'
    },
    price : {fontSize:14,color:'#e67e22'},
    button : {flexDirection:'row',alignSelf:'flex-end'},
    addCart : {backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3},
    textCart : {color:'white',fontWeight:'bold'},
    button2 : {backgroundColor:'#d0d0d0',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}
  })