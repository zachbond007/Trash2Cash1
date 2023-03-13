import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    tabContainer: {
        marginLeft: wp("7%"),
        borderBottomColor: colors.grey2,
        borderBottomWidth: 1,
    },
    tabItems: {
        marginRight: wp("7%"), paddingBottom: wp("3%"),
        paddingTop: wp("5%"),
    },
    tabItemText: {
        fontSize: fontSize?.f17,
        color: colors.black2,
        fontFamily: font.regular,
    },
    marketItemView: {
        borderRadius: wp("5%"),
        marginBottom: wp("5%"),
        backgroundColor: "#F0E6D0",
    },
    marketImage: {
        width: "100%",
        height: wp("40%"),
        borderTopLeftRadius: wp("5%"),
        borderTopRightRadius: wp("5%"),
        backgroundColor: colors?.lightGrey,
    },
    marketDetailView: { flexDirection: "row", padding: wp("3%") },
    marketDetailLeft: { flex: 1.5 },
    marketDetailRight: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    voucherIcon: {
        width: wp("3%"),
        height: wp("3%"),
        marginRight: wp("1%"),
        resizeMode: "contain",
    },
    voucherView: {
        paddingHorizontal: wp("2%"),
        flexDirection: "row",
        paddingVertical: wp("1.5%"),
        backgroundColor: colors?.logout,
        alignItems: "center",
        borderRadius: wp("5%"),
    },
    locationView: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: wp("1%"),
    },
    marketNameText: {
        fontSize: fontSize?.f17,
        color: colors.black,
        fontFamily: font.semiBold,
    },
    locationText: {
        fontSize: fontSize?.f12,
        color: colors.black,
        fontFamily: font.medium,
    },
    locationIcon: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
        marginRight: wp("1%"),
    },
    voucherText: { fontSize: fontSize?.f13, color: colors.white },
    marketItemList: { paddingHorizontal: wp("5%"), marginVertical: wp("8%") },
    loaderView: { flex: 1, justifyContent: "center", alignItems: "center" },
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: wp("80%"),
    },
    imageStyle: { width: wp("20%"), height: wp("20%") },
    noDataFound: {
        fontFamily: font?.medium,
        fontSize: fontSize?.f20,
        marginTop: wp("5%"),
        color: colors.grey,
    },
});