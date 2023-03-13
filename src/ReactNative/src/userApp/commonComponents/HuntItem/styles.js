import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    mapView: { flex: 1, justifyContent: "flex-end" },
    modalView: {
        backgroundColor: colors.white,
        borderTopLeftRadius: wp("12%"),
        borderTopRightRadius: wp("12%"),
        marginTop: wp("-10%"),
    },
    container: { flex: 1, paddingHorizontal: wp("4%") },
    huntItem: {
        padding: wp("4%"),
        backgroundColor: colors.white,
        borderRadius: wp("3%"),
        marginVertical: wp("2%"),
        shadowColor: "#0000000D",
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.9,
    },
    huntLeft: { width: "100%" },
    huntTitleView: { flexDirection: "row", flex: 1 },
    huntTitleLeft: { flex: 0.7 },
    huntTitleRight: {
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    huntRight: {
        paddingTop: wp("1%"),
        justifyContent: "flex-end",
        flexDirection: "row",
        flex: 1,
    },
    dateView: { flexDirection: "row", alignItems: "center" },
    timeView: {
        flexDirection: "row",
        marginLeft: wp("5%"),
        alignItems: "center",
    },
    calenderView: {
        flexDirection: "row",
        marginTop: wp("2%"),
        alignItems: "center",
    },
    icon: {
        width: wp("4%"),
        height: wp("4%"),
        resizeMode: "contain",
        marginRight: wp("3%"),
    },
    dropdownView: { marginVertical: wp("2%") },
    horizontalLine: {
        width: wp("18%"),
        height: wp("1%"),
        alignSelf: "center",
        backgroundColor: colors.grey1,
        borderRadius: wp("4%"),
        marginTop: wp("3%"),
    },
    textInputView: { padding: wp("7%") },
    dateIcon: {
        width: wp("4%"),
        height: wp("4%"),
        resizeMode: "contain",
        marginRight: wp("2%"),
    },
    dateTimeView: { flexDirection: "row", marginVertical: wp("1%") },
    tagButton: {
        flexDirection: "row",
        paddingVertical: wp("1%"),
        paddingHorizontal: wp("4%"),
        alignSelf: "flex-start",
        borderRadius: wp("5%"),
        alignItems: "center",
    },
    statusIcon: {
        width: wp("4%"),
        height: wp("4%"),
        resizeMode: "contain",
        marginRight: wp("2%"),
    },
    statusText: {
        fontSize: fontSize?.f12,
        color: colors.green,
        fontFamily: font.medium,
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
    huntTitle: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.bold,
        paddingBottom: wp("2%"),
    },
    leftItemText: {
        fontSize: fontSize?.f10,
        color: colors.black,
        fontFamily: font.medium,
    },
    voucherEditIcon: {
        width: wp("7%"),
        height: wp("7%"),
        resizeMode: "contain",
        marginRight: wp("2%"),
    },
    voucherDeleteIcon: {
        width: wp("7%"),
        height: wp("7%"),
        resizeMode: "contain",
    },
});
