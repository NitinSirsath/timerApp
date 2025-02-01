import { Text, View } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

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
          🎉 Timer Completed!
        </Text>
        <Text style={[styles.modalText, { color: colors.text }]}>
          Great job! Your timer **{completedTimer?.name}** has completed.
        </Text>
        <Button title="OK" onPress={closeModal} />
      </View>
    </Modal>
  );
};

export default FeedbackDialog;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  categoryContainer: { marginBottom: 10 },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },

  categoryTitle: { fontSize: 18, fontWeight: "bold" },

  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5,
  },

  timerCard: {
    padding: 15,
    borderBottomWidth: 1,
  },

  timerName: { fontSize: 16, fontWeight: "bold" },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  modalContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 10 },

  filterContainer: { marginBottom: 15 },
  filterLabel: { fontSize: 16, marginBottom: 5 },
  picker: { height: 60 },
});
