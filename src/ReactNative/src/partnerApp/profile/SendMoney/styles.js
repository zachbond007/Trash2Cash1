import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    enterPoint: {
        fontFamily: font?.semiBold,
        fontSize: fontSize?.f16,
        color: colors?.black,
        marginTop: wp("4%"),
        textAlign: "center",
        opacity: 0.5,
    },
    pointText: {
        alignSelf: "center",
        width: wp("50%"),
        fontFamily: font?.bold,
        fontSize: fontSize?.f32,
        color: "#FD7A15",
        textAlign: "center",
        marginBottom: wp("4%"),
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors?.white,
    },
    mainView: { flex: 1, justifyContent: "space-between", alignItems: "center" },
    containerView: { flex: 0.8, justifyContent: "center", alignItems: "center" },
    textStyle: {
        fontFamily: font?.regular,
        fontSize: fontSize?.f15,
        color: colors?.black,
        marginVertical: wp("3%"),
        marginHorizontal: wp("3%"),
    },
    bottomView: { flex: 0.2, justifyContent: "center", alignItems: "center" },

    // new
    profileMainView: {
        flexDirection: "row",
    },
    imageProfilebackground: {
        height: wp("35%"),
        width: wp("35%"),
        justifyContent: "center",
        alignItems: "center",
    },
    userprofile: {
        width: "95%",
        height: "95%",
        borderRadius: wp("100%"),
    },
    userView: {
        marginTop: wp("5%"),
    },
    usernametext: {
        fontSize: fontSize?.f24,
        color: colors?.black,
        fontFamily: font?.semiBold,
        textAlign: "center",
    },
    ImageBackground: {
        width: wp("100%"),
        height: hp("120%"),
        marginTop: -50,
    },
    emailStyle: {
        fontSize: fontSize?.f16,
        color: colors?.grey,
        fontFamily: font?.regular,
        textAlign: "center",
    },
    upperStyle: {
        flex: 0.5,
        alignItems: "center",
    },
    uperImage: {
        width: wp("45%"),
        height: wp("45%"),
        marginTop: wp("2%"),
    },
    sendBoxView: {
        width: wp("85%"),
        alignSelf: "center",
        backgroundColor: "#F4F4F4",
        borderRadius: wp("3%"),
        marginTop: wp("15%"),
    }
});