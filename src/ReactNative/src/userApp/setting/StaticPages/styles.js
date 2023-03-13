import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { colors } from "../../../constant/colors";

export const styles = StyleSheet?.create({
    itemMainView: {
        alignSelf: "center",
        marginTop: wp("12%"),
        justifyContent: "space-between",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors?.white,
    },
    container: { flex: 1 },
    containerStyle: { flex: 1, marginTop: wp("5") },
    activityIndicator: { marginTop: wp("5%") }
});