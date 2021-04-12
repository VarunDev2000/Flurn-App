import React, { Component } from 'react';
import {Image, View, StyleSheet} from 'react-native';
import * as Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


class Loader1 extends Component {

  render() {
    return (
        <View style={styles.outerLayout}>
            <Image style={styles.gifStyle} source={require('../../../assets/images/loading1.gif')} />
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
    backgroundColor:colors.bgColor
  },
  gifStyle: {
    width: Mixins.scale(95),
    height: Mixins.scale(95),
    marginBottom: Mixins.scale(100),
    resizeMode: "contain"
  },
})

export default Loader1;