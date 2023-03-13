import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: wp("80%"),
    },
    imageStyle: { width: wp("20%"), height: wp("20%") },
    noDataFound: {
        fontFamily: font?.medium,
        fontSize: fontSize?.f20,
        marginTop: wp("5%"),
        color: colors.grey,
    },
});