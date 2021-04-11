import { StyleSheet } from "react-native";
import * as Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


const styles = StyleSheet.create({
    questionCardLayout: {
        flexDirection:"row",
        alignItems:"center", 
        backgroundColor: colors.searchResultCardBgColou,
        marginBottom: Mixins.scale(10), 
        padding: Mixins.scale(10),
        elevation:3,
        borderRadius: 3,
        marginHorizontal:Mixins.scale(10)
    },
    htmlOuterlayout: {
        flex:1,
        flexWrap:"wrap",
        width:"85%",
        marginBottom: Mixins.scale(5)
    },
    tagOuterLayout: {
        marginRight:Mixins.scale(8),
        marginBottom:Mixins.scale(8), 
        backgroundColor:"rgba(83, 166, 101,0.8)",
        paddingVertical: Mixins.scale(1),
        paddingHorizontal:Mixins.scale(5),
        justifyContent:"center",
        alignItems:"center",
        borderRadius :3
    },
    tagText: {
        fontSize: Mixins.scale(9),
        color: colors.secondary,
    }

})


export default styles;