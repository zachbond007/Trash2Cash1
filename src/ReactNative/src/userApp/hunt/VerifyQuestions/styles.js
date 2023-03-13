import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    container1: { bottom: 0, position: "absolute", right: 0, left: 0 },
    container: { bottom: 40, position: "absolute", right: 0, left: 0 },
    loaderView: { flex: 1, justifyContent: "center", alignItems: "center" },
    mainContainerLoading: { flex: 1 },
    mainContainer: { flex: 1 },
    greyHRlines: {
        backgroundColor: "white",
        borderTopLeftRadius: wp("10%"),
        borderTopRightRadius: wp("10%"),
    },
    questionMainView: {
        backgroundColor: "colors?.grey1",
        height: 5,
        width: wp("20%"),
        alignSelf: "center",
        borderRadius: 10,
        marginTop: wp("3%"),
    },
    questionSubView: {
        width: wp("85%"),
        alignSelf: "center",
        marginTop: wp("3%"),
        flexGrow: 1,
    },
    questionSubMainView: { marginVertical: wp("1.5%") },
    submitMainView: { marginVertical: wp("7%") },
    titleTextStyle: {
        marginTop: wp("6%"),
        fontFamily: font?.semiBold,
        fontSize: fontSize?.f16,
        color: colors?.black,
    },
    optionsMainView: {
        flexDirection: "row",
        flexGrow: 1,
        width: wp("90%"),
        flexWrap: "wrap",
    },
    optionSubView: { marginTop: wp("4%") },
    optionView: { flexDirection: "row", alignItems: "center" },
    imageView: { width: wp("5%"), height: wp("5%") },
    optionsTitleText: {
        fontFamily: font?.medium,
        fontSize: fontSize?.f14,
        color: colors?.black,
        marginLeft: wp("3%"),
    },
    dropdownView: {
        marginVertical: wp("2%"),
    },
});