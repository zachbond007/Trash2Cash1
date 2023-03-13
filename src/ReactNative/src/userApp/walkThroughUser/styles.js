import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";

// Constants
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { fontSize } from "../../constant/fontSize";

export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    imageBackground: {
        width: wp("120%"),
        height: hp("120%"),
        marginTop: -45,
        alignSelf: "center",
        paddingHorizontal: wp("8%"),
    },
    upperStyle: {
        flex: 0.83,
        justifyContent: "center",
        alignItems: "center",
    },
    upperImage: {
        width: wp("170%"),
        height: wp("170%"),
        flex: 0.8,
    },
    upperImage1: { width: wp("170%"), height: wp("170%"), flex: 0.83 },
    bottomView: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        marginTop: -wp("17%"),
        alignSelf: "center",
        justifyContent: "space-between",
    },
    upperTextStyle: {
        textAlign: "center",
        fontSize: fontSize.f16,
        color: colors.black,
        fontFamily: font?.semiBold,
        width: wp("80%"),
    },
    upperTextStyle1: {
        textAlign: "center",
        fontSize: fontSize.f14,
        color: colors.black,
        fontFamily: font?.medium,
    },
    bottomTextView: {
        width: wp("15%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center",
    },
    bottomText: {
        fontFamily: font?.semiBold,
        color: colors.black,
        fontSize: fontSize?.f13,
    },
    directionRow: { flexDirection: "row" },
    dotStyle: {
        backgroundColor: "#007F8E",
        width: 10,
        height: 10,
        borderRadius: 50,
        marginHorizontal: wp("1%"),
    },
});