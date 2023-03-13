import { StyleSheet } from "react-native";

// Constants
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { fontSize } from "../../constant/fontSize";

// Third Party
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

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
        flex: 0.87,
        justifyContent: "center",
        alignItems: "center",
    },
    upperImage: {
        width: wp("170%"),
        height: wp("170%"),
        flex: 0.8,
    },
    bottomView: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        marginTop: -wp("20%"),
        alignSelf: "center",
        justifyContent: "space-between",
    },
    upperTextStyle: {
        textAlign: "center",
        fontSize: fontSize.f16,
        color: colors.black,
        fontFamily: font?.semiBold,
        width: wp("77%"),
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
    dotStyle: {
        backgroundColor: "#007F8E",
        width: 10,
        height: 10,
        borderRadius: 50,
        marginHorizontal: wp("1%"),
    },
    directionRow: { flexDirection: "row" }
});