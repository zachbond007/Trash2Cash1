import { StyleSheet, Platform } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";


export const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: colors?.white },
    buttonText: {
        fontSize: fontSize?.f22,
        textAlign: "center",
        color: colors?.black,
        fontFamily: font?.medium,
        letterSpacin: 0.25,
    },
    blanckView: {
        marginTop: wp("10%"),
    },
    resendView: { width: wp("90%"), alignSelf: "center", alignItems: "center" },
    underlineStyleBase: {
        width: 53,
        height: 53,
        backgroundColor: "#fff",
        fontSize: fontSize.f20,
        color: colors.black,
        fontFamily: font.medium,
        borderColor: "#DCDCDC",
        textAlignVertical: "center",
        borderRadius: wp("2%"),
    },
    resendText1: {
        fontFamily: font?.regular,
        color: "#BBBBBB",
        fontSize: fontSize?.f16,
    },
    resendText2: {
        fontFamily: font?.semiBold,
        color: "#0191B4",
        fontSize: fontSize?.f16,
    },
    backButtonView: {
        flexDirection: "row",
        width: wp("90%"),
        alignSelf: "center",
        alignItems: "center",
        marginTop: Platform?.OS == "ios" ? wp("10%") : wp("2%"),
    },
    backiconstyle: { width: wp("8%"), height: wp("8%"), marginTop: wp("5%") },
    welcomeView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("12%"),
        paddingLeft: wp("2%"),
    },
    welcometext: {
        color: colors?.black,
        fontSize: fontSize?.f32,
        fontFamily: font?.semiBold,
    },
    welcometext2: {
        color: colors?.grey,
        fontSize: fontSize?.f18,
        marginTop: wp("2%"),
        fontFamily: font?.regular,
    },
    otpStyle: {
        width: wp("93%"),
        height: wp("25%"),
        alignSelf: "center",
        marginTop: wp("8%"),
    },
    eyeIcon: { width: wp("6%"), height: wp("6%"), marginRight: wp("3%") },
    forgotView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("4%"),
        alignItems: "flex-end",
        justifyContent: "center",
    },
    forgotText: {
        color: colors?.black,
        fontSize: fontSize?.f16,
        fontFamily: font?.semiBoldItalic,
    },
    buttonView: { marginTop: wp("12%") },
    createaccountView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("4%"),
        justifyContent: "center",
        alignItems: "center",
    },
    createAccountText: {
        color: colors?.grey,
        fontSize: fontSize?.f14,
        fontFamily: font?.regular,
    },
    hrLine: {
        height: 0.4,
        width: wp("87%"),
        backgroundColor: colors?.grey,
        alignSelf: "center",
        marginTop: wp("10%"),
    },
    otherSigninView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("4%"),
        justifyContent: "center",
        alignItems: "center",
    },
    otherSigninText: {
        color: colors?.black,
        fontSize: fontSize?.f14,
        fontFamily: font?.medium,
    },
    socialButtonMainView: {
        width: wp("50%"),
        alignSelf: "center",
        marginTop: wp("7%"),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    socialButtontouch1: { justifyContent: "center", alignItems: "center" },
    socialButtontouch2: { justifyContent: "center", alignItems: "center" },
    socialIconTouch: { width: wp("14%"), height: wp("14%") },
    socialIconTouch1: { width: wp("15%"), height: wp("15%") },
    socialText: {
        color: colors?.white,
        fontSize: fontSize?.f16,
        marginLeft: wp("2%"),
        fontFamily: font?.medium,
    },
});