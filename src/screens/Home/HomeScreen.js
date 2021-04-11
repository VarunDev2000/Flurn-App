import React, { Component } from "react";
import { Dimensions, View, TextInput, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "./styles";
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors"

import Icon1 from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";

class HomeScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,
    searchText : "",
  }
  render() {

    const textChange = (val) => {
      this.setState({
        searchText : val
      })
    }

    const search = () => {
      if(this.state.searchText != ""){
        this.props.navigation.navigate("SearchResultScreen",{searchText: this.state.searchText})
      }
    }

    return (
        <SafeAreaView style={{height:this.state.height}}>
          <KeyboardAwareScrollView enableOnAndroid={true} >
            <View style = {styles.container}>
              <View style={styles.imageOuterLayout}>
                <Image style={styles.imageStyle} source={require('./res/company_name.jpg')} />
              </View>
              <View style={styles.textFieldStyle}>
                <TextInput style = {{width:"93%"}}
                  underlineColorAndroid = "transparent"
                  placeholder = "Search"
                  placeholderTextColor = "#858585"
                  autoCapitalize = "none"
                  onChangeText = {val => textChange(val)}
                  onSubmitEditing = {() => search()} />
                <TouchableOpacity activeOpacity={0.5} onPress={() => search()} style={{paddingHorizontal:Mixins.scale(5),justifyContent: "center", alignItems:"center"}}>
                  <Icon1 name="search" size={Mixins.scale(17)} color="#858585" style={{paddingTop:Mixins.scale(4)}}/>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    );
  }
}

export default HomeScreen;