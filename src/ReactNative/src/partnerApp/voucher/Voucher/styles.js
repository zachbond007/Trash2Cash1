import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    voucherItem: {
        padding: wp("4%"),
        borderRadius: wp("4%"),
        backgroundColor: colors.white,
        marginVertical: wp("2%"),
    },
    voucherTitleView: {
        width: wp("90%"),
        alignSelf: "center",
        marginVertical: wp("2%"),
    },
    voucherTitle: {
        color: colors?.black,
        fontSize: fontSize?.f22,
        fontFamily: font?.bold,
    },
    voucherTopView: { flexDirection: "row" },
    voucherTopLeftView: { flex: 0.9, flexDirection: "row", alignItems: "center" },
    voucherTopRightView: {
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    shareIcon: {
        height: wp("8%"),
        width: wp("8%"),
        resizeMode: "contain",
        marginRight: wp("4%"),
    },
    deleteIcon: { height: wp("8%"), width: wp("8%"), resizeMode: "contain" },
    voucherBottomView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: wp("1%"),
    },
    clockIcon: { height: wp("5%"), width: wp("5%"), resizeMode: "contain" },
    voucherCodeTitle: {
        fontSize: fontSize?.f11,
        color: colors.black,
        fontFamily: font.medium,
    },
    voucherCodeValue: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.bold,
    },
    timeText: {
        fontSize: fontSize?.f14,
        color: colors.black,
        fontFamily: font.medium,
        marginLeft: wp("3%"),
    },
    voucherList: { paddingHorizontal: wp("4%"), height: "65%" },
    tabContainer: { width: "100%", marginHorizontal: wp("4%") },
    tabText: {
        fontSize: fontSize?.f20,
        color: colors.black2,
        fontFamily: font.regular,
    },
    tabView: {
        width: wp("46%"),
        justifyContent: "center",
        alignItems: "center",
        height: wp("12%"),
    },
    usedvoucherItem: {
        padding: wp("5%"),
        borderRadius: wp("4%"),
        backgroundColor: colors.white,
        marginVertical: wp("2%"),
        flexDirection: "row",
    },
    usedredeemIcon: { height: wp("15%"), width: wp("15%"), alignSelf: "center" },
    usedvoucherRightView: { marginLeft: wp("6%"), justifyContent: "center" },
    usedvoucherRightTop: { flexDirection: "row", alignItems: "center" },
    usedvoucherCodeTitle: {
        fontSize: fontSize?.f11,
        color: colors.black,
        fontFamily: font.medium,
    },
    usedvoucherCodeValue: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.bold,
    },
    usedvoucherBottomView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: wp("1%"),
    },
    usedscanIcon: { height: wp("3%"), width: wp("3%"), resizeMode: "contain" },
    usedtimeText: {
        fontSize: fontSize?.f14,
        color: colors.black,
        fontFamily: font.medium,
        marginLeft: wp("3%"),
    },
    searchInputView: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey3,
        paddingVertical: wp("6%"),
    },
    searchTextInputInputView: {
        height: wp("14%"),
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.grey3,
        borderRadius: wp("3%"),
        marginHorizontal: wp("4%"),
        paddingHorizontal: wp("4%"),
        marginBottom: wp("2%"),
    },
    searchTextInput: {
        flex: 0.8,
        fontSize: fontSize?.f14,
        color: colors.black,
        fontFamily: font.medium,
    },
    verifyButton: { flex: 0.2, alignItems: "flex-end", justifyContent: "center" },
    verifyButtonText: {
        fontSize: fontSize?.f14,
        color: colors.lightBlue2,
        fontFamily: font.semiBold,
    },
    createPostToggle: {
        position: "absolute",
        right: 0,
        bottom: wp("16%"),
        zIndex: 1,
    },
});