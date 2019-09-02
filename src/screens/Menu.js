import React, { Component } from 'react';
import { View,Text,Button,StyleSheet,TextInput,Alert,Modal,ScrollView,ActivityIndicator,FlatList,TouchableOpacity,TouchableHighlight } from 'react-native';
import { Image } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';

import { getMenu} from '../_actions/menu'
import Categorie from '../components/Categorie'

class Menu extends Component {
    constructor() {
        super();
        // this.getMenus()
        // this.getCategories()
        this.state = {
            categorie : [],
            menus : [],
            item : [],
            is_done : true,
            modalVisible: false,
            image : [
              {
                id : 1,
                name : 'http://kohsamui-hotel.com/wp-content/uploads/2018/11/fast-food-apps-with-free-food-fast-food-vector-image-fast-food-apps-that-give-you-free-food-uk.jpg',
                val :'Burger'
              },
              {
                id : 2,
                name : 'https://encrypted-tbn0.gstatic.com/names?q=tbn:ANd9GcRq90tKVPcRgjEI747mlMJSjjhDHREMtpYOtfnlMQkAh_1-L2sK',
                val :'Sphagetie'
              },
              {
                id : 3,
                name : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0T1fC_va4XAk0ypakZkI-a_x5wcbeFFgR5p03_LfT-ibUIj_D',
                val :'French fries'
              },
              {
                id : 4,
                name : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mYgkPhx44Y_xxrt-sUY0fnRcB8lfactrDhpDoRlgWl61RkVAhQ',
                val :'orange'
              }
          ]
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
    componentDidMount(){
      this.getMenus()
    }

    handleItem = (val)=> {
      alert(val)
        // this.setState({
        //    item : [...this.state.item,...val],
        //    is_done : false
        //  })
       }
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
     
    render() { 
        return ( 
                
            <View style={{backgroundColor:'#3498db',padding:20,flex:1}}> 
            {/* container */}
              <View style={{flex:1,backgroundColor:'#ecf0f1',paddingHorizontal:20,paddingVertical:15}}>
                  <View style={{flexDirection:'row',alignContent:'space-between',backgroundColor:'#2980b9',borderRadius:10}}>
                      <View style={{flex:1}}><Text style={{fontSize:20,color:'white'}}> NO : {this.props.navigation.state.params.name}</Text></View>
                      <View style={{flex:2,paddingLeft:15}}><Text style={{fontSize:20,color:'white'}}>Kedai Resto</Text></View>
                      <View style={{flex:1}}><Text style={{fontSize:20,color:'white'}}>Time</Text></View>
                  </View>
                  <Categorie />

                   <ScrollView horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  >
                  {/* {this.state.image.map((value,i) => {
                    return (
                      <TouchableOpacity>
                      <View style={{padding:10,margin:10}}>
                      <Image  onPress={()=> {this.handleItem(value.val)}}
                        style={{width: 100, height: 100,resizeMode:'cover',borderRadius:50}}
                        source={{uri: value.name}}
                      />
                      <View style={{alignSelf:'center'}}>
                        {this.props.menus.data.map((value,i) => {
                          return <TouchableOpacity  onPress={()=> {this.handleItem(value.menus)}}>  
                                    <View keys={value.id}
                                          style={{padding:10}}>
                                          <Text 
                                          style={{fontSize:20}}>{value.menus}
                                          </Text>
                                    </View>
                                  </TouchableOpacity>
                            })}
                      </View>
                     
                      </View>
                      </TouchableOpacity>
                    )
                  })}  */}
                  </ScrollView>


                  {/* <FlatList
              horizontal={true}
              data={this.props.menus.data} //take data from state,because state is reactiv variabel in react
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=> alert('ok')}
                style={{}}>
                  <Image source={{ uri: item.img }} />
                  <Text>{item.nama}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            /> */}
             
                    
                <View style ={{flexDirection:'row'}}>
                  {this.props.menus.data.map((value,i) => {
                  return <TouchableOpacity  onPress={()=> {this.handleItem(value.menus)}}>  
                            <View keys={value.id}
                                  style={{padding:10}}>
                                  <Text 
                                  style={{fontSize:20}}>{value.menus}
                                  </Text>
                            </View>
                          </TouchableOpacity>
                     })}
                     </View>

                   <View style={{height:400}}>
                     <View style={{borderWidth:1,borderColor:'black',padding:20,margin:10}}>
                        <View>
                            <Text>Your Order :</Text>
                            <Text>{this.state.item}</Text>
                        </View>
                      
                  
                      </View>
                  
                      <View style={{flex:1,marginTop:20}}>
                        <TouchableOpacity disabled={this.state.is_done}
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                        >
                        <View style={{width:100,backgroundColor:'green'}}>
                          <Text style={{padding:10,color:'white'}}>Konfirmasi</Text>
                        </View>
                        </TouchableOpacity>
                       </View>
                       </View>

                
                </View>
               {/* <View style={{height:400}}>
                  <View style={{borderWidth:1,borderColor:'black',padding:20,margin:10}}>
                        <View>
                            <Text>Your Order :</Text>
                            <Text>{this.state.item}</Text>
                        </View>
                      
                  
                  </View>
                  
                      <View style={{flex:1,marginTop:20}}>
                        <TouchableOpacity disabled={this.state.is_done}
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                        >
                        <View style={{width:100,backgroundColor:'green'}}>
                          <Text style={{padding:10,color:'white'}}>Konfirmasi</Text>
                        </View>
                        </TouchableOpacity>
                      </View>
              </View> */}
          
               
               <View style={{marginTop: 22}}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                  <View style={{marginTop: 22}}>
                    <View style={{backgroundColor:'white',margin:20,borderColor:'black',height:400,width:400,borderWidth:1}}>
                    <View style={{flexDirection:'row',flex:1}}>
                    <Text>Harga 1</Text>
                    </View>
                    <View style={{marginBottom:0}}>
                        <Button title="Call Bill" onPress={()=> {alert('ok')}}/>
                    </View>

                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={{marginTop:30,backgroundColor:'gray',alignContent:'center',alignSelf:'center'}}>
                            <Text style={{color:'white'}}>Batalkan</Text>
                        </View>
                        
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
              </View>  
              
            </View> );
            
            
    }
}

const mapStateToProps = (state) => {
  return {
    menus: state.menus,
    categories: state.categories
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