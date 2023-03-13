import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


export const styles = StyleSheet?.create({
    mainContaiber: {
        flex: 1,
        backgroundColor: colors?.white,
        justifyContent: "center",
        alignItems: "center",
    },
    subView: {
        width: wp("88%"),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    imageICons: {
        width: wp("35%"),
        height: wp("35%"),
    },
    underverifyText: {
        fontSize: fontSize?.f32,
        fontFamily: font?.semiBold,
        color: colors?.black,
        marginTop: wp("7%"),
    },
    detailsText: {
        fontSize: fontSize?.f16,
        fontFamily: font?.regular,
        color: colors?.black,
        marginTop: wp("4%"),
        opacity: 0.5,
        textAlign: "center",
    },
});