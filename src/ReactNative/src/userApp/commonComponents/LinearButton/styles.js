import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import * as colours from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    linearGradient: {
        width: wp("87%"),
        height: wp("15%"),
        borderRadius: wp("12%"),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
    },
    buttonText: {
        fontSize: fontSize?.f22,
        textAlign: "center",
        color: colours?.lightBlue2,
        fontFamily: font?.medium,
        letterSpacin: 0.25,
    },
});