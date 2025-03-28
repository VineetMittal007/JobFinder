import React, { useState } from "react";
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
import { DisplayJob } from "./DisplayJob";

const mapFetchedJobToDisplayJob = (fetchedJob: FetchedJob): DisplayJob => ({
  id: fetchedJob.id,
  title: fetchedJob.title,
  companyName: fetchedJob.company_name,
  place: fetchedJob.primary_details?.Place || "Unknown",
  salary: fetchedJob.primary_details?.Salary || "Negotiable",
  jobType: fetchedJob.primary_details?.Job_Type || "Unknown",
  experience: fetchedJob.primary_details?.Experience || "Unknown",
  qualification: fetchedJob.primary_details?.Qualification || "Unknown",
  jobTags: fetchedJob.job_tags,
  buttonText: fetchedJob.button_text,
  customLink: fetchedJob.custom_link,
  updatedOn: new Date(fetchedJob.updated_on).toLocaleDateString(),
  creatives: fetchedJob.creatives.map((creative) => ({
    thumb_url: creative.thumb_url,
  })),
  content:
    fetchedJob.contentV3?.V3.map((contentItem) => ({
      field_key: contentItem.field_key,
      field_name: contentItem.field_name,
      field_value: contentItem.field_value,
    })) || [],
  jobRole: fetchedJob.job_role,
  jobCategory: fetchedJob.job_category,
  feesText: fetchedJob.fees_text,
  whatsappLink: fetchedJob.contact_preference?.whatsapp_link,
});

const fetchJobs = async ({
  pageParam = 1,
}): Promise<{ results: FetchedJob[]; nextPage?: number }> => {
  try {
    const { data } = await axios.get<{ results: FetchedJob[] }>(
      `https://testapi.getlokalapp.com/common/jobs?page=${pageParam}`
    );

    return {
      results: data.results,
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
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "JobsScreen">
    >();
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Add loading flag

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery("jobs", ({ pageParam = 1 }) => fetchJobs({ pageParam }), {
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    });

  const handleEndReached = () => {
    if (hasNextPage && !isLoadingMore) {
      setIsLoadingMore(true);
      fetchNextPage().then(() => setIsLoadingMore(false));
    }
  };

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      {status === "loading" && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C2C6C9" />
          <Text style={styles.loadingText}>Fetching jobs...</Text>
        </View>
      )}

      <FlatList
        data={data?.pages?.flatMap((page) => page.results) || []}
        keyExtractor={(item, index) =>
          item.id ? `job-${item.id}` : `index-${index}`
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("JobDetails", {
                job: mapFetchedJobToDisplayJob(item),
              })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.company_name}</Text>
            <Text style={styles.salary}>
              Salary: ₹{" "}
              {item.salary_max
                ? item.salary_max.toLocaleString()
                : "Not Disclosed"}
            </Text>
            <Text style={styles.phone}>📞 {item.whatsapp_no}</Text>
          </TouchableOpacity>
        )}
        onEndReached={handleEndReached}
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
    backgroundColor: "#E8E8E8",
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
