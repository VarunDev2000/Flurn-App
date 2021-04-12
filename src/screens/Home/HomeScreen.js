import React, { Component } from "react";
import { Dimensions, View, TextInput, Image, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Font from 'expo-font';
import styles from "./styles";
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors"

import Icon1 from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";

class HomeScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,
    fontsLoaded : false,

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
    this.setState({ fontsLoaded: true });
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

    if (this.state.fontsLoaded) {
      return (
          <SafeAreaView style={{height:(this.state.height)}}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{flex:1}}>
              <View style = {styles.container}>
                <View>
                  <Text style={[styles.titleText, {fontFamily:"OpenSans-Bold"}]}>FLURN</Text>
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

                <TouchableOpacity activeOpacity={0.55} onPress={() => this.props.navigation.navigate("CachedQuestionsScreen")} style={styles.cachedQTextOuterLayout}>
                  <Icon1 name="bookmark" size={Mixins.scale(14)} color="black" style={{paddingBottom:Mixins.scale(2),paddingRight: Mixins.scale(3)}}/>
                  <Text style={[styles.cachedQText,{fontFamily: "Poppins-Medium"}]}>My Cached Questions</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
      );
    }
    else
    {
      return <View />
    }
  }
}

export default HomeScreen;