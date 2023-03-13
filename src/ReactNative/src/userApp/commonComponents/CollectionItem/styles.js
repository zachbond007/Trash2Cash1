import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    collectionContainer: {
        marginVertical: wp("2%"),
        padding: wp("3%"),
        backgroundColor: colors.white,
        borderRadius: wp("2%"),
    },
    collectionContainerItem: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
    collectionLeft: { flex: 0.65 },
    collectionRight: { flex: 0.3, alignItems: "flex-end" },
    collectionTitle: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.bold,
        paddingBottom: wp("2%"),
    },
    locationView: { flexDirection: "row" },
    icon: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",

        marginRight: wp("3%"),
    },
    dateView: { flexDirection: "row", paddingTop: wp("2%") },
    collectionHeaderView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: wp("3%"),
    },
    leftItemText: {
        fontSize: fontSize?.f13,
        color: colors.black,
        fontFamily: font.medium,
    },
    tagButton: (status) => ({
        flexDirection: "row",
        paddingVertical: wp("1%"),
        paddingHorizontal: wp("4%"),
        backgroundColor:
            status === 1 ? colors.chocolate : colors.hunterGreen,
        alignSelf: "flex-start",
        borderRadius: wp("5%"),
        alignItems: "center",
    }),
    statusIcon: {
        width: wp("4%"),
        height: wp("4%"),
        resizeMode: "contain",
        marginRight: wp("2%"),
    },
    statusText: (status) => ({
        fontSize: fontSize?.f12,
        color: status === 1 ? colors.orange1 : colors.green,
        fontFamily: font.medium,
    }),
    collectionRightImage: {
        width: wp("22%"),
        height: wp("20%"),
        borderRadius: wp("2%"),
    },
    pointView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: wp("3%"),
    },
    leftBottomView: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: wp("2%"),
    },
    pointText: {
        fontSize: fontSize?.f12,
        color: colors.black,
        fontFamily: font.medium,
    },
    tabText: {
        fontSize: fontSize?.f20,
        color: colors.black2,
        fontFamily: font.regular,
    },
    tabView: {
        width: wp("46%"),
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    titleText: {
        fontSize: fontSize?.f16,
        color: colors.black2,
        fontFamily: font.regular,
    },
});
