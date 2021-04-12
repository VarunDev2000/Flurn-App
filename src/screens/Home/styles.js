import { Dimensions, StyleSheet } from "react-native";
import * as Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


const styles = StyleSheet.create({
    container: {
        flex:1,
        height: Dimensions.get("screen").height,
        backgroundColor: colors.bgColor,
        justifyContent:"center",
        alignItems:"center",
        paddingBottom: "20%"
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
        paddingLeft:Mixins.scale(10),
        paddingRight:Mixins.scale(10),
        color: 'black',
        elevation:1,
        marginBottom: "15%"
      },
      titleText: {
          color: colors.primary,
          fontSize: Mixins.scale(45),
          marginBottom: "2%"
      },
      cachedQTextOuterLayout: {
          flexDirection: "row",
          alignItems:"center",
      },
      cachedQText: {
          fontSize: Mixins.scale(12),
      }
})


export default styles;