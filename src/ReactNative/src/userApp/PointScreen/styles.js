import { StyleSheet, Platform } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { fontSize } from "../../constant/fontSize";

export const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: wp("4%") },
    expireButton: {
        paddingVertical: wp("2%"),
        paddingHorizontal: wp("4%"),
        borderRadius: wp("5%"),
        backgroundColor: colors.chocolate
    },
    expireText: {
        fontSize: fontSize.f16,
        fontFamily: font.regular,
        color: colors.orange1,
    },
    pointsTopView: {
        alignItems: "center",
        marginTop: wp("5%"),
    },
    tabText: {
        fontSize: fontSize?.f20,
        color: colors.lightBlue2,
        fontFamily: font.semiBold,
    },
    tabView: {
        width: wp("46%"),
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    tabContainer: { width: "100%", height: wp("14%"), marginVertical: wp("4%") },
    pointsItem: {
        marginVertical: wp("3%"),
        backgroundColor: colors.white,
        shadowColor: colors["grey-100"],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        borderRadius: wp("4%"),
    },
    pointTopLeftView: { flex: 0.2, justifyContent: "center" },
    pointTopCenterView: {
        flex: 0.5,
        paddingLeft: wp("2%"),
        justifyContent: "center",
    },
    pointTopRightView: {
        flex: 0.37,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    pointLeftImage: {
        height: wp("14%"),
        width: wp("14%"),
        borderRadius: wp("7%"),
    },
    pointItemTopView: {
        flexDirection: "row",
        paddingHorizontal: wp("4%"),
        paddingVertical: wp("3%"),
        borderRadius: wp("5%"),
        alignItems: "center",
    },
    calenderIcon: { height: wp("4%"), width: wp("4%"), marginRight: wp("3%") },
    dateView: { flexDirection: "row", alignItems: "center", marginTop: wp("1%") },
    locationText: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.bold,
    },
    dateText: { fontSize: fontSize?.f14, color: colors.black, fontWeight: "500" },
    subTitle: {
        fontSize: fontSize?.f12,
        color: colors.black,
        fontFamily: font.medium,
        paddingTop: wp("1%"),
    },
    decreasePoints: {
        fontSize: fontSize?.f14,
        color: colors.red,
        fontFamily: font.semiBold,
    },
    pointView: { flexDirection: "row", alignItems: "center" },
    pointBottomView: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("4%"),
        paddingVertical: wp("3%"),
    },
    pointIcon: { height: wp("3%"), width: wp("4%") },
    pointText: {
        fontSize: fontSize?.f14,
        fontFamily: font.medium,
        color: colors.black,
    },
    boostedText: {
        fontSize: fontSize?.f13,
        fontFamily: font.semiBold,
        color: colors.orange1,
    },
    dashContainer: { width: "100%", height: wp("0.5%") },
    dashStyle: {
        backgroundColor: "rgba(112, 112, 112,0.2)",
        width: wp("1.5%"),
        height: wp("0.4%"),
    },
    emptyText: {
        fontFamily: font?.bold,
        fontSize: fontSize?.f13,
        color: "#FD7A15",
        textAlign: "center",
        marginBottom: wp("4%"),
    },
    boostButton: {
        paddingVertical: wp("2%"),
        width: wp("25%"),
        borderRadius: wp("5%"),
        alignItems: "center",
        justifyContent: "center",
    },
    boostButtonText: {
        fontSize: fontSize?.f13,
        color: colors.black,
        fontWeight: "500",
    },
    balanceText: {
        fontSize: fontSize?.f16,
        fontFamily: font.regular,
        color: colors.black2,
    },
    pointValue: {
        fontSize: fontSize?.f30,
        fontFamily: font.bold,
        color: colors.black2,
        marginTop: wp("2%"),
        marginBottom: wp("4%"),
    },
    pointTitle: {
        fontSize: fontSize?.f30,
        fontFamily: font.regular,
        color: colors.black2,
    },
    pointsList: { marginBottom: Platform.OS === "ios" ? wp("80%") : wp("10%") },
    notProUserTabView: {
        borderBottomWidth: 3,
        width: wp("50%"),
        borderBottomColor: colors.lightBlue2,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: wp("4%"),
    },
});