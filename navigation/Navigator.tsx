import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import JobsScreen from "../screens/Jobs";
import BookmarksScreen from "../screens/Bookmark";
import JobDetailsScreen from "../screens/JobsDetails";

// Define the param list for stack navigation
export type RootStackParamList = {
  Jobs: undefined;
  JobDetails: { job: any }; // Ensure JobDetails expects job as a parameter
};

// Create navigators with types
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Jobs"
      component={JobsScreen}
      options={{ title: "Jobs" }}
    />
    <Stack.Screen
      name="JobDetails"
      component={JobDetailsScreen}
      options={{ title: "Job Details" }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Jobs"
          component={JobsStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="briefcase" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="bookmark" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default AppNavigator;
