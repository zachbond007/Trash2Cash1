import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    container: { flex: 1 },
    titleCostView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: wp("1%"),
    },
    titleView: { flex: 0.7 },
    costView: { flex: 0.3, alignItems: "flex-end" },
    titleText: {
        color: colors?.black,
        fontSize: fontSize?.f20,
        fontFamily: font?.bold,
    },
    costText: {
        color: colors?.lightBlue2,
        fontSize: fontSize?.f15,
        fontFamily: font?.bold,
    },
    subCategoryText: {
        color: colors?.black,
        fontSize: fontSize?.f15,
        fontFamily: font?.regular,
        marginVertical: wp("1%"),
    },
    buttonTagView: { flexDirection: "row", marginTop: wp("2%") },
    validButtonView: {
        paddingVertical: wp("2%"),
        paddingHorizontal: wp("5%"),
        backgroundColor: colors.chocolate,
        alignSelf: "flex-start",
        borderRadius: wp("5%"),
    },
    buttonTitleStyle: {
        fontSize: fontSize?.f16,
        color: colors.orange1,
        fontFamily: font.regular,
    },
    buyButtonStyle: {
        paddingVertical: wp("2%"),
        borderRadius: wp("5%"),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("10%"),
        marginLeft: wp("5%"),
    },
    buyButtonTitle: {
        fontSize: fontSize?.f16,
        color: colors.black,
        fontFamily: font.regular,
    },
    subscriptionItem: {
        padding: wp("5%"),
        borderRadius: wp("5%"),
        backgroundColor: colors.white,
        marginVertical: wp("2%"),
    },
    subscriptionList: { paddingHorizontal: wp("5%"), marginVertical: wp("7%") },
});
