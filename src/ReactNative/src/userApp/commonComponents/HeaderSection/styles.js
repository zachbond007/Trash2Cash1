import { StyleSheet, Platform } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    backButtonView: {
        flexDirection: "row",
        width: wp("88%"),
        alignSelf: "center",
        alignItems: "center",
        zIndex: 1,
        justifyContent: "space-between",
        marginTop: Platform?.OS == "ios" ? wp("15%") : wp("2%"),
    },
    backiconstyle: {
        width: wp("8%"),
        height: wp("8%"),
    },
    titleStyle: {
        fontSize: fontSize?.f22,
        color: colors?.black,
        fontFamily: font?.bold,
    },
    profileIcon: {
        width: wp("10%"),
        height: wp("10%"),
        borderRadius: wp("10%"),
    },
    notiIcon: {
        width: wp("7%"),
        height: wp("7%"),
    },
    headerRightView: { flexDirection: "row", alignItems: "center" },
    rightTextView: { justifyContent: "center", marginRight: wp("4%") },
    rightText: {
        fontSize: fontSize.f18,
        color: colors.black,
        fontFamily: font.semiBold,
    },
    flashTouch: { marginRight: wp("10%") },
    emptyText: { color: colors?.white }
});