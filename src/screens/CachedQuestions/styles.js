import { Dimensions, StyleSheet } from "react-native";
import * as Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


const styles = StyleSheet.create({
    topLayout: {
        width:"94%",
        height: "8%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf:"center",
    },
    outerLayout: {
        flex:1,
        width: "100%",
        alignSelf:"center"
    },
    backButtonOuterLayout: {
        width:"15%",
        justifyContent:"center",
        alignItems:"center",
        marginRight: "5%",
    },
    pageTitle: {
        fontSize: Mixins.scale(15),
        marginTop: Mixins.scale(2)
    },
    questionCardLayout: {
        flex:0,
        flexDirection:"row",
        alignItems:"center", 
        backgroundColor: colors.searchResultCardBgColour,
        marginBottom: Mixins.scale(10), 
        padding: Mixins.scale(10),
        elevation:3,
        borderRadius: 3,
        width:"94%",
        alignSelf:"center"
    },
    htmlOuterlayout: {
        flex:1,
        flexWrap:"wrap",
        width:"100%",
        marginBottom: Mixins.scale(5)
    },
    tagContainer: {
        flex:1,
        flexWrap:"wrap",
        flexDirection:"row",
        alignItems:"center",
        width:"85%",
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
        marginTop: Mixins.scale(1)
    },
    profileImageOuterlayout: {
        width:Mixins.scale(25),
        height: Mixins.scale(25),
        borderRadius:200,
        backgroundColor:"white",
        alignSelf:"center",
        marginBottom: Mixins.scale(3),
    },
    profileImageStyle: {
        width:"100%",
        height:"100%",
        resizeMode: "contain",
        borderRadius:200,
    },
    attributeText: {
        width:"70%",
        fontSize:12, 
        fontFamily:"Poppins-SemiBold", 
        marginTop: Mixins.scale(2)
    },
    userNameText: {
        width:"100%",
        fontSize: Mixins.scale(10),
        marginBottom: Mixins.scale(10),
        alignSelf:"center",
        textAlign:"center",
        color:"#808080",
        textDecorationLine:"underline"
    },
    searchErrorImageOuterlayout: {
        width:Mixins.scale(200),
        height: Mixins.scale(200),
        backgroundColor:"white",
        alignSelf:"center",
        marginTop: "50%"
    },
    searchErrorImageStyle: {
        width:"100%",
        height:"100%",
        resizeMode: "contain",
    },
    deleteTextOuterLayout: {
        justifyContent:"center",
        alignItems:"center",
        height:"100%"
    },
    deleteText: {
        color: "red",
        fontSize: Mixins.scale(11),
        marginRight: "4%"
    }
})


export default styles;