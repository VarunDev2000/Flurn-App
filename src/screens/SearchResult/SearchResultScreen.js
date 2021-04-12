import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Dimensions, View, Text, FlatList, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import HTML from "react-native-render-html";
import NetInfo from '@react-native-community/netinfo'
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "./styles";
import * as Font from 'expo-font';

import Loader1 from "../../components/Loaders/Loader1";
import Loader3 from "../../components/Loaders/Loader3";

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import { getSearchResults } from '../../actions/actions';

class SearchResultScreen extends Component {

  state = {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,

    loading: true,
    search_type: "search",
    fixedSearchText : "",
    searchText : "",
    has_more: false,
    data : [],
    page : 1,
  }

  componentDidMount(){
    //console.log(this.props.route.params.searchText)
    this.checkNetworkConnection()
    this.setState({
      fixedSearchText: this.props.route.params.searchText,
      searchText: this.props.route.params.searchText,
    },
      function(){
        this.getData()
      }
    )
  }

  componentWillUnmount() {
    this.checkNetworkConnection()
  }

  checkNetworkConnection = () => {
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = state => {
    if (!state.isConnected) {
      Alert.alert("Oops!","Your'e offline", [
        {
          text: "OK",
          onPress: () => this.props.navigation.goBack(),
          style: "cancel"
        }
      ]);
    }
  };

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


  getData = async () => {
    this.loadFonts();
    try {
      this.setState({
        search_type: "search"
      })
      let res = await getSearchResults("search", this.state.fixedSearchText, this.state.page)
      //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
      //console.log(res.data.items.length)

      if(this.state.page == 1 && res.data.items.length <= 0){
        this.setState({
          search_type: "similar"
        })
        let res1 = await getSearchResults("similar", this.state.fixedSearchText, this.state.page)
        this.setState({
          data : (this.state.data).concat(res1.data.items),
          has_more : res1.data.has_more,
        },
          function(){
            setTimeout(() => {this.setState({loading: false,})}, 700)
          }
        )

        //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
        //console.log(res1.data)
      }
      else{
        this.setState({
          data : (this.state.data).concat(res.data.items),
          has_more : res.data.has_more,
        },
          function(){
            setTimeout(() => {this.setState({loading: false,})}, 700)
          }
        )
      }

    } catch (error) {
      this.setState({
        loading: false,
      })
      console.log(error.response);
    }
  }
  

  startSearch = () => {
    if(this.state.searchText != "") {
      this.setState({
        fixedSearchText: this.state.searchText,
        loading: true,
        data : [],
        page : 1,
      },
        function(){
          this.getData()
        }
      ) 
    }
  }

  getNextData = async () => {
      try {
        let pg = this.state.page + 1
        let res = await getSearchResults("search", this.state.fixedSearchText, pg)
        //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
        //console.log(res.data.items.length)

        this.setState({
          data : (this.state.data).concat(res.data.items),
          has_more : res.data.has_more,
          page: pg,
        }) 

      } catch (error) {
        console.log(error.response);
      }
  }

  fetchMore = () => {
    if(this.state.has_more){
      this.getNextData()
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
          {
            this.state.loading ? (
              <Loader1 />
            ) : (
              <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                {
                  this.state.data != undefined && this.state.data.length > 0 ? (
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator= {false}
                      onEndReached={() => this.fetchMore()}
                      onEndReachedThreshold={0.5}
                      ListFooterComponent = {
                        <Loader3 />
                      }
                      style={{ width: "100%",alignSelf:"center"}}
                      data={this.state.data}
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
                              <HTML tagsStyles={htmlStyles} contentWidth={0.90 * Dimensions.get('window').width} source={{ html: "<title>" + item.title + "</title>" }} />
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
            )
          }
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