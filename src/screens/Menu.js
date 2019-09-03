import React, { Component } from 'react';
import { View,Text,Button,StyleSheet,TextInput,Alert,Modal,ScrollView,ActivityIndicator,FlatList,TouchableOpacity,TouchableHighlight } from 'react-native';
import { Image } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';

import { getMenu,getMenuPending,getBreakFast} from '../_actions/menu'
import { addOrder } from '../_actions/order'

import Categorie from '../components/Categorie'
class Menu extends Component {
    constructor() {
        super();
        this.state = {
            categorie : [],
            menus : [],
            item : [],
            is_done : true,
            modalVisible: false,
            time : ''
        };
       
    }
    //get all menu
    getMenus = async() => {
      await axios.get("http://192.168.1.46:5000/api/v1/menus")
      .then((res)=> {
        const menu = res.data;
        this.props.dispatch(getMenu(menu))
        console.log(menu);
      })
      .catch(error => {
        console.log(error);
      });
    }

    // get breakfast
    getBreakf = async()=> {
      await axios.get("http://192.168.1.46:5000/api/v1/menu/5")
      .then((res)=> {
        const breakfast = res.data
        this.props.dispatch(getBreakFast(breakfast))
        console.log(breakfast);
      })
      .catch(error => {
        console.log(error);
      });
    }


    componentDidMount(){
      this.props.dispatch(getMenuPending());
      // this.props.dispatch(getBreakFast());
      this.getMenus()
      this.getBreakf()
      
    }
    clearItem = ()=> {
      this.setState({
        item : []
      })
    }

    handleItem = (val)=> {
      // let order = val,
      // this.props.dispatch(addOrder(val))
      // alert(val)
        this.setState({
           item : [...this.state.item,...val],
           is_done : false
         })
       }

    handleLengthItem = ()=> {
      this.state.item.length + 1
    }
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
   
    render() { 
        return ( 
                
            <View style={{backgroundColor:'#3498db',padding:20,flex:1}}> 
            {/* container */}
              <View style={{flex:1,backgroundColor:'#ecf0f1',paddingHorizontal:20,paddingTop:15,paddingBottom:10,borderRadius:8}}>
                  <View style={{flexDirection:'row',alignContent:'space-between',backgroundColor:'#2980b9',borderRadius:10,padding:4}}>
                      <View style={{flex:1}}><Text style={{fontSize:20,color:'white'}}> NO : {this.props.navigation.state.params.name}</Text></View>
                      <View style={{flex:2,paddingLeft:15}}><Text style={{fontSize:20,color:'white'}}>Kedai Resto</Text></View>
                      <View style={{flex:2,paddingLeft:15}}><Text style={{fontSize:20,color:'white'}}>"the.time"</Text></View>
                      
                  </View>
                  <Categorie />

                   <ScrollView horizontal={true}
                  showsVerticalScrollIndicator={false}
                  >  
                      <View style={{alignSelf:'center'}}>
                      {this.props.menus.isLoading === false ? null : <Text style={{fontSize:20,color:'green'}}>Please Wait...</Text>}
                      <ScrollView>
                        {this.props.menus.data.map((value,i) => {
                          return <TouchableOpacity  onPress={()=> {this.handleItem(value.menus)}}>  
                                    <View keys={value.id}
                                          style={{padding:10,flexDirection:'row'}}>
                                            <Image
                                              style={{width: 70, height: 80,resizeMode:'cover',borderRadius:10}}
                                              source={{uri: value.img}}
                                            />
                                            <View style={{paddingHorizontal:14}}>
                                              <Text 
                                              style={{fontSize:16,fontWeight:'bold'}}>{value.menus}
                                              </Text>
                                              <Text>Ini adalah Menu yang kami </Text>
                                              <Text 
                                              style={{fontSize:14,color:'#e67e22'}}>Rp {value.price}
                                              </Text>
                                              <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'center',borderRadius:7,paddingRight:0}}>
                                                <Text style={{color:'white'}}>Tambah</Text>
                                              </View>
                                          </View>
                                    </View>
                                  </TouchableOpacity>
                            })}
                            </ScrollView>
                      </View> 
                  </ScrollView>

