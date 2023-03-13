import React, { useState, useCallback } from "react";
import { View, Text, Platform, Image, TouchableOpacity, FlatList, TextInput } from "react-native";

// Third Party
import moment from "moment";
import Share from "react-native-share";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { vouchersTab } from "../../../constant/staticData";
import NavigationService from "../../../routing/NavigationService";
import NoDataFound from "../../../userApp/commonComponents/NodataFound";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const url = "Turn Trash into Cash!";
const title = "Awesome Contents";
const message1 =
  "Please check this out. Here is awesome application T2C(Trash2Cash) to earn while helping.";
const options = Platform.select({
  ios: {
    activityItemSources: [
      {
        // For sharing url with custom title.
        placeholderItem: { type: "url", content: url },
        item: {
          default: { type: "url", content: url },
        },
        subject: {
          default: title,
        },
        linkMetadata: { originalUrl: url, url, title },
      },
      {
        // For sharing text.
        placeholderItem: { type: "text", content: message1 },
        item: {
          default: { type: "text", content: message1 },
          message: null, // Specify no text to share via Messages app.
        },
        linkMetadata: {
          // For showing app icon on share preview.
          title: message1,
        },
      },
      {
        // For using custom icon instead of default text icon at share preview when sharing with message.
        placeholderItem: {
          type: "url",
        },
        item: {
          default: {
            type: "text",
            content: `${message1} ${url} `,
          },
        },
        linkMetadata: {
          title: message1,
        },
      },
    ],
  },
  default: {
    title,
    subject: title,
    message: `${message1} ${url} `,
  },
});

