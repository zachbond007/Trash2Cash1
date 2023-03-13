
import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

//Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    directionColumn: {
        flexDirection: "column",
    },
    planDiscription: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.regular,
        textAlign: "center",
        marginVertical: wp("2%"),
        width: wp("85%"),
        alignSelf: "center",
    },
    hotspotRewardView: { flexDirection: "row" },
    hotspotRewardText: {
        color: colors.yellow2,
        marginLeft: wp("3%"),
        marginTop: wp("2%"),
        marginBottom: 0,
        fontSize: fontSize?.f15,
        fontFamily: font.regular,
    },
    expiryDateView: {
        paddingVertical: wp("2%"),
        paddingHorizontal: wp("5%"),
        alignSelf: "flex-start",
        borderRadius: wp("5%"),
        backgroundColor: "rgba(255, 255, 255,0.1)"
    },
    statusButtonStyle: {
        paddingVertical: wp("2%"),
        borderRadius: wp("6%"),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("6%"),
        marginLeft: wp("5%"),
    },
    statusButtonStyle1: {
        paddingVertical: wp("2%"),
        borderRadius: wp("6%"),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("6%"),
        marginLeft: 0,
        width: "50%",
        marginBottom: 30,
    },
    dateStatusView: { flexDirection: "row", marginTop: wp("1%") },
    planText: {
        fontSize: fontSize?.f20,
        color: colors.black,
        fontFamily: font.bold,
    },
    mostNearText: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.regular,
        marginTop: wp("2%"),
        marginBottom: wp("2%"),
    },
    getNotificationsText: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.regular,
        marginBottom: wp("2%"),
    },
    buttonTitleStyle: {
        fontSize: fontSize?.f16,
        color: colors.black,
        fontFamily: font.regular,
    },
    planItem: {
        paddingVertical: wp("5%"),
        paddingHorizontal: wp("3%"),
        borderRadius: wp("4%"),
        backgroundColor: colors.white,
        marginVertical: wp("2%"),
    },
    otherPlanItems: {
        paddingVertical: wp("5%"),
        paddingHorizontal: wp("3%"),
        borderRadius: wp("4%"),
        backgroundColor: colors.white,
        marginVertical: wp("2%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    planHeaderText: {
        fontSize: fontSize?.f16,
        color: colors.grey,
        fontFamily: font.semiBold,
    },
    planListHeader: { marginTop: "6%", marginBottom: wp("1%") },
    planList: { marginHorizontal: wp("5%") },
});
