import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import JobCard from "../component/JobCard";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DisplayJob } from "@/screens/DisplayJob"; // Import DisplayJob type

const BookmarksScreen = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<DisplayJob[]>([]);

  const fetchBookmarks = async () => {
    try {
      const storedJobs = await AsyncStorage.getItem("bookmarks");
      setBookmarkedJobs(storedJobs ? JSON.parse(storedJobs) : []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const deleteBookmark = async (jobId: number) => {
    try {
      const storedJobs: DisplayJob[] = JSON.parse(
        (await AsyncStorage.getItem("bookmarks")) || "[]"
      );
      const updatedJobs = storedJobs.filter((job) => job.id !== jobId);
      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedJobs));
      setBookmarkedJobs(updatedJobs);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {bookmarkedJobs.length === 0 ? <Text>No bookmarks found</Text> : null}
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item, index) =>
          item.id ? `job-${item.id}` : `index-${index}`
        }
        renderItem={({ item }) => (
          <View>
            <JobCard
              job={item}
              onPress={() => console.log("Job pressed:", item)}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteBookmark(item.id)}
            >
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
  },
});

export default BookmarksScreen;
