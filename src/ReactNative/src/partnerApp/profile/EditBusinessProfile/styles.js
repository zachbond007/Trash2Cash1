import { StyleSheet, Platform } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    container: { flex: 1 },
    backButtonView: {
        flexDirection: "row",
        width: wp("90%"),
        alignSelf: "center",
        alignItems: "center",
        marginTop: Platform?.OS == "ios" ? wp("10%") : wp("2%"),
    },
    limitView: {
        alignSelf: "flex-end",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: wp("3%"),
        marginBottom: wp("3%"),
        marginVertical: wp("2%"),
    },
    limitText: {
        font: font?.regular,
        fontSize: fontSize?.f14,
    },
    limitText1: {
        color: "#0191B4",
        font: font?.regular,
        fontSize: fontSize?.f14,
    },
    passAndTextinputView: {
        width: wp("87%"),
        alignSelf: "center",
        marginTop: wp("3%"),
    },
    dateOfBirthTextInputView: {
        paddingLeft: wp("5%"),
        height: "100%",
        justifyContent: "center",
    },
    dateOfBirthTextInput: {
        fontSize: fontSize?.f16,
        color: colors?.black,
        fontFamily: font?.semiBold,
        flexWrap: "wrap",
    },
    textInpuViewStyle3: {
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        justifyContent: "center",
        marginTop: wp("3%"),
    },
    textView: { marginTop: wp("2%") },
    textView1: { marginTop: wp("10%") },
    textView2: { marginTop: wp("5%"), width: wp("87%"), alignSelf: "center" },
    aboutView: {
        marginTop: wp("4%"),
        borderWidth: 1,
        borderColor: colors?.lightGrey,
        borderRadius: wp("3%"),
        width: wp("87%"),
        alignSelf: "center",
    },
    aboutTextInput: {
        paddingLeft: wp("5%"),
        paddingTop: wp("3%"),
        fontSize: fontSize?.f16,
        color: colors.black,
        height: wp("30%"),
        fontFamily: font?.semiBold,
    },
    textInputStyle1: {
        paddingLeft: wp("5%"),
        fontSize: fontSize?.f18,
        width: "88%",
        height: "100%",
        color: colors?.black,
        fontFamily: font?.semiBold,
    },

    mainContainer: {
        flex: 1,
        backgroundColor: colors?.white,
    },
    profileMainView: {
        flexDirection: "row",
        marginTop: wp("8%"),
    },
    imageProfilebackground: {
        height: wp("45%"),
        width: wp("45%"),
        justifyContent: "center",
        alignItems: "center",
    },
    userprofile: {
        width: "95%",
        height: "95%",
        borderRadius: wp("100%"),
    },
    editIcon: {
        alignSelf: "flex-end",
        width: wp("15%"),
        height: wp("15%"),
        marginLeft: -wp("15"),
    },
    userprofile1: {
        width: wp("20%"),
        height: wp("20%"),
        borderRadius: wp("100%"),
    },
    userView: {
        marginTop: wp("5%"),
        width: wp("85%"),
        alignSelf: "center",
    },
    friendsMainView: {
        width: wp("85%"),
        alignSelf: "center",
        marginTop: wp("8%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    usernametext: {
        fontSize: fontSize?.f30,
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    backiconstyle: {
        width: wp("8%"),
        height: wp("8%"),
        marginTop: wp("5%"),
    },
    ImageBackground: {
        width: wp("100%"),
        height: hp("120%"),
        marginTop: -50,
    },
    textInpuViewStyle: {
        width: "100%",
        height: wp("14%"),
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        borderRadius: wp("2.5%"),
        paddingRight: wp("4%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleStyle: {
        fontSize: fontSize?.f20,
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    emailStyle: {
        fontSize: fontSize?.f16,
        color: colors?.black,
        fontFamily: font?.regular,
        opacity: 0.5,
    },
    emailAndTextinputView: {
        width: wp("87%"),
        alignSelf: "center",
        marginTop: wp("12%"),
    },
    textInputStyle: {
        paddingLeft: wp("5%"),
        fontSize: fontSize?.f20,
        color: colors.black,
        height: "100%",
        fontFamily: font?.semiBold,
    },
    welcometext2: {
        color: colors?.grey,
        fontSize: fontSize?.f16,
        marginTop: wp("2%"),
        fontFamily: font?.regular,
    },

    upperStyle: {
        backgroundColor: colors?.white,
        alignItems: "center",
    },
    uperImage: {
        width: wp("45%"),
        height: wp("45%"),
        marginTop: wp("2%"),
    },
    friendsIcon: {
        width: wp("14%"),
        height: wp("14%"),
    },
    lowerStyle: {
        backgroundColor: colors.white,
    },
    bottomview: {
        width: wp("88%"),
        alignSelf: "center",
        justifyContent: "flex-end",
        height: "100%",
    },
    chooseAccounText: {
        fontSize: fontSize.f32,
        marginTop: wp("10%"),
        fontFamily: font?.semiBold,
    },
    dropdownTitleText: {
        fontSize: fontSize?.f16,
        color: colors?.grey,
        fontFamily: font?.semiBold,
    },

    modalImageBackground: { flex: 1 },
    modalStyle: { flex: 1, justifyContent: "flex-end" },
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
    emptyView: { height: wp("15%") }
});