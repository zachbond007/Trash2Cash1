import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    reviewItemView: {
        flexDirection: "row",
        marginVertical: wp("2%"),
        padding: wp("4%"),
        shadowColor: colors["grey-100"],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        borderRadius: wp("4%"),
        backgroundColor: colors.white,
    },
    imageView: {
        flex: 0.3,
    },
    profileImageView: {
        height: wp("18%"),
        width: wp("18%"),
        borderRadius: wp("9%"),
    },
    reviewNameView: { flex: 0.5 },
    reviewRightIconView: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
    starIcon: { height: wp("4%"), width: wp("4%"), marginRight: wp("2%") },
    ratingCount: {
        fontSize: fontSize?.f14,
        color: colors.black,
        fontFamily: font.medium,
        alignSelf: "center",
        marginTop: wp("1%"),
    },
    reviewNameText: {
        fontSize: fontSize?.f18,
        color: colors.black,
        fontFamily: font.bold,
    },
    reviewText: {
        fontSize: fontSize?.f12,
        color: colors.black,
        fontFamily: font.medium,
        marginTop: wp("2%"),
    },
    iconView: { flexDirection: "row", alignItems: "center" },
    rateReviewList: { paddingHorizontal: wp("5%"), marginVertical: wp("4%") },
    loaderView: { flex: 1, justifyContent: "center", alignItems: "center" },
});