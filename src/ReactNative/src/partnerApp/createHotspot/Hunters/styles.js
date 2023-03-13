import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    welcomeView: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: wp("7%"),
        marginBottom: wp("6%"),
    },
    welcometext: {
        color: colors?.black,
        fontSize: fontSize?.f30,
        fontFamily: font?.semiBold,
    },
    huntersItemView: {
        paddingVertical: wp("2%"),
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    profileImageView: {
        height: wp("16%"),
        width: wp("16%"),
        borderRadius: wp("8%"),
    },
    hunterNameText: {
        color: colors?.black,
        fontSize: fontSize?.f20,
        fontFamily: font?.semiBold,
    },
    hunterNameView: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: wp("4%"),
    },
    hunterlist: { marginHorizontal: wp("5%"), marginBottom: wp("3%") },
});