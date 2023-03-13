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
        padding: wp("7%"),
        borderTopLeftRadius: wp("12%"),
        borderTopRightRadius: wp("12%"),
        marginTop: wp("-10%"),
    },
    container: { flex: 1, paddingHorizontal: wp("4%") },
    collectionItem: {
        flexDirection: "row",
        padding: wp("4%"),
        backgroundColor: colors.white,
        borderRadius: wp("3%"),
        shadowColor: "#0000000D",
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.9,
    },
    directionRow: { flexDirection: "row" },
    collectionLeft: { justifyContent: "center", flex: 2 },
    collectionRight: {
        justifyContent: "flex-end",
        flexDirection: "row",
        flex: 1,
    },
    locationView: { flexDirection: "row", marginHorizontal: 5 },
    calenderView: {
        flexDirection: "row",
        marginTop: wp("2%"),
        alignItems: "center",
        marginHorizontal: 5,
    },

    collectionTitle: {
        fontSize: fontSize?.f15,
        color: colors.black,
        fontFamily: font.bold,
        paddingBottom: wp("2%"),
    },

    icon: {
        width: wp("4%"),
        height: wp("4%"),
        resizeMode: "contain",
        marginRight: wp("3%"),
    },
    dateView: { flexDirection: "row", paddingTop: wp("2%") },

    leftItemText: {
        fontSize: fontSize?.f13,
        color: colors.black,
        fontFamily: font.medium,
        width: wp("40%"),
    },
    pointView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: wp("1%"),
        marginTop: wp("4%"),
        width: wp("80%"),
    },
    pointText: {
        fontSize: fontSize?.f12,
        color: colors.black,
        fontFamily: font.medium,
    },
    bagFullText: {
        fontSize: fontSize?.f12,
        color: "#0191B4",
        fontFamily: font.medium,
        marginLeft: wp("15%"),
    },
    tagButton: (status) => ({
        flexDirection: "row",
        paddingVertical: wp("1%"),
        paddingHorizontal: wp("4%"),
        backgroundColor:
            status === 1 ? colors.chocolate : colors.hunterGreen,
        alignSelf: "flex-start",
        borderRadius: wp("5%"),
        alignItems: "center",
    }),
    statusIcon: {
        width: wp("4%"),
        height: wp("4%"),
        resizeMode: "contain",
        marginRight: wp("2%"),
    },
    statusText: (status) => ({
        fontSize: fontSize?.f12,
        color: status === 1 ? colors.orange1 : colors.green,
        fontFamily: font.medium,
    }),

    imageView: {
        height: wp("50%"),
        resizeMode: "cover",
        borderTopLeftRadius: wp("10%"),
        borderTopRightRadius: wp("5%"),
        borderBottomRightRadius: wp("10%"),
        borderBottomLeftRadius: wp("5%"),
        marginVertical: wp("2%"),
    },
    huntImageView: { marginVertical: wp("2%") },
});