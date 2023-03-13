import { StyleSheet } from "react-native";

// Constants
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { fontSize } from "../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    marketImageView: { flex: 4, marginTop: wp("3") },
    marketImage: {
        width: "100%",
        height: "97%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    marketDetailView: {
        flex: 6,
        borderTopLeftRadius: wp("8%"),
        borderTopRightRadius: wp("8%"),
        backgroundColor: colors.white,
        marginTop: wp(-12),
    },
    marketNameView: { flexDirection: "row", alignItems: "center" },
    marketNameText: {},
    voucherItemContainer: {
        flexDirection: "row",
        marginVertical: wp("3%"),
        padding: wp("4%"),
        borderRadius: wp("4%"),
        backgroundColor: colors.white,
        shadowColor: "#0000000D",
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.9,
    },

    locationView: {
        flexDirection: "row",
        paddingTop: wp("2%"),
    },
    locationIcon: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
        marginRight: wp("1.5%"),
        marginTop: wp("1%"),
        alignItems: "center",
    },
    descriptionView: { marginLeft: 10 },
    pendingIcon: {
        width: wp("6%"),
        height: wp("6%"),
        resizeMode: "contain",
        marginRight: wp("1%"),
    },
    marketNameLeftView: { flex: 2.1 },
    marketNameRightView: { alignItems: "flex-end", flex: 1 },
    editIcon: { height: wp("10%"), width: wp("10%") },
    directionColumn: { flexDirection: "column" },
    marketNameRightView2: {
        flex: 0.8,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    shareView: {
        marginRight: wp("3%"),
        width: wp("7%"),
        height: wp("7%"),
    },
    reviewTag: {
        backgroundColor: "#FFF1E7",
        paddingVertical: wp("2%"),
        paddingHorizontal: wp("2%"),
        borderTopLeftRadius: wp("1%"),
        borderTopRightRadius: wp("4%"),
        borderBottomRightRadius: wp("1%"),
        borderBottomLeftRadius: wp("4%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: wp("16%"),
        marginRight: wp("5%"),
    },
    voucherButtonStyle: {
        paddingVertical: wp("2%"),
        width: wp("20%"),
        borderRadius: wp("4%"),
        alignItems: "center",
        justifyContent: "center",
    },
    marketNameText: {
        fontSize: fontSize?.f24,
        color: colors.black,
        fontFamily: font.bold,
    },
    locationText: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.medium,
    },
    marketDescriptionText: {
        fontSize: fontSize?.f14,
        color: colors.black,
        fontFamily: font.regular,
    },
    reviewText: {
        fontSize: fontSize?.f12,
        color: colors.orange1,
        fontFamily: font.medium,
    },
    starIcon: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
        marginRight: wp("2%"),
    },
    timeText: {
        fontSize: fontSize?.f14,
        color: colors.black,
        fontFamily: font.light,
        alignSelf: "center",
    },
    pointsText: {
        fontSize: fontSize?.f16,
        color: colors.black,
        fontFamily: font.semiBold,
    },
    voucherText: {
        fontSize: fontSize?.f17,
        color: colors.logout,
        fontFamily: font.bold,
        textAlignVertical: "top",
        marginTop: wp("1%"),
    },
    VoucherHeaderStyle: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: wp("9%"),
        alignItems: "center",
        marginBottom: wp("4%"),
    },
    voucherHeaderComponent: {
        flexDirection: "row",
        alignItems: "center",
    },
    voucherListStyle: { marginVertical: wp("8%"), paddingHorizontal: wp("5%") },
    voucherShareIcon: {
        width: wp("7%"),
        height: wp("8%"),
        resizeMode: "contain",
        marginRight: wp("4%"),
    },
    deleteView: {
        marginRight: wp("3%"),
        width: wp("8%"),
        height: wp("7%"),
    },
    editView: {
        marginTop: wp("4%"),
        marginRight: wp("3%"),
        width: wp("8%"),
        height: wp("7%"),
        alignSelf: "flex-end",
    },
    voucherDeleteIcon: {
        width: wp("7%"),
        height: wp("7%"),
        resizeMode: "contain",
        marginRight: wp("3%"),
    },

    categoryTitle: {
        fontSize: fontSize?.f16,
        color: colors.grey,
        fontFamily: font.semiBold,
        marginVertical: wp("2%"),
    },
    categoryText: {
        fontSize: fontSize?.f16,
        color: colors.orange1,
        fontFamily: font.semiBold,
    },
    voucherDescription: {
        fontFamily: font.regular,
        fontSize: fontSize?.f10,
        color: colors.black,
        opacity: 0.5,
    },
});