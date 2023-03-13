import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp, } from "react-native-responsive-screen";

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
        paddingVertical: wp("10%"),
        paddingHorizontal: wp("5%"),
    },
    container: { flex: 1, paddingHorizontal: wp("4%") },
    locationItem: {
        borderRadius: wp("5%"),
        paddingHorizontal: wp("5%"),
        backgroundColor: colors.white,
        paddingVertical: wp("4%"),
        shadowColor: colors["grey-500"],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        elevation: 4,
    },
    locationItemCenter: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: wp("1%"),
    },
    locationItemCenterText: {
        fontSize: fontSize?.f12,
        color: colors.black,
        fontFamily: font?.medium,
    },
    calenderIcon: { height: wp("4%"), width: wp("4%"), marginRight: wp("3%") },
    locationItemTitle: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font?.bold,
        marginBottom: wp("1%"),
    },
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
});