import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import JobCard from "../component/JobCard";

const BookmarksScreen = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const storedJobs = await AsyncStorage.getItem("bookmarks");
      setBookmarkedJobs(storedJobs ? JSON.parse(storedJobs) : []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  // Ensure bookmarks are updated when screen is focused
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
        keyExtractor={(item) => item} // No need for toString() if it's already a string
        renderItem={({ item }) => <JobCard job={item} onPress={() => console.log("Job pressed:", item)} />}
      />
    </View>
  );
};

export default BookmarksScreen;
