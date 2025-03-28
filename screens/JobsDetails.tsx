import React from "react";
import { View, Text, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigator"; // Import navigation type

// Define the Job type
interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  phone: string;
}

// Define props type
type JobDetailsProps = NativeStackScreenProps<RootStackParamList, "JobDetails">;

const JobDetailsScreen: React.FC<JobDetailsProps> = ({ route }) => {
  const { job } = route.params;

  const bookmarkJob = async () => {
    try {
      const storedJobs: Job[] = JSON.parse(
        (await AsyncStorage.getItem("bookmarks")) || "[]"
      );

      if (!storedJobs.some((j) => j.id === job.id)) {
        const updatedJobs = [...storedJobs, job];
        await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedJobs));
        Alert.alert("Success", "Job bookmarked successfully!");
      } else {
        Alert.alert("Info", "Job is already bookmarked.");
      }
    } catch (error) {
      console.error("Error bookmarking job:", error);
      Alert.alert("Error", "Failed to bookmark the job.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{job.title}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
      <Button title="Bookmark" onPress={bookmarkJob} />
    </View>
  );
};

export default JobDetailsScreen;
