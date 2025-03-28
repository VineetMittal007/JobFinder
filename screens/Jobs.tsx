import React from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import JobCard from "../component/JobCard";
import { RootStackParamList } from "../navigation/Navigator"; // Import types

// Define job type for API response
type Job = {
  id: number;
  title: string;
//   company: string;
  location: string;
//   description: string;
  salary: number;
  phone: string;
};

// API Response Type
type JobsApiResponse = {
  results: Job[];
  nextPage?: number;
};

// Fetch Jobs function with TypeScript
const fetchJobs = async ({ pageParam = 1 }): Promise<JobsApiResponse> => {
  try {
    const { data } = await axios.get<JobsApiResponse>(
      `https://testapi.getlokalapp.com/common/jobs?page=${pageParam}`
      );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch jobs");
  }
};

const JobsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Jobs">>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<JobsApiResponse, Error>("jobs", fetchJobs, {
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Loading State */}
      {status === "loading" && (
        <ActivityIndicator size="large" color="#0085AD" />
      )}

      {/* Error State */}
      {status === "error" && (
        <Text style={{ color: "red", textAlign: "center" }}>
          {error?.message}
        </Text>
      )}

      {/* Job List */}
      <FlatList
        data={data?.pages.flatMap((page) => page.results) || []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate("JobDetails", { job: item })}
          />
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#0085AD" />
          ) : null
        }
      />
    </View>
  );
};

export default JobsScreen;
