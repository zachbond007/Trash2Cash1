import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    container: { flex: 1, paddingHorizontal: wp("4%") },
    collectionContainer: {
        marginVertical: wp("2%"),
        padding: wp("3%"),
        backgroundColor: colors.white,
        borderRadius: wp("2%"),
    },
    collectionContainerItem: { flexDirection: "row", flex: 1 },
    collectionLeft: { flex: 2 },
    collectionRight: { flex: 1, alignItems: "flex-end" },
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
        paddingVertical: wp("2%"),
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
            status === "Pending" ? colors.chocolate : colors.hunterGreen,
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
        color: status === "Pending" ? colors.orange1 : colors.green,
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
        marginLeft: wp("5%"),
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
    filterView: { flexDirection: "row", alignItems: "center" },
    filterIcon: {
        height: wp("4%"),
        width: wp("4%"),
        resizeMode: "contain",
        marginLeft: wp("2%"),
    },
    modalStyle: { flex: 1, justifyContent: "flex-end" },
    filterText: {
        fontSize: fontSize?.f20,
        color: colors.black,
        fontFamily: font.semiBold,
    },
    filterText1: { color: colors?.black },
    filterItem: { paddingVertical: wp("3%"), paddingHorizontal: wp("10%") },
    horizontalLine: {
        width: wp("20%"),
        borderRadius: wp("5%"),
        backgroundColor: colors.grey1,
        height: wp("1.5%"),
        alignSelf: "center",
        marginVertical: wp("3%"),
    },
    modalContainer: {
        bottom: -wp("3%"),
        backgroundColor: colors.white,
        borderTopLeftRadius: wp("9%"),
        borderTopRightRadius: wp("9%"),
        width: wp("100%"),
        alignSelf: "center",
    },
    tabContainer: { width: "100%", height: wp("14%"), marginVertical: wp("4%") },
    filterListStyle: { paddingVertical: wp("10%") },
    radioContainer: {
        height: wp("14%"),
        backgroundColor: "rgba(26, 166, 191,0.2)",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp("11%"),
        borderRadius: wp("10%"),
    },
    radioIcon: {
        height: wp("5%"),
        width: wp("5%"),
        resizeMode: "contain",
        marginRight: wp("4%"),
    },
    radioText: {
        fontSize: fontSize?.f16,
        color: colors.black2,
        fontFamily: font.semiBold,
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    modalImageBackground: { flex: 1 },
    rewardImage: {
        height: wp("25%"),
        width: wp("25%"),
        alignSelf: "center",
        marginBottom: wp("6%"),
    },
    rewardView: { alignItems: "center", paddingVertical: wp("6%") },
    rewardTitle: {
        fontSize: fontSize?.f20,
        fontFamily: font.bold,
        color: colors.black,
    },
    rewardContent: {
        fontSize: fontSize?.f16,
        fontFamily: font.regular,
        color: colors.grey,
        textAlign: "center",
        paddingVertical: wp("3%"),
    },
    rewardButton: { marginVertical: wp("6%") },
    okButtonText: {
        fontSize: fontSize?.f22,
        fontFamily: font.medium,
        color: colors.black,
    },
    createPostToggle: {
        position: "absolute",
        right: 0,
        bottom: wp("16%"),
        zIndex: 1,
    },
    createPostIcon: { height: wp("27%"), width: wp("27%") },
    loaderView: { flex: 1, justifyContent: "center", alignItems: "center" },
    flatListContainer: { marginBottom: wp("3%") }
});