import { StyleSheet } from "react-native";
import * as Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


const styles = StyleSheet.create({
    topLayout: {
        width:"94%",
        height: "7%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    backButtonOuterLayout: {
        width:"15%",
        justifyContent:"center",
        alignItems:"center"
    },
    questionOuterLayout: {
        elevation:10,
        borderRadius: 3,
        width:"94%",
        alignSelf:"center",
        backgroundColor:"white",
        marginBottom: Mixins.scale(10),
        paddingHorizontal: Mixins.scale(10),
        paddingVertical: Mixins.scale(10),
        borderWidth: 2,
        borderColor:"#ad2e24"
    }
})


export default styles;