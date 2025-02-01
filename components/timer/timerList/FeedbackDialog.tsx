import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Modal from "react-native-modal";
import { Button } from "react-native-paper";

interface IProps {
  completedTimer: { name: string } | null;
  closeModal: () => void;
}

const FeedbackDialog = ({ completedTimer, closeModal }: IProps) => {
  const { colors } = useTheme();
  return (
    <Modal
      isVisible={!!completedTimer}
      onBackdropPress={closeModal}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          Timer Completed!
        </Text>
        <Text style={[styles.modalText, { color: colors.text }]}>
          Great job! Your timer {completedTimer?.name} has completed.
        </Text>
        <Button mode="contained" onPress={closeModal}>
          Close
        </Button>
      </View>
    </Modal>
  );
};

export default FeedbackDialog;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 10 },
});
