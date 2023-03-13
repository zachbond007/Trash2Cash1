import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    touchStyle: {
        width: wp("82%"),
        height: wp("20%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    toggleStyle: {
        width: wp("6.5%"),
        height: wp("6.5%"),
    },
    titleStyle: {
        fontFamily: font?.semiBold,
        fontSize: fontSize?.f20,
        color: colors?.logout,
    },
    loadreView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors?.white,
    },
    textMainView: {
        flex: 0.8,
        justifyContent: "center",
    },
    iconView: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    itemMainView: {
        alignSelf: "center",
        marginTop: wp("12%"),
    },
});
