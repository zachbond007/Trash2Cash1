import { StyleSheet, Platform } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";


export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    textInpuViewStyle: {
        width: "100%",
        height: wp("14%"),
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        borderRadius: wp("2.5%"),
        justifyContent: "center",
    },
    emailAndTextinputView: {
        width: wp("87%"),
        alignSelf: "center",
        marginTop: wp("5%"),
    },
    blankSpace: { height: wp("20%"), width: wp("10%") },
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
        marginTop: wp("3%"),
    },
    textInputStyle1: {
        paddingLeft: wp("5%"),
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
    dateOfBirthTextInput: {
        fontSize: fontSize?.f16,
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    dateOfBirthTextInputView: {
        paddingLeft: wp("5%"),
        height: "100%",
        justifyContent: "center",
    },
    backButtonView: {
        flexDirection: "row",
        width: wp("90%"),
        alignSelf: "center",
        alignItems: "center",
        marginTop: Platform?.OS == "ios" ? wp("10%") : wp("2%"),
    },
    backiconstyle: { width: wp("8%"), height: wp("8%"), marginTop: wp("5%") },
    welcomeView: { width: wp("90%"), alignSelf: "center", marginTop: wp("12%") },
    welcometext: {
        color: colors?.black,
        fontSize: fontSize?.f30,
        fontFamily: font?.semiBold,
    },
    welcometext2: {
        color: colors?.grey,
        fontSize: fontSize?.f18,
        marginTop: wp("2%"),
        fontFamily: font?.regular,
    },
    eyeIcon: { width: wp("6%"), height: wp("6%"), marginRight: wp("3%") },
    forgotView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("4%"),
        alignItems: "flex-end",
        justifyContent: "center",
    },
    forgotText: { color: colors?.black, fontSize: fontSize?.f14 },
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
        fontSize: fontSize?.f16,
        fontFamily: font?.regular,
    },
    textContainerView: { marginTop: wp("3%") },
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

    profileMainView: {
        flexDirection: "row",
        marginTop: wp("8%"),
        alignSelf: "center",
        paddingBottom: wp("5%"),
    },
    imageProfilebackground: {
        height: wp("40%"),
        width: wp("40%"),
        justifyContent: "center",
        alignItems: "center",
    },
    userprofile: {
        width: "95%",
        height: "95%",
        borderRadius: wp("100%"),
    },
    userprofile1: {
        width: wp("20%"),
        height: wp("20%"),
        borderRadius: wp("100%"),
    },
    editIcon: {
        alignSelf: "flex-end",
        width: wp("15%"),
        height: wp("15%"),
        marginLeft: -wp("15"),
    },
    editView: {
        alignSelf: "flex-end",
        width: wp("15%"),
        height: wp("15%"),
        marginLeft: -wp("15"),
        borderRadius: wp("10%"),
        backgroundColor: "#CAE492",
        justifyContent: "center",
        alignItems: "center",
    },

    modalImageBackground: { flex: 1 },
    modalStyle: { flex: 1, justifyContent: "flex-end", bottom: -wp("4%") },
    horizontalLine: {
        width: wp("20%"),
        borderRadius: wp("5%"),
        backgroundColor: colors.grey1,
        height: wp("1.5%"),
        alignSelf: "center",
        marginVertical: wp("3%"),
    },
    modalContainer: {
        bottom: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: wp("9%"),
        borderTopRightRadius: wp("9%"),
        width: wp("100%"),
        alignSelf: "center",
        paddingHorizontal: wp("7%"),
    },
    noticeText: {
        fontSize: fontSize?.f24,
        color: colors?.black,
        fontFamily: font?.bold,
        marginVertical: wp("6%"),
    },

    modalButtonView: { flexDirection: "row", marginBottom: wp("6%") },
    cancelButton: {
        height: wp("15%"),
        width: wp("40%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp("8%"),
        backgroundColor: "#D6D6D6",
        marginRight: wp("2%"),
    },
    confirmButton: {
        height: wp("15%"),
        width: wp("40%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp("8%"),
        marginLeft: wp("2%"),
    },
    cancelText: {
        fontSize: fontSize?.f22,
        color: colors.black,
        fontFamily: font.medium,
    },
    confirmText: {
        fontSize: fontSize?.f22,
        color: colors.black,
        fontFamily: font.medium,
    },
});