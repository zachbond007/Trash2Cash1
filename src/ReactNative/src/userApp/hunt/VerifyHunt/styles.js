import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    mainContainer: { backgroundColor: colors?.mainView, flex: 1 },
    questionSubView: {
        width: wp("85%"),
        alignSelf: "center",
        marginTop: wp("3%"),
        flexGrow: 1,
    },
    submitMainView: { marginTop: wp("8%") },
    titleTextStyle: {
        marginTop: wp("6%"),
        fontFamily: font?.semiBold,
        fontSize: fontSize?.f16,
        color: colors?.black,
    },
    optionsMainView: { flexDirection: "row", flexGrow: 1 },
    optionSubView: { marginVertical: wp("4%") },
    optionView: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: wp("12%"),
    },
    imageView: { width: wp("5%"), height: wp("5%") },
    optionsTitleText: {
        fontFamily: font?.medium,
        fontSize: fontSize?.f14,
        color: colors?.black,
        marginLeft: wp("3%"),
    },
    cardMainView: {
        width: wp("85%"),
        height: wp("20%"),
        alignSelf: "center",
        backgroundColor: colors?.white,
        borderRadius: wp("3%"),
        marginTop: wp("8%"),
        justifyContent: "center",
        shadowColor: "#c0c0c0",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    cardItemView: {
        flexDirection: "row",
        alignItems: "center",
        width: wp("80%"),
        alignSelf: "center",
        marginTop: wp("2%"),
        marginBottom: wp("2%"),
    },
    itemImageStyle: { width: wp("4%"), height: wp("4%") },
    calenderImageStyle: { width: wp("4%"), height: wp("3.5%") },
    itemTextStyle: {
        fontSize: fontSize?.f12,
        color: colors?.black,
        fontFamily: font?.medium,
        marginLeft: wp("2%"),
    },
    trashImageView: {
        width: wp("85%"),
        alignSelf: "center",
        marginTop: wp("5%"),
        flexGrow: 1,
    },
    trashImage: {
        width: wp("85%"),
        height: wp("55%"),
        borderTopLeftRadius: wp("10%"),
        borderTopRightRadius: wp("5%"),
        borderBottomLeftRadius: wp("5%"),
        borderBottomRightRadius: wp("10%"),
    },
    spacingView: { height: wp("5%"), backgroundColor: colors?.mainView }
});