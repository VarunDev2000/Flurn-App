import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, View, Text, FlatList } from "react-native";

import { getSearchResults } from '../../actions/actions';

class SearchResultScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,
    data : {},
    page : 1,
  }

  componentDidMount(){
    //console.log(this.props.route.params.searchText)
    this.getData(this.state.page)
  }

  getData =  async (page) => {
    try {
      let res = await getSearchResults(this.props.route.params.searchText, page)
      //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
      //console.log(res.data.items[0].body)
      this.setState({
        data : res.data
      })

    } catch (error) {
      console.error(error.response);
    }

  }
  render() {
    return (
        <SafeAreaView style={{height:this.state.height}}>
          <View style={{flex:1}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              style={{ width: "100%",alignSelf:"center"}}
              data={this.state.data.items}
              renderItem={({ item }) => (     
                <Text>{item.body}</Text>
              )}
            />
          </View>
        </SafeAreaView>
    );
  }
}

export default SearchResultScreen;