const Voucher = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const partnerusedVoucherList = useSelector(
    (state) => state?.partnerReducer?.partnerUsedVoucherList
  );
  const partnernewVoucherList = useSelector(
    (state) => state?.partnerReducer?.partnerNewVoucherList
  );

  const [refreshing, setRefreshing] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [enterVoucherCode, setEnterVoucherCode] = useState("");
  const [usedVoucherFilteredData, setUsedVoucherFilteredData] = useState(
    partnerusedVoucherList
  );
  const [newVoucherFilteredData, setNewVoucherFilteredData] = useState(
    partnernewVoucherList
  );

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: types.GET_PARTNER_VOUCHER_LIST,
        payload: 3,
      });
    }, [])
  );

  const deleteVoucher = (i) => {
    const body = {
      voucher_id: i?.voucher_id,
      is_deleted: 1,
    };
    dispatch({
      type: types?.DELETE_PARTNER_VOUCHER,
      payload: body,
    });
    dispatch({
      type: types?.GET_PARTNER_VOUCHER_LIST,
      payload: 2,
    });
  };
  const voucherItem = ({ item }) => {
    return (
      <View style={styles.voucherItem}>
        <View style={styles.voucherTopView}>
          <View style={styles.voucherTopLeftView}>
            <Text style={styles.voucherCodeTitle}>
              {message?.voucherCode}
              <Text style={styles.voucherCodeValue}>{item?.voucher_code}</Text>
            </Text>
          </View>
          <View style={styles.voucherTopRightView}>
            <TouchableOpacity
              onPress={() => {
                Share.open(options);
              }}
            >
              <Image
                style={styles.shareIcon}
                source={require("../../../assets/icons/share1.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteVoucher(item)}>
              <Image
                style={styles.deleteIcon}
                source={require("../../../assets/icons/delete.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.voucherBottomView}>
          <Image
            style={styles.clockIcon}
            source={require("../../../assets/icons/clock.png")}
          />
          <Text style={styles.timeText}>
            {moment(item?.valid_from).format("Do MMM")},{" "}
            {moment(item?.time_from, "HH:mm:ss").format("h:mm A")} -{" "}
            {moment(item?.valid_to).format("Do MMM")},{" "}
            {moment(item?.time_to, "HH:mm:ss").format("h:mm A")}
          </Text>
        </View>
      </View>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: types?.GET_PARTNER_VOUCHER_LIST,
      payload: tabIndex == 0 ? 3 : 2,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const voucherTabs = (index) => {
    setNewVoucherFilteredData(partnernewVoucherList),
      setUsedVoucherFilteredData(partnerusedVoucherList),
      dispatch({
        type: types?.GET_PARTNER_VOUCHER_LIST,
        payload: index === 0 ? 3 : 2,
      });
  };
  const tabItems = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.tabView,
          borderBottomWidth: index === tabIndex ? 3 : 1,
          borderBottomColor:
            index === tabIndex ? colors.lightBlue2 : colors["grey-500"],
        }}
        onPress={() => {
          setTabIndex(index), setEnterVoucherCode("");
          voucherTabs(index);
        }}
      >
        <Text
          style={{
            ...styles.tabText,
            color: index === tabIndex ? colors.lightBlue2 : colors.black2,
            fontFamily: index === tabIndex ? font.semiBold : font.regular,
          }}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const usedVoucher = ({ item, index }) => {
    return (
      <View style={styles.usedvoucherItem}>
        <Image
          style={styles.redeemIcon}
          source={require("../../../assets/icons/redeem.png")}
        />

        <View style={styles.usedvoucherRightView}>
          <View style={styles.usedvoucherRightTop}>
            <Text style={styles.usedvoucherCodeTitle}>
              {message?.voucherCode}
            </Text>
            <Text style={styles.usedvoucherCodeValue}>
              {item?.voucher_code}
            </Text>
          </View>

          <View style={styles.usedvoucherBottomView}>
            <Image
              style={styles.usedscanIcon}
              source={require("../../../assets/icons/scan.png")}
            />
            <Text style={styles.usedtimeText}>
              {item?.time}Scan by {item?.scanned_by}{" "}
              {moment(item?.redeemed_at).format("hh:mma")}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const filterVoucherList = () => {
    if (tabIndex === 0) {
      if (enterVoucherCode) {
        const usedFilterData = partnerusedVoucherList.filter((x) =>
          x?.voucher_code.includes(enterVoucherCode)
        );
        setUsedVoucherFilteredData(usedFilterData);
      } else {
        showMessage({
          message: "Please enter voucher code",
          type: "danger",
        });
      }
    } else {
      if (enterVoucherCode) {
        const newFilterData = partnernewVoucherList.filter((x) =>
          x?.voucher_code.includes(enterVoucherCode)
        );
        setNewVoucherFilteredData(newFilterData);
      } else {
        showMessage({
          message: "Please enter voucher code",
          type: "danger",
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <HeaderSection
        profileRight={true}
        onProfilePress={() =>
          NavigationService.navigate("PartnerBusinessProfile")
        }
      />

      <View style={styles.searchInputView}>
        <View style={styles.searchTextInputInputView}>
          <TextInput
            value={enterVoucherCode}
            onChangeText={(e) => setEnterVoucherCode(e)}
            style={styles.searchTextInput}
            placeholder={message?.enterVoucherCode}
            placeholderTextColor={colors.grey}
          />
          <View style={styles.verifyButton}>
            <TouchableOpacity onPress={() => filterVoucherList()}>
              <Text style={styles.verifyButtonText}>{message?.verify}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.createPostToggle}
        onPress={() => navigation.navigate("CreateVoucher")}
      >
        <Image
          style={styles.createPostIcon}
          source={require("../../../assets/icons/create_post.png")}
        />
      </TouchableOpacity>
      <FlatList
        style={styles.tabContainer}
        horizontal
        data={vouchersTab}
        renderItem={({ item, index }) => tabItems(item, index)}
      />

      {/* Voucher List */}
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={tabIndex === 0 ? usedVoucherFilteredData : newVoucherFilteredData}
        showsVerticalScrollIndicator={false}
        renderItem={tabIndex == 0 ? usedVoucher : voucherItem}
        style={styles.voucherList}
        ListEmptyComponent={() => <NoDataFound />}
      />
    </View>
  );
};


export default Voucher;
