import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";



export const styles = StyleSheet.create({
    container: { flex: 1 },
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
        elevation: 3,
    },
    ImageBackground: {
        width: wp("120%"),
        height: hp("120%"),
        marginTop: -56,
        alignSelf: "center",
        paddingHorizontal: wp("8%"),
    },
    upperStyle: {
        flex: 0.45,
        justifyContent: "center",
        alignItems: "center",
    },
    uperImage: {
        width: wp("60%"),
        height: wp("60%"),
        marginTop: wp("15%"),
    },
    lowerStyle: {
        flex: 0.6,
        backgroundColor: colors.white,
        borderTopLeftRadius: wp("14%"),
        borderTopRightRadius: wp("14%"),
        marginTop: wp(20),
    },
    bottomview: {
        width: wp("88%"),
        alignSelf: "center",
        justifyContent: "space-between",
    },
    chooseAccounText: {
        fontSize: fontSize.f24,
        textAlign: "center",
        marginTop: wp("10%"),
        fontFamily: font?.semiBold,
        color: colors.black,
    },
    tickIconView: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
    tickIcon: {
        width: wp("18%"),
        height: wp("18%"),
    },
    cardTextView: {
        flex: 0.6,
        justifyContent: "center",
    },
    cardTextStyle: {
        fontSize: fontSize.f18,
        fontFamily: font?.semiBold,
        color: colors?.black,
    },
    cardTextStyle1: {
        fontSize: fontSize.f12,
        fontFamily: font?.regular,
        opacity: 0.6,
        color: colors.black,
    },
    arrowiconView: {
        flex: 0.12,
        justifyContent: "center",
        alignItems: "center",
    },
});