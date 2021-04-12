import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Dimensions, View, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import HTMLView from 'react-native-htmlview';
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "./styles";
import * as Font from 'expo-font'

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import { getSearchResults } from '../../actions/actions';

class SearchResultScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,

    search_type: "seacrh",
    searchText : "",
    data : {},
    page : 1,
  }

  componentDidMount(){
    //console.log(this.props.route.params.searchText)
    this.setState({
      searchText: this.props.route.params.searchText
    },
      function(){
        this.getData(this.state.page)
      }
    )
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
    });
  }

  getData = async (page) => {
    this.loadFonts();
      try {
        this.setState({
          search_type: "search"
        })
        let res = await getSearchResults("search", this.state.searchText, page)
        //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
        //console.log(res.data.items.length)

        if(page == 1 && res.data.items.length <= 0){
          this.setState({
            search_type: "similar"
          })
          let res1 = await getSearchResults("similar", this.state.searchText, page)
          this.setState({
            data : res1.data
          })
          //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
          //console.log(res1.data)
        }
        else{
          this.setState({
            data : res.data
          })
        }

      } catch (error) {
        console.log(error.response);
      }
  }

  startSearch = () => {
    if(this.state.searchText != "") {
      this.setState({
        data : {},
        page : 1
      },
        function(){
          this.getData(this.state.page)
        }
      ) 
    }
  }

  render() {

    const textChange = (val) => {
      this.setState({
        searchText : val
      })
    }

    return (
        <SafeAreaView style={{height:this.state.height, backgroundColor:colors.bgColor}}>
          <View style={styles.topLayout}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()} style={styles.backButtonOuterLayout}>
              <Icon1 name="ios-chevron-back" size={Mixins.scale(25)} color={colors.primary}/>
            </TouchableOpacity>
            <View style={styles.textFieldStyle}>
              <TextInput 
                style = {{width:"93%"}}
                value = {this.state.searchText}
                underlineColorAndroid = "transparent"
                placeholder = "Search"
                placeholderTextColor = "#858585"
                autoCapitalize = "none"
                onChangeText = {val => textChange(val)}
                onSubmitEditing = {() => this.startSearch()}/>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.startSearch()} style={{paddingHorizontal:Mixins.scale(5),justifyContent: "center", alignItems:"center"}}>
                <Icon1 name="search" size={Mixins.scale(17)} color="#858585" style={{paddingTop:Mixins.scale(4)}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            {
              this.state.data.items != undefined && this.state.data.items.length > 0 ? (
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator= {false}
                  style={{ width: "100%",alignSelf:"center"}}
                  data={this.state.data.items}
                  renderItem={({ item }) => (   
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate("DetailedScreen",{id:item.question_id})} style={styles.questionCardLayout}> 
                      <View style={{width:"24%",marginRight: Mixins.scale(10),marginLeft: Mixins.scale(2)}}>
                        <View style={styles.profileImageOuterlayout}>
                          {
                            item.owner.profile_image != undefined && item.owner.profile_image != "" ? (
                              <Image style={styles.profileImageStyle} source={{uri : item.owner.profile_image}} />
                            ) : (
                              <Image style={styles.profileImageStyle} source={require("../../../assets/images/unknown.png")} />
                            )
                          }
                        </View>
                        <Text numberOfLines={1} style={[styles.userNameText,{fontFamily:"Poppins-Medium"}]}>{item.owner.display_name}</Text>
                        <View style={{alignSelf:"center",justifyContent:"center",alignItems:"center"}}>
                          <View style={{flexDirection:"row", alignItems:"center", marginBottom:Mixins.scale(5)}}>
                            <Icon1 name="eye" size={Mixins.scale(14)} color="black" style={{marginRight:Mixins.scale(5)}}/>
                            <Text numberOfLines={1} style={styles.attributeText}>{item.view_count}</Text>
                          </View>
                          <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Icon2 name="caretup" size={Mixins.scale(14)} color="black" style={{marginRight:Mixins.scale(5),marginTop:Mixins.scale(3)}}/>
                            <Text numberOfLines={1} style={styles.attributeText}>{item.score}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{width:"71%",padding : Mixins.scale(2)}}>
                        <View style={styles.htmlOuterlayout}>
                          <HTMLView stylesheet={htmlStyles} value={"<title>" + item.title + "</title>"} />
                        </View>
                        <View style={styles.tagContainer}>
                          {
                            item.tags.map(function(object, i){
                              return (
                                <View key={"tag" + i} style={styles.tagOuterLayout}>
                                  <Text style={[styles.tagText,{fontFamily: "Poppins-Regular"}]}>{object}</Text>
                                </View>
                              )
                            })
                          }
                        </View>
                      </View>
                    </TouchableOpacity> 
                  )}
                />
              ) : (
                <View style={styles.searchErrorImageOuterlayout}>
                  <Image style={styles.searchErrorImageStyle} source={require("./res/search_error.png")} />
                </View>
              )
            }
          </View>
        </SafeAreaView>
    );
  }
}

const htmlStyles = StyleSheet.create({
  title: {
      fontSize: Mixins.scale(11),
      lineHeight: 22,
      fontFamily: "Poppins-Regular"
    },

})

export default SearchResultScreen;