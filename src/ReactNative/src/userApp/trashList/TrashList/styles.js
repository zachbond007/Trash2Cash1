import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    mapView: { flex: 1, justifyContent: "flex-end" },
    dropdownStyle: {
        width: "100%",
        borderColor: colors.lightGrey,
        borderRadius: wp("2.5%"),
        backgroundColor: colors.white,
    },
    dropdownTitle: {
        fontSize: fontSize?.f20,
        color: colors?.black,
        fontFamily: font?.semiBold,
    },
    dropdownContent: {
        padding: wp("5%"),
        backgroundColor: "rgba(244, 244, 244,0.4)",
    },
    orangePin: { height: wp("10%"), width: wp("10%") },
    radioButtonText: {
        fontSize: fontSize?.f16,
        color: colors?.black2,
        fontFamily: font?.medium,
        marginLeft: wp("1%"),
    },
    radioButtonView: { flexDirection: "column" },
    radioButton: { flex: 0.4, flexDirection: "row", alignItems: "center" },
    dropdownView: { flexDirection: "row", marginBottom: wp("4%") },
    searchTextInputView: {
        width: "100%",
        height: wp("15%"),
        borderRadius: wp("7%"),
        backgroundColor: "#F4F4F4",
        flexDirection: "row",
        paddingLeft: wp("5%"),
        marginVertical: wp("5%"),
    },
    searchTextInput: {
        width: "90%",
        height: wp("15%"),
        fontSize: fontSize.f16,
        color: colors.black,
        paddingLeft: wp("3%"),
    },
    searchIcon: { height: wp("7%"), width: wp("7%"), alignSelf: "center" },
    searchItem: { marginVertical: wp("1%") },
    searchText: {
        fontSize: fontSize?.f12,
        color: colors?.black2,
        fontFamily: font?.medium,
    },
    searchHeaderView: { marginVertical: wp("1.5%") },
    searchHeaderText: {
        fontSize: fontSize?.f14,
        color: colors.lightBlue2,
        fontFamily: font?.semiBold,
    },
    mapNotification: {
        fontSize: fontSize?.f16,
        color: colors.orange1,
        fontFamily: font?.semiBold,
        textAlign: "center",
        marginBottom: wp("8%"),
    },
    radioIcon: { height: wp("5%"), width: wp("5%"), resizeMode: "contain" },
    mapTopContentView: {
        position: "absolute",
        width: "100%",
        paddingHorizontal: wp("6%"),
        paddingTop: wp("13%"),
    },
    mapBottomContentView: {
        position: "absolute",
        bottom: wp("7%"),
        left: 0,
        right: 0,
        width: "100%",
        paddingHorizontal: wp("6%"),
    },
    locationItem: {
        borderRadius: wp("5%"),
        paddingHorizontal: wp("5%"),
        backgroundColor: colors.white,
        paddingVertical: wp("4%"),
    },
    locationItemCenter: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: wp("1%"),
        width: "95%",
    },
    locationItemCenterText: {
        fontSize: fontSize?.f12,
        color: colors.black,
        fontFamily: font?.medium,
    },
    calenderIcon: { height: wp("4%"), width: wp("4%"), marginRight: wp("3%") },
    rejectView: { flexDirection: "row", justifyContent: "space-between" },
    locationItemTitle: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font?.bold,
        marginBottom: wp("1%"),
    },
    rejectStyle: { width: wp("6%"), height: wp("6%") },
    locationButtonText: {
        fontSize: fontSize?.f18,
        color: colors.black,
        fontFamily: font.medium,
    },
    buttonView: {
        width: "100%",
        paddingVertical: wp("3%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp("6%"),
        marginTop: wp("4%"),
    },
    linearButtonView: {
        width: "90%",
        paddingVertical: wp("3%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp("6%"),
        marginTop: wp("4%"),
    },
    loaderView: { flex: 1, justifyContent: "center", alignItems: "center" },
});