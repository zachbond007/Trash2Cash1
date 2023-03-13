import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    container: { flex: 1 },
    maincontainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: wp("7%"),
    },
    cardBackground: {
        width: wp("86%"),
        height: wp("55%"),
        justifyContent: "flex-end",
        alignItems: "center",
    },
    titleMainView: { flex: 0.3, justifyContent: "center" },
    titleStyle: {
        fontSize: fontSize?.f20,
        fontFamily: font?.semiBold,
        color: colors?.black,
    },
    itemScrollView: { marginBottom: wp("7%") },
});