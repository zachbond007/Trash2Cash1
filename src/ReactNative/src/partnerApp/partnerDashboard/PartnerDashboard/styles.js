import { StyleSheet } from "react-native";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    container: { flex: 1, paddingHorizontal: wp("4%") },
    flatlistContainer: { marginVertical: wp("3%") },
    footContainer: { height: wp("10") },
    collectionContainer: {
        marginVertical: wp("2%"),
        padding: wp("3%"),
        backgroundColor: colors.white,
        borderRadius: wp("2%"),
    }
});