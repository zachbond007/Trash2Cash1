import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


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
    collectionItemContainer: { padding: wp("6%") },
    collectionItem: {
        padding: wp("6%"),
        backgroundColor: colors.white,
        borderRadius: wp("3%"),
        shadowColor: "#c0c0c0",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 3,
    },
    collectionLeft: { width: "80%" },
    collectionRight: {
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
    textInputView: { paddingHorizontal: wp("7%"), paddingVertical: wp("12%") },
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
        backgroundColor: colors.chocolate,
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
        color: colors.orange1,
        fontFamily: font.medium,
    },
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
    collectionTitle: {
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
    gpsIcon: {
        width: wp("35%"),
        height: wp("35%"),
        resizeMode: "contain",
        position: "absolute",
        right: 0,
        bottom: wp("15%"),
    },
});
