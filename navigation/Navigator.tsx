import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useTheme } from "../Theme/ThemeContext"; // Import theme context

import JobsScreen from "../screens/Jobs";
import BookmarksScreen from "../screens/Bookmark";
import JobDetailsScreen from "../screens/JobsDetails";

// Define the param list for stack navigation
export type RootStackParamList = {
  JobsScreen: undefined;
  JobDetails: { job: any }; // Ensure JobDetails expects job as a parameter
  BookmarksScreen: undefined;
};

// Create navigators with types
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const JobsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#42b883" },
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
      animation: "slide_from_right", // Smooth transition
    }}
  >
    <Stack.Screen
      name="JobsScreen"
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

const BookmarksStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#42b883" },
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
      animation: "slide_from_right", // Smooth transition
    }}
  >
    <Stack.Screen
      name="BookmarksScreen"
      component={BookmarksScreen}
      options={{ title: "Bookmarks" }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBarBase,
          theme === "dark" ? styles.tabBarDark : styles.tabBarLight,
        ],
        tabBarActiveTintColor: theme === "dark" ? "#42b883" : "#0085AD",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="JobsStack"
        component={JobsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
          tabBarLabel: "Jobs",
        }}
      />
      <Tab.Screen
        name="BookmarksStack"
        component={BookmarksStack} // Updated to use BookmarksStack
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
          tabBarLabel: "Saved",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarBase: {
    position: "absolute",
    bottom: 4,
    left: 10,
    right: 10,
    height: 36,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  tabBarLight: {
    backgroundColor: "white",
  },
  tabBarDark: {
    backgroundColor: "white",
  },
});

export default AppNavigator;
