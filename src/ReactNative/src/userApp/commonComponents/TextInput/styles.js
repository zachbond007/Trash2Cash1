import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";


export const styles = StyleSheet?.create({
    textInpuViewStyle: {
        width: "100%",
        height: wp("14%"),
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        borderRadius: wp("2.5%"),
        justifyContent: "center",
    },
    textInpuViewStyle1: {
        width: "100%",
        height: wp("14%"),
        borderWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: wp("2%"),
        borderRadius: wp("2.5%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    emailAndTextinputView: {
        width: wp("87%"),
        alignSelf: "center",
    },
    textInputStyle: {
        marginLeft: wp("5%"),
        fontSize: fontSize?.f16,
        color: colors.black,
        height: "100%",
        fontFamily: font?.semiBold,
    },

    passAndTextinputView: {
        width: wp("87%"),
        alignSelf: "center",
        marginTop: wp("2%"),
    },
    eyeIcon: { width: wp("6%"), height: wp("6%"), marginRight: wp("3%") },
    textInputStyle1: {
        marginLeft: wp("5%"),
        fontSize: fontSize?.f18,
        width: "80%",
        height: "100%",
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
});