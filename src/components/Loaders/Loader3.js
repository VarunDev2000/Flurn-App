import React, { Component } from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import * as Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


class Loader3 extends Component {

  render() {
    return (
        <View style={[styles.outerLayout,{marginBottom:this.props.marginBottom}]}>
            <Image style={styles.gifStyle} source={require('../../../assets/images/loading3.gif')} />
        </View> 
    )
  }
};


const styles = StyleSheet.create({
  outerLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.bgColor,
    marginBottom: Mixins.scale(10)
  },
  gifStyle: {
    width: Mixins.scale(70),
    height: Mixins.scale(70),
    resizeMode: "contain"
  },
})

export default Loader3;