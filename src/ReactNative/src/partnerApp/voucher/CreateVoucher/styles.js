import { StyleSheet } from "react-native";
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    container: { flex: 1 },
    mainView: { paddingTop: wp("7%") },
    fromToView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: wp("6.5%"),
        marginVertical: wp("2%"),
    },
    fromToTextInput: {
        flex: 0.9,
        paddingTop: wp("4%"),
        paddingLeft: wp("5%"),
        fontSize: fontSize?.f18,
        color: colors.black,
        fontFamily: font?.semiBold,
        paddingRight: wp("2%"),
    },
    fromToTextInputView: {
        width: wp("42%"),
        height: wp("14%"),
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.lightGrey,
        borderRadius: wp("2.5%"),
    },
    calenderIcon: { width: wp("6%"), height: wp("6%"), alignSelf: "center" },
    tooltipMain: {
        position: "absolute",
        right: 8.5,
        top: 12,
        zIndex: 2,
    },
    tooltipImageStyle: {
        width: wp("4%"),
        height: wp("4%"),
        overlayColor: "red",
    },
    tooltipStyle: {
        position: "absolute",
        right: 40,
        top: 123,
        zIndex: 2,
    },
    tooltipImage1: {
        width: wp("4%"),
        height: wp("4%"),
        tintColor: "#137644",
    },
    tooltipImage: { width: wp("4%"), height: wp("4%"), opacity: 0.5 },
    tooltipTextView: {
        backgroundColor: "white",
        width: wp("50%"),
        padding: wp("3%"),
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: wp("2%"),
        position: "absolute",
        top: 20,
        left: -190,
        shadowColor: colors["grey-100"],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        elevation: 4,
    },
    tooltipText1: { textAlign: "center" },
    tooltipText: {
        backgroundColor: "white",
        width: wp("50%"),
        padding: wp("3%"),
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: wp("2%"),
        position: "absolute",
        top: 20,
        right: -15,
        shadowColor: colors["grey-100"],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        elevation: 4,
    },
    textInputView: { marginBottom: wp("2%") },
    dropdownView: { marginHorizontal: wp("6.5%"), marginVertical: wp("2%") },
    buttonView: { marginTop: wp("10%"), marginBottom: wp("6%"), zIndex: 1 },
    voucherTopView: { flexDirection: "row", alignItems: "center" },
    voucherTopLeft: { flex: 1, justifyContent: "center" },
    voucherTopRight: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    voucherBottomView: {
        flexDirection: "row",
        marginTop: wp("1%"),
        alignItems: "center",
    },
    clockIcon: { height: wp("4%"), width: wp("4%"), marginRight: wp("2%") },
    pointText: {
        fontSize: fontSize?.f16,
        color: colors.black,
        fontFamily: font?.semiBold,
    },
    shopNameText: {
        fontSize: fontSize?.f14,
        color: colors.orange1,
        fontFamily: font?.semiBold,
        marginTop: wp(1),
    },
    timeText: {
        fontSize: fontSize?.f14,
        color: colors.black,
        fontFamily: font?.light,
    },
    voucherItem: {
        paddingVertical: wp("3%"),
        paddingHorizontal: wp("5%"),
        borderRadius: wp("3%"),
        backgroundColor: colors.white,
        marginVertical: wp("2%"),
        marginHorizontal: wp("6.5%"),
    },
    voucherItemList: { marginBottom: wp("6.5%") },
    voucherHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: wp("3%"),
        marginBottom: wp("2%"),
        marginHorizontal: wp("6.5%"),
    },
    voucherHeaderText: {
        fontSize: fontSize?.f17,
        color: colors.logout,
        fontFamily: font?.bold,
    },
});