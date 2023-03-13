import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { fontSize } from "../../constant/fontSize";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.mainView },
    tabText: {
        fontSize: fontSize?.f20,
        color: colors.black2,
        fontFamily: font.regular,
    },
    tabView: {
        width: wp("30.5%"),
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
    },
    tabContainer: { width: "100%", height: wp("14%"), marginVertical: wp("4%") },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: wp("4%"),
    },
    statusButton: {
        width: wp("34%"),
        paddingVertical: wp("2%"),
        borderRadius: wp("5%"),
        alignItems: "center",
        justifyContent: "space-between",
    },
    statusButtonText: {
        fontSize: fontSize?.f14,
        color: colors.black,
        fontWeight: "500",
    },
    friendLeftView: { flex: 0.2, justifyContent: "center" },
    friendRightContainer: {
        flex: 0.8,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.grey2,
        paddingVertical: wp("5%"),
        paddingLeft: wp("1%"),
        alignItems: "center",
    },
    friendCenterView: { flex: 0.6, justifyContent: "center" },
    friendRightView: {
        flex: 0.4,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: wp("3%"),
    },
    friendRequestRightView: {
        flexDirection: "row",
        flex: 0.3,
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    friendImage: {
        height: wp("17%"),
        width: wp("17%"),
        borderRadius: wp("8.5%"),
    },
    friendNameText: {
        fontSize: fontSize?.f18,
        fontFamily: font.bold,
        color: colors.black,
    },
    platformText: {
        fontSize: fontSize?.f12,
        fontFamily: font.medium,
        color: colors.black,
        paddingTop: wp("1%"),
    },
    completedButton: {
        width: wp("34%"),
        paddingVertical: wp("2%"),
        justifyContent: "space-between",
        borderRadius: wp("5%"),
        borderColor: colors.orange1,
        borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    completedButtonText: {
        fontSize: fontSize?.f14,
        color: colors.orange1,
        fontWeight: "500",
        marginRight: wp("2%"),
    },
    imageStyle: { width: wp("8%"), height: wp("8%") },
    noFriendContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    noFriendText: { color: "black" },
    tabMainView: { width: wp("92%"), alignSelf: "center" },
    searchTextInputView: {
        width: "100%",
        height: wp("12%"),
        borderRadius: wp("7%"),
        backgroundColor: "#F4F4F4",
        flexDirection: "row",
        paddingLeft: wp("5%"),
        marginVertical: wp("3%"),
    },
    searchTextInput: {
        width: "80%",
        height: wp("12%"),
        fontSize: fontSize.f16,
        color: colors.black,
        paddingLeft: wp("3%"),
    },
    searchIcon: { height: wp("5.5%"), width: wp("5.5%"), alignSelf: "center" },
    searchContainer: { paddingHorizontal: wp("4%") },
    searchFilterIcon: {
        height: wp("12%"),
        width: wp("12%"),
        alignSelf: "center",
    },
    modalStyle: { flex: 1, justifyContent: "flex-end" },
    horizontalLine: {
        width: wp("20%"),
        borderRadius: wp("5%"),
        backgroundColor: colors.grey1,
        height: wp("1.5%"),
        alignSelf: "center",
        marginVertical: wp("3%"),
    },
    modalContainer: {
        bottom: -wp("4.5%"),
        backgroundColor: colors.white,
        borderTopLeftRadius: wp("9%"),
        borderTopRightRadius: wp("9%"),
        width: wp("100%"),
        alignSelf: "center",
    },
    modalImageBackground: { flex: 1 },
    filterItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: wp("1%"),
    },
    toggleOnIcon: { height: wp("11%"), width: wp("15%"), resizeMode: "contain" },
    toggleOffIcon: { height: wp("11%"), width: wp("17%"), resizeMode: "contain" },
    filterItemModal: { paddingVertical: wp("10%"), paddingHorizontal: wp("6%") },
    filterItemText: {
        fontSize: fontSize?.f19,
        fontFamily: font.semiBold,
        color: colors.black,
    },
    filterHeadingText: {
        fontSize: fontSize?.f17,
        fontFamily: font.semiBold,
        color: colors.grey,
        marginBottom: wp("2%"),
    },
    checkIcon: { height: wp("3%"), width: wp("3%"), marginLeft: wp("3%") },
    loaderView: { flex: 1, justifyContent: "center", alignItems: "center" },
});