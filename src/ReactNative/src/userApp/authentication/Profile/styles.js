import { StyleSheet, Platform } from "react-native";

// Third Party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    backButtonView: {
        flexDirection: "row",
        width: wp("90%"),
        alignSelf: "center",
        alignItems: "center",
        marginTop: Platform?.OS == "ios" ? wp("10%") : wp("2%"),
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors?.bgcolor,
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
        width: wp("42%"),
        height: wp("42%"),
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
    userView: {
        marginTop: wp("5%"),
    },
    friendsMainView: {
        width: wp("85%"),
        alignSelf: "center",
        marginTop: wp("8%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    friendView: { flex: 0.2 },
    usernametext: {
        fontSize: fontSize?.f24,
        color: colors?.black,
        fontFamily: font?.semiBold,
        textAlign: "center",
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
        justifyContent: "center",
    },
    titleStyle: {
        fontSize: fontSize?.f20,
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    emailStyle: {
        fontSize: fontSize?.f18,
        color: colors?.grey,
        fontFamily: font?.regular,
        textAlign: "center",
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
        paddingBottom: wp("12%"),
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
    friendText: { flex: 0.7 },
    arrowStyle: { flex: 0.1, alignItems: "flex-end" },
    lowerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: wp("12%"),
        borderTopRightRadius: wp("12%"),
    },
    bottomview: {
        width: wp("88%"),
        alignSelf: "center",
        justifyContent: "space-between",
        height: "100%",
    },
    chooseAccounText: {
        fontSize: fontSize.f32,
        marginTop: wp("10%"),
        fontFamily: font?.semiBold,
    },
    buttonView: { marginBottom: wp("12%") }
});