import { StyleSheet, Platform } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    textInputToFromStyle: {
        width: "48%",
        height: wp("14%"),
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        paddingLeft: wp("5%"),
        justifyContent: "center",
        borderRadius: 5,
    },
    dropdownView: { paddingHorizontal: wp("6%"), marginTop: wp("4%") },
    textInpuViewStyle: {
        width: "100%",
        height: wp("14%"),
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textInpuViewStyle3: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.lightGrey,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        paddingVertical: wp("2%"),
    },
    datePickerView: {
        width: "80%",
        height: "100%",

        justifyContent: "center",
    },
    datePickerText: {
        paddingLeft: wp("5%"),
        fontSize: fontSize?.f18,
        color: colors?.grey,
        fontFamily: font?.semiBold,
    },
    toFromplaceholder: {
        fontSize: fontSize?.f18,
        color: colors?.grey,
        fontFamily: font?.semiBold,
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
        marginTop: wp("3%"),
    },
    toFromTextInputView: {
        width: wp("87%"),
        alignSelf: "center",
        marginTop: wp("3%"),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textInputStyle1: {
        paddingLeft: wp("5%"),
        fontSize: fontSize?.f18,
        width: "80%",
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    textInputStyle2: {
        justifyContent: "center",
        width: wp("27%"),
        height: "100%",
        alignSelf: "center",
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
        paddingLeft: wp("1%"),
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("7%"),
        marginBottom: wp("6%"),
    },
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
    inputView: { marginTop: wp("3%") },
    eyeIcon: { width: wp("6%"), height: wp("6%"), marginRight: wp("3%") },
    dropDownIcon: { width: wp("5%"), height: wp("5%"), marginRight: wp("3%") },
    forgotView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("4%"),
        alignItems: "flex-end",
        justifyContent: "center",
    },
    forgotText: { color: colors?.black, fontSize: fontSize?.f14 },
    buttonView: { flex: 0.4 },
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
        fontSize: fontSize?.f15,
        fontFamily: font?.medium,
    },
    dropdownTitle: {
        fontSize: fontSize?.f18,
        color: colors?.grey,
        fontFamily: font?.semiBold,
    },
});