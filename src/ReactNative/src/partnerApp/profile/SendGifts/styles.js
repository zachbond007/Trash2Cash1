import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    enterPoint: {
        fontFamily: font?.regular,
        fontSize: fontSize?.f16,
        color: colors?.black,
        textAlign: "center",
        opacity: 0.8,
    },
    pointText: {
        fontFamily: font?.bold,
        fontSize: fontSize?.f30,
        color: colors?.black,
        textAlign: "center",
    },
    pointText1: {
        fontFamily: font?.regular,
        fontSize: fontSize?.f30,
        color: colors?.black,
        textAlign: "center",
        marginBottom: wp("4%"),
    },
    searchIcon: { marginLeft: wp("5%") },
    textInputStyle: {
        width: "80%",
        marginLeft: wp("2%"),
        padding: wp("3%"),
        fontSize: fontSize.f16,
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    profilename: {
        fontFamily: font?.semiBold,
        fontSize: fontSize?.f16,
        color: colors?.black,
        marginTop: wp("4%"),
        textAlign: "center",
        opacity: 0.5,
    },
    degiText: {
        fontFamily: font?.bold,
        fontSize: fontSize?.f32,
        color: colors?.black,
        textAlign: "center",
        marginBottom: wp("4%"),
    },
    mainViewName: {
        flex: 0.8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: colors?.borderColor,
        height: wp("20%"),
    },
    sendTouch: {
        width: wp("20%"),
        height: wp("10%"),
        borderRadius: wp("5%"),
        justifyContent: "center",
        alignItems: "center",
    },
    sendText: {
        fontFamily: font?.medium,
        color: colors?.black,
        fontSize: fontSize?.f14,
    },
    usernametext: {
        fontSize: fontSize?.f18,
        color: colors?.black,
        fontFamily: font?.bold,
    },
    emailStyle: {
        fontSize: fontSize?.f12,
        color: colors?.grey,
        fontFamily: font?.medium,
    },
    recentTExt: {
        color: colors?.logout,
        fontSize: fontSize?.f16,
        fontFamily: font?.bold,
        marginTop: wp("7%"),
        marginLeft: wp("2%"),
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors?.white,
    },
    mainView: { flex: 1, justifyContent: "space-between", alignItems: "center" },
    containerView: { flex: 0.8 },
    searchMainView: {
        width: wp("88%"),
        height: wp("14%"),
        borderRadius: wp("10%"),
        backgroundColor: "#F4F4F4",
        marginTop: wp("5%"),
        alignItems: "center",
        flexDirection: "row",
    },
    textStyle: {
        fontFamily: font?.regular,
        fontSize: fontSize?.f15,
        color: colors?.black,
        marginVertical: wp("3%"),
        marginHorizontal: wp("3%"),
    },
    bottomView: { flex: 0.2, justifyContent: "center", alignItems: "center" },
    linearView: {
        width: wp("88%"),
        alignSelf: "center",
        height: wp("30%"),
        borderRadius: wp("3%"),
        justifyContent: "center",
        alignItems: "center",
        marginTop: wp("5%"),
    },
    cardMainView: {
        flexDirection: "row",
        width: wp("85%"),
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: wp("3%"),
    },

    // new
    profileMainView: { flex: 0.2, flexDirection: "row", alignItems: "center" },
    profilIcon: { width: wp("12%"), height: wp("12%"), borderRadius: wp("10%") },
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
    upperStyle: {
        flex: 0.5,
        alignItems: "center",
    },
    uperImage: {
        width: wp("45%"),
        height: wp("45%"),
        marginTop: wp("2%"),
    },
});
