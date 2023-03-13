import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: { flex: 1 },
    hotspotIcon: { height: wp("10%"), width: wp("10%") },
    buttonContainer: {
        marginBottom: wp("15%"),
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
    }
});