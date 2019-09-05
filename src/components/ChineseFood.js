import React, { Component } from 'react';
import { TouchableOpacity,View ,Text,ScrollView,Image} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

class ChineseFood extends Component {
    state = {  }
    render() { 
        return ( <View style={{flex:1}}>
                    <Text>ChineseFood</Text>
                 </View> );
    }
}
 
export default ChineseFood;