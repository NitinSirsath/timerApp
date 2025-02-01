import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Divider } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

const NoticePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const checkNoticeShown = async () => {
      const hasShown = await AsyncStorage.getItem("noticeShown");
      if (!hasShown) {
        setIsVisible(true);
      }
    };

    checkNoticeShown();
  }, []);

  const handleClose = async () => {
    setIsVisible(false);
    await AsyncStorage.setItem("noticeShown", "true");
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.notification }]}>
          Welcome to Healthflex Timer!
        </Text>
        <Divider style={{ width: "100%", marginBottom: 10 }} />

        <Text style={[styles.message, { color: colors.text }]}>
          It's a timer application that helps users efficiently manage their
          time for workouts, study, breaks, and more.
        </Text>

        <Text style={[styles.details, { color: colors.text }]}>
          **Version:** 1.0.0 {"\n"}
          **Developer:** Nitin Sirsath {"\n"}
          **Company:** HealthFlex {"\n"}
        </Text>

        <Text style={[styles.disclaimer, { color: colors.text }]}>
          This is a **non-commercial** project built for learning purposes.
        </Text>

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleClose} style={styles.button}>
            Got It!
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default NoticePopup;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  details: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    fontStyle: "italic",
  },
  disclaimer: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 20,
  },
});
