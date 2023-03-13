import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, ActivityIndicator, Image, TouchableOpacity, PanResponder, Animated, } from "react-native";

// Third Party
import Toast from "react-native-simple-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";
import CustomDropdown from "../../commonComponents/Dropdown";

const VerifyQuestions = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params;
  const dispatch = useDispatch();
  const huntquestions = useSelector(
    (state) => state?.homeReducer?.getHuntQuestions
  );
  const [question1, setQuestion1] = useState();
  const [answer1, setAnswer1] = useState(0);
  const [question2, setQuestion2] = useState();
  const [answer2, setAnswer2] = useState(0);
  const [question3, setQuestion3] = useState();
  const [answer3, setAnswer3] = useState(0);
  const [question4, setQuestion4] = useState();
  const homeReducer = useSelector((State) => State?.homeReducer);
  const authReducer = useSelector((State) => State?.authReducer);
  const [showQue, setShowQue] = useState(true);
  // to be used later
  const [litter, setLitter] = useState("");
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    dispatch({
      type: types?.BUTTON_LOADER,
      payload: false,
    });
    dispatch({
      type: types.GET_HUNT_QUESTIONS,
      payload: item?.hunt_id,
    });
  }, []);

  useEffect(() => {
    if (huntquestions?.length == 2) {
      setQuestion1(1);
      setQuestion4(4);
    } else {
      setQuestion1(1);
      setQuestion2(2);
      setQuestion3(3);
    }
  }, [litter, huntquestions]);
  const [huntOption, setHuntOption] = useState([]);
  const verifySelection = () => {
    if (question1 === 1 && answer1 === 0) {
      huntOption.push(1);

      if (huntquestions?.length == 3) {
        if (
          question2 === 2 &&
          answer2 === 0 &&
          question3 === 3 &&
          answer3 === 0
        ) {
          return huntOption.push(3, 5);
        } else if (
          question2 === 2 &&
          answer2 === 0 &&
          question3 === 3 &&
          answer3 === 1
        ) {
          return huntOption.push(3, 6);
        } else if (
          question2 === 2 &&
          answer2 === 0 &&
          question3 === 3 &&
          answer3 === 2
        ) {
          return huntOption.push(3, 7);
        } else if (
          question2 === 2 &&
          answer2 === 1 &&
          question3 === 3 &&
          answer3 === 0
        ) {
          return huntOption.push(4, 5);
        } else if (
          question2 === 2 &&
          answer2 === 1 &&
          question3 === 3 &&
          answer3 === 1
        ) {
          return huntOption.push(4, 6);
        } else if (
          question2 === 2 &&
          answer2 === 1 &&
          question3 === 3 &&
          answer3 === 2
        ) {
          return huntOption.push(4, 7);
        }
      } else if (huntquestions?.length == 2) {
        if (question4 === 4) {
          huntOption.push(litter);
        }
      }
    } else if (question1 === 1 && answer1 === 1) {
      huntOption.push(2);
    }
  };

  const submitVerify = () => {
    verifySelection();

    if (
      question1 === 1 &&
      answer1 === 0 &&
      litter === "" &&
      huntquestions?.length == 2
    ) {
      Toast.show("Please fill no. of litter", Toast.LONG);
    } else {
      const parameters = {
        hunt_id: item?.hunt_id,
        created_by: authReducer?.userDetails?.userId,
        hunt_option_ids:
          huntquestions?.length == 2 ? `${huntOption}` : `${huntOption}`,
      };

      dispatch({
        type: types?.SUBMIT_VERIFY,
        payload: parameters,
      });
    }
    setHuntOption([]);
  };
  const questionItems = (item) => {
    const questionClick1 = (item, index) => {
      setQuestion1(item?.hunt_question_id);
      setAnswer1(index);
      setShowQue(index == 0 ? true : false);
    };

    const questionClick2 = (item, index) => {
      setQuestion2(item?.hunt_question_id);
      setAnswer2(index);
    };

    const questionClick3 = (item, index) => {
      setQuestion3(item?.hunt_question_id);
      setAnswer3(index);
    };

    const questionClick4 = (item) => {
      setUserDropdown(!userDropdown);
      setQuestion4(item?.hunt_question_id);

    };
    return (
      <View>
        {item?.hunt_question_id === 1 ? (
          <View style={styles?.questionSubMainView}>
            <Text style={styles?.titleTextStyle}>{item?.question}</Text>

            {/* options and radio button */}
            <View style={styles?.optionsMainView}>
              {item?.options.options?.map((item1, index) => (
                <View style={styles?.optionSubView}>
                  <View
                    style={{
                      ...styles?.optionView,
                      marginLeft: index == 1 ? wp("12%") : 0,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => questionClick1(item, index)}
                    >
                      <Image
                        source={
                          index === answer1
                            ? require("../../../assets/icons/radio_on.png")
                            : require("../../../assets/icons/radio_off.png")
                        }
                        style={styles?.imageView}
                      />
                    </TouchableOpacity>
                    <Text style={styles?.optionsTitleText}>
                      {item1?.option_value == 1 ? "Yes" : "No"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : item?.hunt_question_id === 2 && showQue ? (
          <View style={styles?.questionSubMainView}>
            <Text style={styles?.titleTextStyle}>{item?.question}</Text>

            {/* options and radio button */}
            <View style={styles?.optionsMainView}>
              {item?.options.options?.map((item2, index) => {
                return (
                  <View style={styles?.optionSubView}>
                    <View
                      style={{
                        ...styles?.optionView,
                        marginLeft: index === 1 ? wp("12%") : 0,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => questionClick2(item, index)}
                      >
                        <Image
                          source={
                            index === answer2
                              ? require("../../../assets/icons/radio_on.png")
                              : require("../../../assets/icons/radio_off.png")
                          }
                          style={styles?.imageView}
                        />
                      </TouchableOpacity>
                      <Text style={styles?.optionsTitleText}>
                        {item2?.option_value == 1 ? "Yes" : "No"}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : item?.hunt_question_id === 3 && showQue ? (
          <View style={styles?.questionSubMainView}>
            <Text style={styles?.titleTextStyle}>{item?.question}</Text>
            {/* options and radio button */}
            <View style={styles?.optionsMainView}>
              {item?.options.options?.map((item3, index) => (
                <View style={styles?.optionSubView}>
                  <View
                    style={{
                      ...styles?.optionView,
                      marginLeft: index == 1 ? wp("12%") : 0,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => questionClick3(item, index)}
                    >
                      <Image
                        source={
                          index === answer3
                            ? require("../../../assets/icons/radio_on.png")
                            : require("../../../assets/icons/radio_off.png")
                        }
                        style={styles?.imageView}
                      />
                    </TouchableOpacity>
                    <Text style={styles?.optionsTitleText}>
                      {item3?.option_value == 1
                        ? "Full"
                        : item3?.option_value == 2
                          ? "More than half"
                          : "Less than half"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : item?.hunt_question_id === 4 && showQue ? (
          <View style={styles?.questionSubMainView}>
            <Text style={styles?.titleTextStyle}>{item?.question}</Text>
            {/* options and radio button */}
            <View style={styles.dropdownView}>
              <CustomDropdown
                open={userDropdown}
                title={
                  litter ? `${litter} pieces of litter` : `Pieces of litter`
                }
                data={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]}
                onPress={() => questionClick4(item)}
                onValueChange={(item) =>
                  setLitter(item === "10+" ? "10" : item)
                }
                huntQue
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onResponderTerminationRequest: () => false,
    onPanResponderGrant: (e, gestureState) => {
      pan.setOffset({ x: pan.x._value, y: pan.y._value });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: (e, gestureState) => {
      pan.setValue({
        x: gestureState.dx,
        y: gestureState.dy <= 0 ? 0 : gestureState.dy,
      });
    },

    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {
          toValue: {
            x: 0,
            y: 0,
          },
        } // Back to zero
      ).start();
    },
  });
  const modalComp = () => {
    return (
      <Animated.View style={styles.container1}>
        <Animated.View
          transition="height"
          {...panResponder.panHandlers}
          style={[styles.container1, { transform: [{ translateY: pan.y }] }]}
        >
          <View style={styles?.greyHRlines}>
            <View style={styles?.questionMainView} />
            <View style={styles?.questionSubView}>
              {huntquestions?.map((item) => questionItems(item))}
            </View>

            <View style={styles?.submitMainView}>
              <LinearButton
                title={"VERIFY"}
                onPress={() => submitVerify()}
                loader={homeReducer?.buttonLoader}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.mainContainer}
      source={{ uri: item.hunt_image }}
    >
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
      />

      {!authReducer?.registrationLoader ? (
        modalComp()
      ) : (
        <View style={styles.loaderView}>
          <ActivityIndicator size={"small"} color={colors?.appBlueColor} />
        </View>
      )}
    </ImageBackground>
  );
};

export default VerifyQuestions;
