import React, { Component } from "react";
import { Dimensions, View, TextInput, Image, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import styles from "./styles";
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors"

import Icon1 from 'react-native-vector-icons/Ionicons';


class CachedQuestionsScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,

    searchText : "",
  }

  componentDidMount(){
    this.loadFonts()
  }

  loadFonts = async () =>{
    await Font.loadAsync({
      'Poppins-Regular' : {
        uri: require('../../../assets/fonts/Poppins-Regular.ttf')
      },
      'Poppins-Medium': {
        uri: require('../../../assets/fonts/Poppins-Medium.ttf')
      },
      'Poppins-SemiBold': {
        uri: require('../../../assets/fonts/Poppins-SemiBold.ttf')
      },
      'OpenSans-Bold': {
        uri: require('../../../assets/fonts/OpenSans-Bold.ttf')
      }
    });
  }

  render() {
    return (
        <SafeAreaView style={{height:(this.state.height)}}>
            <Text>Cached Questions Screen</Text>
        </SafeAreaView>
    );
  }
}

export default CachedQuestionsScreen;