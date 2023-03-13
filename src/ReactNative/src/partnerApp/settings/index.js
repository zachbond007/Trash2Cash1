import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

// Third Party
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// Constants
import { styles } from './styles';
import { types } from '../../action/ActionType';
import { message } from '../../constant/message';
import NavigationService from '../../routing/NavigationService';
import SettinghItemCard from '../../userApp/setting/Itemcard';
import HeaderSection from '../../userApp/commonComponents/HeaderSection';


const PartnerSettings = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const authReducer = useSelector((state) => state?.authReducer)

    const finallyLogout = async () => {
        dispatch({
            type: types.USER_LOGOUT,
            payload: {}
        })
    }
    const onLogoutPress = () => {
        Alert.alert(
            "LOGOUT",
            "Do you really want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => finallyLogout() }
            ]
        );
    }

    const onDeletePress = () => {
        Alert.alert(
            "DELETE ACCOUNT",
            "Do you really want to Delete Account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => finallyDeleteAccount() }
            ]
        );
    }
    const finallyDeleteAccount = async () => {
        dispatch({
            type: types.USER_DELETE_ACCOUNT,
            payload: {}
        })

    }


    return (
        <View style={styles?.mainContainer} >
            <HeaderSection title={'Settings'} backButton={true} on onBackPress={() => navigation.goBack()} />

            {/* Settings items */}

            {authReducer?.registrationLoader ?
                <View style={styles?.loadreView} >

                    <ActivityIndicator color={colors.appBlueColor} />
                </View>
                :
                <View style={styles?.itemMainView} >
                    <SettinghItemCard title={message?.changepassword} onPress={() => NavigationService?.navigate('ChangePassword')} />
                    <SettinghItemCard title={message?.aboutUs} onPress={() => NavigationService?.navigate("StaticPages", { type: 1 })} />
                    <SettinghItemCard title={message?.contactUs} onPress={() => NavigationService?.navigate("StaticPages", { type: 2 })} />
                    <SettinghItemCard title={message?.termspolicy} onPress={() => NavigationService?.navigate("StaticPages", { type: 3 })} />
                    <SettinghItemCard title={`Delete Account`} onPress={() => onDeletePress()} />
                    {/* logout  */}
                    <TouchableOpacity onPress={() => onLogoutPress()} style={styles.touchStyle}  >
                        <View style={styles?.textMainView} >
                            <Text style={styles?.titleStyle} >{message?.logout}</Text>
                        </View>

                        <View style={styles?.iconView} >
                            <Image source={require('../../assets/icons/logout.png')} resizeMode='contain' style={styles?.toggleStyle} />
                        </View>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.emptyView} >
            </View>
        </View>
    )
}

export default PartnerSettings;