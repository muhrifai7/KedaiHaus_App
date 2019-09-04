import React, { Component } from 'react';
import { View,Text,Button,StyleSheet,TextInput,Alert,Modal,ScrollView,ActivityIndicator,FlatList,TouchableOpacity,TouchableHighlight } from 'react-native';
import { Image } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';

import { getMenu,getMenuPending} from '../_actions/menu'
import { addOrder } from '../_actions/order'
import Menulist from '../components/Menulist'

import Categorie from '../components/Categorie'
import Breakfast from '../components/BreakFast'
import Drink from '../components/Drink'
import Snack from '../components/Snack'
import ChineseFood from '../components/ChineseFood'




class Menu extends Component {
    constructor() {
        super();
        this.state = {
            categorie : [],
            menus : [],
            item : [],
            is_done : false,
            modalVisible: false,
            time : '',
            total : false,
            cate : 1
        };
       
    }
    //get all menu
    getMenus = async() => {
      await axios.get("http://192.168.1.46:5000/api/v1/menus")
      .then((res)=> {
        const menu = res.data;
        this.props.dispatch(getMenu(menu))
        // console.log(menu);
      })
      .catch(error => {
        console.log(error);
      });
    }

    // get breakfast
    // getBreakf = async()=> {
    //   await axios.get("http://192.168.1.46:5000/api/v1/menu/5")
    //   .then((res)=> {
    //     const breakfast = res.data
    //     this.props.dispatch(getBreakFast(breakfast))
    //     console.log(breakfast);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // }
    handleHome =()=> {
      this.props.navigation.navigate('Welcome')
    }

    componentDidMount(){
      this.props.dispatch(getMenuPending());
      
      this.getMenus()
     
      
    }
    clearItem = ()=> {
      this.setState({
        item : []
      })
    }

    handleItem = (val)=> {
      let count = 1
      this.setState({
           item : parseInt(this.state.item + count),
            // [...this.state.item,...val],
           is_done : false
         }
         ,showItem = ()=> {
           this.setState(
            {
              total : true
            }
           )
         }
         )
       }

    handleLengthItem = ()=> {
      this.state.item.length + 1
    }
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    handleCate = (i) =>{
     
        this.setState({
          cate: i + 1
        })
    }
    
   
    render() { 
      
      
        return ( 
                
            <View style={{backgroundColor:'#3498db',flex:1}}> 
            {/* container */}
              <View style={{flex:1,backgroundColor:'#ecf0f1',paddingHorizontal:10,paddingTop:15,paddingBottom:10,borderRadius:8}}>
                  <View style={{flexDirection:'row',alignContent:'space-between',backgroundColor:'#2980b9',borderRadius:10,padding:4}}>
                      <View style={{flex:1}}><Text style={{fontSize:20,color:'white'}}> No :{this.props.navigation.state.params.name}</Text></View>
                      <View style={{flex:2,paddingLeft:15}}><Text style={{fontSize:20,color:'white'}}>Kedai Resto</Text></View>
                      <View style={{flex:2,paddingLeft:15}}><Text style={{fontSize:20,color:'white'}}>01.30</Text></View>
                      
                  </View>
                 
                  <Categorie handleCategorie={this.handleCate}/>
                  {this.state.cate === 1 ? <Menulist handleCategorie={this.handleItem}/> :null}
                 {this.state.cate === 2 ? <Breakfast/> : null}
                 {this.state.cate === 3 ? <Drink/> : null}  
                 {this.state.cate === 4 ? <Snack/> : null}
                 {this.state.cate === 5 ? <ChineseFood/> : null}  

                  {this.state.total === false ? null :
                     <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>alert('moddal')}
                      >
                        <View style={{flex:1,padding:6}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>Item :</Text>
                            <Text>{this.state.item}</Text>
                        </View>
                      </TouchableOpacity>

                     
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

                        <View style={{flex:1,marginTop:20}}>
                          <TouchableOpacity disabled={this.state.is_done}
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                          }}
                          >
                          <View style={{backgroundColor:'green',borderRadius:7,alignSelf:'center',paddingHorizontal:10}}>
                            <Text style={{padding:5,color:'white'}}>Bill</Text>
                          </View>
                          </TouchableOpacity>
                        </View>
                  
                      </View>
                      }
               
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

                        <View style={{flexDirection:'row',marginTop:20,padding:6,marginLeft:24,justifyContent:'center'}}>

                          <Text style={{fontSize:15,fontWeight:'bold',flex:1}}>Nama Pesanan :  </Text>
                          <Text style={{fontSize:15,fontWeight:'bold',flex:1}}>Harga</Text>
                          <Text style={{fontSize:15,fontWeight:'bold',flex:1}}>Jumlah</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:20,padding:6,marginLeft:24,justifyContent:'center'}}>
                         
                          <Text style={{flex:1}}>Nasi Goreng kambing :  </Text>
                          <Text style={{textDecorationLine: 'underline',flex:1,color:'salmon'}}>Rp 20.000</Text>
                          <Text style={{flex:1}}>1</Text>
                        </View>

                        <View style={{flexDirection:'row',marginVertical:10,padding:10,marginLeft:24,justifyContent:'center'}}>
                          
                          <Text style={{flex:1}}>Nasi Goreng Ayam :  </Text>
                          <Text style={{textDecorationLine: 'underline',flex:1,color:'salmon'}}>Rp 20.000</Text>
                          <Text style={{flex:1}}>1</Text>
                        </View>

                        <View style={{flexDirection:'row',marginVertical:10,padding:10,marginLeft:24,justifyContent:'center'}}>
                         
                          <Text style={{flex:1}}>Nasi Gulai :  </Text>
                          <Text style={{textDecorationLine: 'underline',flex:1,color:'salmon'}}>Rp 50.000</Text>
                          <Text style={{flex:1}}>1</Text>
                        </View>

                        <View style={{flexDirection:'row',marginVertical:10,padding:10,marginLeft:24,justifyContent:'center'}}>
                         
                          <Text style={{flex:1}}>Iga Bakar :  </Text>
                          <Text style={{textDecorationLine: 'underline',flex:1,color:'salmon'}}>Rp 40.000</Text>
                          <Text style={{flex:1}}>1</Text>
                        </View>

                        <View style={{marginVertical:10,padding:10,alignSelf:'flex-end'}}>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Sub Total : 120.000 </Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Tax : 10 % </Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Service Charge : 5 %  </Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Diskon : 0 %</Text>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Total : 140.000 </Text>
                         
                        </View>

                      <View style={{flexDirection:'row-reverse',padding:10,margin:10}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                            this.props.navigation.navigate('Pembayaran')
                            
                          }}>
                          <View style={{marginTop:10,backgroundColor:'#2980b9',padding:10,borderRadius:6,alignSelf:'center',margin:10}}>
                              <Text style={{color:'white'}}>Bayar</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableHighlight
                        onPress={() => {
                          this.clearItem()
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
    // menus: state.menus,
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