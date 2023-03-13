import { StyleSheet } from "react-native";

// Constants
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { fontSize } from "../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    mainContainer: {
        height: wp("16%"),
        borderRadius: wp("10%"),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        bottom: 10,
        marginHorizontal: wp("2%"),
        zIndex: 3,
    },
    partnerContainer: {
        height: wp("16%"),
        borderRadius: wp("10%"),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        bottom: 10,
        marginHorizontal: wp("2%"),
    },
    touchView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabIconText: {
        color: colors?.white,
        fontSize: fontSize?.f10,
        fontFamily: font?.semiBold,
        marginTop: 5,
        textAlign: "center",
    },
    partnerTabIconText: {
        color: colors?.white,
        fontSize: fontSize?.f8,
        fontFamily: font?.semiBold,
        marginTop: 5,
    },
    tabIconSize: { height: wp("5%"), width: wp("5%") },
});