                   {/* <View style={{height:400}}> */}
                     <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,padding:6}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>Pesanan :</Text>
                            <Text>{this.state.item}</Text>
                        </View>
                      
                        <View style={{flex:1,marginTop:20}}>
                          <TouchableOpacity disabled={this.state.is_done}
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                          }}
                          >
                          <View style={{backgroundColor:'green',borderRadius:7,marginLeft:20,alignSelf:'center'}}>
                            <Text style={{padding:5,color:'white'}}>Konfirmasi</Text>
                          </View>
                          </TouchableOpacity>
                        </View>

                        <View style={{flex:1,marginTop:20}}>
                          <TouchableOpacity disabled={this.state.is_done}
                          onPress={()=> {this.clearItem()}}
                          >
                          <View style={{backgroundColor:'salmon',borderRadius:7,marginLeft:5,alignSelf:'center'}}
                         
                          >
                            <Text style={{padding:5,color:'white'}}>Hapus</Text>
                          </View>
                          </TouchableOpacity>
                        </View>
                  
                      </View>
               
               <View style={{marginTop: 22,backgroundColor:'black'}}>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Order Cancelled');
                  }}>
                  <View style={{marginTop: 22}}>
                  
                    <View style={{backgroundColor:'white',marginTop:30}}>
                      <View style={{alignSelf:'center'}}>
                      <Text style={{fontSize:25,fontWeight:'bold'}}>Proses Pembayaran</Text>
                        <Text style={{color:'gray'}}>Semua Transaksi Anda Kami Pastikan Aman</Text>
                      </View>

                        <View style={{flexDirection:'row',marginTop:20,padding:10,marginLeft:24}}>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Status</Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Nama Pesanan :  </Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Harga</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:20,padding:10,marginLeft:24}}>
                          <Text style={{color:'gray'}}>Waiting ...</Text>
                          <Text style={{textDecorationLine: 'underline'}}>Nasi Goreng kambing :  </Text>
                          <Text style={{textDecorationLine: 'underline',color:'salmon'}}>Rp 20.000</Text>
                        </View>

                        <View style={{flexDirection:'row',marginVertical:10,padding:10,marginLeft:24}}>
                          <Text style={{color:'gray'}}>Waiting ...</Text> 
                          <Text style={{textDecorationLine: 'underline'}}>Nasi Goreng Ayam :  </Text>
                          <Text style={{textDecorationLine: 'underline',color:'salmon'}}>Rp 20.000</Text>
                        </View>

                        <View style={{flexDirection:'row',marginVertical:10,padding:10,marginLeft:24}}>
                          <Text style={{color:'gray'}}>Waiting ...</Text> 
                          <Text style={{textDecorationLine: 'underline'}}>Nasi Gulai :  </Text>
                          <Text style={{textDecorationLine: 'underline',color:'salmon'}}>Rp 50.000</Text>
                        </View>

                        <View style={{flexDirection:'row',marginVertical:10,padding:10,marginLeft:24}}>
                          <Text style={{color:'gray'}}>Waiting ...</Text>
                          <Text style={{textDecorationLine: 'underline'}}>Iga Bakar :  </Text>
                          <Text style={{textDecorationLine: 'underline',color:'salmon'}}>Rp 40.000</Text>
                        </View>

                        <View style={{marginVertical:10,padding:10,marginLeft:24}}>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Sub Total : 120.000 </Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Tax : 10 % </Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Service Charge : 5 %  </Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Diskon : 0 %</Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Total : 140.000 </Text>
                         
                        </View>

                      <View style={{flexDirection:'row-reverse',padding:10,margin:10}}>
                        <TouchableOpacity
                          onPress={() => {
                           alert("!this.state.modalVisible");
                          }}>
                          <View style={{marginTop:10,backgroundColor:'#2980b9',padding:10,borderRadius:6,alignSelf:'center'}}>
                              <Text style={{color:'white'}}>Bayar</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={{marginTop:10,backgroundColor:'salmon',padding:10,borderRadius:6,alignSelf:'center'}}>
                            <Text style={{color:'white'}}>Batalkan</Text>
                        </View>
                      </TouchableHighlight>

                      </View>

                      

              

                    </View>
                  </View>
                </Modal>
                </View>
              </View>  
              
            </View> );
            
            
    }
}

const mapStateToProps = (state) => {
  return {
    menus: state.menus,
    categories: state.categories,
    orders : state.orders
  }
}

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
    textAreaContainer: {
      margin:20,
      borderColor: "gray",
      borderWidth: 1,
      padding: 5,
      flex:1
    },
    textArea: {
      height: 100,
      justifyContent: "flex-start"
    },
    makanan : {
        flexDirection: "row",
        height:400
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 5
      },
      container: {
        padding: 22
      },
      kotaText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#000"
      },
      image: {
        width: 100,
        height: 150,
        borderRadius: 5
      },
      foodItem: {
        marginTop: 20,
        marginRight: 10
      },
      namaKota: {
        color: "#2c3e50",
        textAlign: "center",
        position: "absolute",
        top: 225,
        left: 10,
        color: "#fff"
      }
  })