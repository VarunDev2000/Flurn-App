import { Dimensions, StyleSheet } from "react-native";
import * as Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("screen").height,
        backgroundColor: colors.bgColor,
        justifyContent:"center",
        alignItems:"center",
    },
    textFieldStyle: {
        flex:0,
        flexDirection:"row",
        width:"90%",
        alignSelf:"center",
        paddingVertical: Mixins.scale(6.5),
        borderColor: '#e3e3e3',
        backgroundColor:"white",
        borderWidth: 1,
        borderRadius:5,
        paddingLeft:10,
        paddingRight:10,
        color: 'black',
        elevation:2
      },
      imageOuterLayout: {
          width:Mixins.scale(150),
          height: Mixins.scale(80),
          backgroundColor:"red",
          marginBottom: Mixins.scale(20)
      },
      imageStyle: {
          width:"100%",
          height:"100%",
          resizeMode: "cover"
      }
})


export default styles;