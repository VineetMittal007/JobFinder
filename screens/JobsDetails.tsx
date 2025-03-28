import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigator";

interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  phone: string;
}

type JobDetailsProps = NativeStackScreenProps<RootStackParamList, "JobDetails">;

const JobDetailsScreen: React.FC<JobDetailsProps> = ({ route }) => {
  const { job } = route.params;

  const bookmarkJob = async () => {
    try {
      const storedJobs: Job[] = JSON.parse(
        (await AsyncStorage.getItem("bookmarks")) || "[]"
      );

      if (!storedJobs.some((j) => j.id === job.id)) {
        await AsyncStorage.setItem(
          "bookmarks",
          JSON.stringify([...storedJobs, job])
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
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>📍 Location:</Text>
        <Text style={styles.value}>{job.location}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>💰 Salary:</Text>
        <Text style={styles.value}>{job.salary}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>📞 Contact:</Text>
        <Text style={styles.value}>{job.phone}</Text>
      </View>
      <TouchableOpacity style={styles.bookmarkButton} onPress={bookmarkJob}>
        <Text style={styles.bookmarkText}>⭐ Bookmark Job</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#555",
    marginRight: 4,
  },
  value: {
    fontSize: 12,
    fontWeight: "400",
    color: "#222",
  },
  bookmarkButton: {
    marginTop: 10,
    backgroundColor: "#ffdd57",
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookmarkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default JobDetailsScreen;
