import { StyleSheet, Platform } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";


export const styles = StyleSheet.create({
    loaderView: { flex: 1, justifyContent: "center", alignItems: "center" },
    container: { flex: 1 },
    textInpuViewStyle: {
        width: "100%",
        height: wp("14%"),
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        borderRadius: wp("2.5%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    emailAndTextinputView: {
        width: wp("87%"),
        alignSelf: "center",
        marginTop: wp("5%"),
    },
    textInputStyle: {
        paddingLeft: wp("5%"),
        fontSize: fontSize?.f20,
        color: colors.black,
        height: "100%",
        fontFamily: font?.semiBold,
    },
    passAndTextinputView: {
        width: wp("87%"),
        alignSelf: "center",
        marginTop: wp("2%"),
    },
    textInputStyle1: {
        marginLeft: wp("5%"),
        fontSize: fontSize?.f16,
        width: "80%",
        height: "100%",
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    linearGradient: {
        width: wp("87%"),
        height: wp("15%"),
        borderRadius: wp("12%"),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: fontSize?.f22,
        textAlign: "center",
        color: colors?.black,
        fontFamily: font?.medium,
        letterSpacin: 0.25,
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
    eyeIcon: { width: wp("6%"), height: wp("6%"), marginRight: wp("3%") },
    errorText: { color: colors.red },
    forgotView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("4%"),
        alignItems: "flex-end",
        justifyContent: "center",
    },
    forgotText: {
        color: colors?.logout,
        fontSize: fontSize?.f16,
        fontFamily: font?.semiBoldItalic,
    },
    buttonView: { marginTop: wp("12%") },
    createaccountView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("5%"),
        justifyContent: "center",
        alignItems: "center",
    },
    createAccountText: {
        color: colors?.grey,
        fontSize: fontSize?.f16,
        fontFamily: font?.semiBold,
    },
    createAccountText: {
        color: "#0191B4",
        fontSize: fontSize?.f16,
        fontFamily: font?.semiBold,
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
        width: wp("35%"),
        alignSelf: "center",
        marginTop: wp("7%"),
        justifyContent: "space-between",
        flexDirection: "row",
    },
    socialButtontouch2: { alignItems: "center" },
    socialIconTouch: { width: wp("14%"), height: wp("14%") },
    socialIconTouch1: { width: wp("15%"), height: wp("15%") },
    socialText: {
        color: colors?.white,
        fontSize: fontSize?.f16,
        marginLeft: wp("2%"),
        fontFamily: font?.medium,
    },
});