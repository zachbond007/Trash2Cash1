import { StyleSheet, Platform } from "react-native";

// Third Party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";



export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    headerView: { marginTop: wp("15%") },
    cardStyle: {
        backgroundColor: "white",
        width: wp("86%"),
        alignSelf: "center",
        height: wp("30%"),
        borderRadius: wp("2%"),
        justifyContent: "center",
        marginTop: wp("5%"),
        flexDirection: "row",
        shadowColor: "#c0c0c0",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    backButtonView: {
        flexDirection: "row",
        width: wp("90%"),
        alignSelf: "center",
        alignItems: "center",
        marginTop: Platform?.OS == "ios" ? wp("20%") : wp("2%"),
    },
    backiconstyle: {
        width: wp("8%"),
        height: wp("8%"),
        marginTop: wp("5%"),
    },
    ImageBackground: {
        width: wp("120%"),
        height: hp("120%"),
        marginTop: -50,
        alignSelf: "center",
        paddingHorizontal: wp("8%"),
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
    emailView: { marginTop: wp("6%") },
    buttonView: { marginTop: wp("25%") },
    upperStyle: {
        flex: 0.25,
        justifyContent: "center",
        alignItems: "center",
    },
    uperImage: {
        width: wp("45%"),
        height: wp("45%"),
        marginTop: wp("10%"),
    },
    lowerStyle: {
        flex: 0.75,
        marginTop: wp("10"),
        backgroundColor: colors.white,
        borderTopLeftRadius: wp("12%"),
        borderTopRightRadius: wp("12%"),
    },
    bottomview: {
        width: wp("88%"),
        alignSelf: "center",
        justifyContent: "space-between",
    },
    chooseAccounText: {
        fontSize: fontSize.f30,
        marginTop: wp("10%"),
        fontFamily: font?.semiBold,
        color: colors.black,
    },
});