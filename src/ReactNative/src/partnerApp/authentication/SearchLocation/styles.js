import { StyleSheet } from "react-native";

// Constants
import { colors } from "../../../constant/colors";

// Third Party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center" },
    mainView: {
        width: wp("90%"),
        height: hp("80%"),
        marginTop: wp("4%"),
        backgroundColor: colors.white,
    }
})