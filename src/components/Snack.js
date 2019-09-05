import React, { Component } from 'react';
import { TouchableOpacity,View ,Text,ScrollView,Image} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

class Snack extends Component {
    state = {  }
    render() { 
        return ( <View style={{flex:1}}>
                    <Text>Snack</Text>
                 </View> );
    }
}
 
export default Snack;