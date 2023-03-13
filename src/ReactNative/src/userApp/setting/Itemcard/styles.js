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
        borderBottomWidth: 1,
        borderBottomColor: colors?.borderColor2,
    },
    toggleStyle: { width: wp("15%"), height: wp("15%") },
    buttonText: {
        fontSize: fontSize?.f22,
        textAlign: "center",
        color: colors?.black,
        fontFamily: font?.medium,
        letterSpacin: 0.25,
    },
    titleText: {
        fontFamily: font?.semiBold,
        fontSize: fontSize?.f20,
        color: colors?.black,
    },
    titleStyle: { flex: 0.8, justifyContent: "center" },
    toggleView: { flex: 0.2, justifyContent: "center", alignItems: "flex-end" }
});