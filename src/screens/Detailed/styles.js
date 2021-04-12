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
        elevation:2,
        borderRadius: 3,
        width:"97%",
        alignSelf:"center",
        backgroundColor:"white",
        marginBottom: Mixins.scale(10),
        borderWidth:0.7,
        borderColor: "#ff8f8f"
    },
    answerOuterLayout: {
        elevation:2,
        borderRadius: 3,
        width:"97%",
        alignSelf:"center",
        backgroundColor:"white",
        marginBottom: Mixins.scale(10),
        borderColor: "green"
    },
    cardInfoLayout:{
        width:"100%",
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems:"center",
        backgroundColor: "white",
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        paddingHorizontal: Mixins.scale(10),
        paddingVertical: Mixins.scale(10),
        borderBottomWidth:0,
        borderBottomColor:"#e6e6e6"
    },
    cardAnswerDescriptionLayout: {
        paddingHorizontal: Mixins.scale(10),
        paddingVertical: Mixins.scale(10),
    },
    cardQuestionDescriptionLayout: {
        paddingHorizontal: Mixins.scale(10),
        paddingVertical: Mixins.scale(10),
    },
    profileImageOuterlayout: {
        width:Mixins.scale(30),
        height: Mixins.scale(30),
        borderRadius:200,
        backgroundColor:"white",
        alignSelf:"center",
        marginRight: Mixins.scale(7),
    },
    profileImageStyle: {
        width:"100%",
        height:"100%",
        resizeMode: "contain",
        borderRadius:200,
    },
    userNameText: {
        width:"70%",
        fontSize: Mixins.scale(10),
        alignSelf:"center",
        textAlign:"left",
        textDecorationLine:"underline"
    },
    scoreText: {
        width:"50%",
        fontSize: Mixins.scale(12),
        alignSelf:"center",
        textAlign:"left",
    },
})


export default styles;