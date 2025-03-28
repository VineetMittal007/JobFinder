import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigator";
import { DisplayJob } from "./DisplayJob";
import { useTheme } from "../Theme/ThemeContext";

type JobDetailsProps = NativeStackScreenProps<RootStackParamList, "JobDetails">;

const JobDetailsScreen: React.FC<JobDetailsProps> = ({ route }) => {
  const { job } = route.params;
  const { theme } = useTheme();

  const bookmarkJob = async (jobToBookmark: DisplayJob) => {
    try {
      const storedJobs: DisplayJob[] = JSON.parse(
        (await AsyncStorage.getItem("bookmarks")) || "[]"
      );

      if (!storedJobs.some((j) => j.id === jobToBookmark.id)) {
        await AsyncStorage.setItem(
          "bookmarks",
          JSON.stringify([...storedJobs, jobToBookmark])
        );
        Alert.alert("Success", "Job bookmarked successfully!");
      } else {
        Alert.alert("Info", "Job is already bookmarked.");
      }
    } catch {
      Alert.alert("Error", "Failed to bookmark the job.");
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        theme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <Text
        style={[
          styles.title,
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {job.title}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Company:</Text>
        <Text style={styles.value}>{job.companyName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{job.place}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Salary:</Text>
        <Text style={styles.value}>{job.salary}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Job Type:</Text>
        <Text style={styles.value}>{job.jobType}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Experience:</Text>
        <Text style={styles.value}>{job.experience}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Qualification:</Text>
        <Text style={styles.value}>{job.qualification}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Job Role:</Text>
        <Text style={styles.value}>{job.jobRole}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Job Category:</Text>
        <Text style={styles.value}>{job.jobCategory}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fees:</Text>
        <Text style={styles.value}>{job.feesText}</Text>
      </View>

      <TouchableOpacity
        style={styles.bookmarkButton}
        onPress={() => bookmarkJob(job)}
      >
        <Text style={styles.bookmarkText}>⭐ Bookmark Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkBackground: {
    backgroundColor: "#35495e",
  },
  lightBackground: {
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  darkText: {
    color: "#ffffff",
  },
  lightText: {
    color: "#000000",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#42b883",
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  bookmarkButton: {
    marginTop: 20,
    backgroundColor: "#42b883",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookmarkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default JobDetailsScreen;
