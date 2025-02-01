import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Card, Text, Button, Avatar, Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function AboutMe() {
  const { colors } = useTheme();
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card mode="elevated" style={styles.card}>
        <Card.Title
          title="Nitin Sirsath"
          subtitle="Frontend Developer"
          left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
          titleStyle={[styles.title, { color: colors.text }]}
          subtitleStyle={[styles.subtitle, { color: colors.text }]}
        />
        <Divider />

        <Card.Content>
          <Text style={[styles.text, { color: colors.text }]}>
            Passionate frontend engineer with expertise in React,React Native,
            TypeScript, Zustand, and MUI. Focused on building modern,
            high-performance, and scalable UIs.
          </Text>
        </Card.Content>

        <Divider />
        <Card.Content style={styles.contactContainer}>
          <View style={styles.contactItem}>
            <MaterialIcons name="email" size={20} color={colors.text} />
            <Text
              style={[styles.contactText, { color: colors.text }]}
              onPress={() => openLink("mailto:nitinsirsath8855@gmail.com")}
            >
              nitinsirsath8855@gmail.com
            </Text>
          </View>

          <View style={styles.contactItem}>
            <MaterialIcons name="phone" size={20} color={colors.text} />
            <Text
              style={[styles.contactText, { color: colors.text }]}
              onPress={() => openLink("tel:+919890320142")}
            >
              +91 7507609484
            </Text>
          </View>
        </Card.Content>

        <Divider />
        <Card.Actions>
          <Button
            icon={() => <MaterialIcons name="language" size={20} />}
            mode="contained"
            onPress={() => openLink("https://nitinsirsath.netlify.app/")}
          >
            Portfolio
          </Button>

          <Button
            icon={() => <MaterialIcons name="code" size={20} />}
            mode="contained"
            onPress={() => openLink("https://github.com/nitinsirsath")}
          >
            GitHub
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  card: {
    borderRadius: 10,
    padding: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
  },

  text: {
    fontSize: 16,
    marginVertical: 10,
  },

  contactContainer: {
    marginTop: 10,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  contactText: {
    fontSize: 16,
    marginLeft: 8,
    textDecorationLine: "underline",
  },
});
