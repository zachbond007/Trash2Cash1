import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    mainDropdownView: {
        borderWidth: 1,
        width: "100%",
        borderColor: colors.lightGrey,
        borderRadius: wp("2.5%"),
    },
    dropdownView: {
        height: wp("14%"),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("4%"),
    },
    dropdownValue: {
        width: "75%",
    },
    dropdownIconView: {
        width: "25%",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
    },
    dropdownIcon: {
        height: wp("4%"),
        width: wp("4%"),
    },
    dropdownText: {
        fontSize: fontSize?.f16,
        color: colors?.grey,
        fontFamily: font?.semiBold,
    },
    dropdownDataItem: { paddingVertical: wp("2%") },
    dropdownItemList: { paddingHorizontal: wp("4%") },
    dropdownRightIconText: {
        fontSize: fontSize?.f12,
        color: colors?.black,
        fontFamily: font?.medium,
        marginRight: wp("2%"),
    },
    itemStyle: {
        color: colors?.black,
        fontFamily: font?.semiBold,
        fontSize: fontSize?.f16,
    }
});