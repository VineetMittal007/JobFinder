import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigator";
import { useTheme } from "../Theme/ThemeContext";
import { FetchedJob } from "./fetchedjobs";

// Define Job type
type Job = {
  id: number;
  title: string;
  location: string;
  salary: number;
  phone: string;
};

// API Response type
type JobsApiResponse = {
  results: Job[];
};

// Map API response (FetchedJob) to Job
const mapFetchedJobToJob = (fetchedJob: FetchedJob): Job => {
  return {
    id: fetchedJob.id, // Ensure FetchedJob has an 'id' field
    title: fetchedJob.title,
    location: fetchedJob.job_location_slug || "Unknown",
    salary: fetchedJob.salary_max ?? 0, // Ensure "Salary" exists
    phone: fetchedJob.whatsapp_no || "N/A",
  };
};

// Fetch jobs from API
const fetchJobs = async ({
  pageParam = 1,
}): Promise<{ results: Job[]; nextPage?: number }> => {
  try {
    const { data } = await axios.get<{ results: FetchedJob[] }>(
      `https://testapi.getlokalapp.com/common/jobs?page=${pageParam}`
    );

    const mappedJobs: Job[] = data.results.map(mapFetchedJobToJob);

    return {
      results: mappedJobs,
      nextPage: data.results.length > 0 ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }
};

const JobsScreen = () => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Jobs">>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery("jobs", ({ pageParam = 1 }) => fetchJobs({ pageParam }), {
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    });

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      {status === "loading" && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffdd57" />
          <Text style={styles.loadingText}>Fetching jobs...</Text>
        </View>
      )}
      <FlatList
        data={data?.pages?.flatMap((page) => page.results) || []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("JobDetails", { job: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.salary}>
              Salary: ₹
              {item.salary ? item.salary.toLocaleString() : "Not Disclosed"}
            </Text>
            <Text style={styles.phone}>📞 {item.phone}</Text>
          </TouchableOpacity>
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#42b883" />
              <Text style={styles.loadingMoreText}>Loading more jobs...</Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  lightBackground: {
    backgroundColor: "#FFFFFF",
  },
  darkBackground: {
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#42b883",
  },
  card: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  salary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#42b883",
  },
  phone: {
    fontSize: 14,
    color: "#888",
    marginTop: 6,
  },
  loadingMoreContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingMoreText: {
    marginTop: 5,
    fontSize: 14,
    color: "#42b883",
  },
});

export default JobsScreen;
