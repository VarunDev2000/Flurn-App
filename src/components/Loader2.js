import React, { Component } from 'react';
import {Image, View, StyleSheet} from 'react-native';
import * as Mixins from '../styles/mixins';
import colors from '../styles/colors';


class Loader2 extends Component {

  render() {
    return (
        <View style={styles.outerLayout}>
            <Image style={styles.gifStyle} source={require('../../assets/images/loading2.gif')} />
        </View> 
    )
  }
};


const styles = StyleSheet.create({
  outerLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:50,
    backgroundColor:colors.detailedScreenBgColor
  },
  gifStyle: {
    width: Mixins.scale(70),
    height: Mixins.scale(70),
    marginBottom: Mixins.scale(50),
    resizeMode: "contain"
  },
})

export default Loader2;