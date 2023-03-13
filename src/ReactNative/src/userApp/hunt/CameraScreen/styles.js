import { StyleSheet } from "react-native";

// Third Party
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { fontSize } from "../../../constant/fontSize";

export const styles = StyleSheet?.create({
    container: { flex: 1 },
    camerastyle: {
        flex: 1,
        justifyContent: "flex-end",
        width: wp("95%"),
        alignSelf: "center",
        borderRadius: 30,
    },
    clickView: { justifyContent: "center", alignItems: "center" },
    clickIcon: { width: wp("15%"), height: wp("15%"), marginBottom: wp("4%") },
    submitview: { marginVertical: wp("6%"), justifyContent: "flex-end" },
    cameraMainView: {
        flex: 1,
        borderRadius: 30,
        marginTop: wp("5%"),
        marginHorizontal: wp("4%"),
        overflow: "hidden",
    },
    deleteMediaStyle: {
        fontSize: fontSize?.f16,
        fontFamily: font?.medium,
        color: colors?.red,
        textAlign: "center",
        marginTop: wp("3%"),
    },
});