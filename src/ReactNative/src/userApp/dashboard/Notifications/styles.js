import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    container: { paddingHorizontal: wp("5%") },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: wp("3%"),
        borderBottomWidth: 1,
        borderBottomColor: colors["grey-100"],
        paddingHorizontal: wp("2%"),
        backgroundColor: colors.white,
    },
    notificationIconView: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },
    notificationTextView: {
        flex: 0.8,
        justifyContent: "center",
        marginLeft: wp("2%"),
    },
    notificationText: {
        fontSize: fontSize?.f15,
        fontFamily: font.bold,
        color: colors.black,
    },
    notificationNewIcon: { height: wp("19%"), width: wp("19%") },
    notificationOldIcon: { height: wp("14%"), width: wp("14%") },
    timeText: {
        fontSize: fontSize?.f15,
        fontFamily: font.regular,
        color: colors["grey-500"],
        marginTop: wp("1%"),
    },
    notificationHeader: { marginTop: wp("10%"), marginBottom: wp("3%") },
    notificationHeaderText: {
        fontSize: fontSize?.f16,
        fontFamily: font.semiBold,
        color: colors.black,
    },
    contentStyle: {
        paddingBottom: wp('35%')
    },
    readNotificationStyle: { borderRadius: wp("5%"), marginBottom: wp("5%") },
    unreadNotificationStyle: { borderRadius: wp("5%") }
});
