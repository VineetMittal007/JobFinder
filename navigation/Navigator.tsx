import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useTheme } from "../Theme/ThemeContext";

import JobsScreen from "../screens/Jobs";
import BookmarksScreen from "../screens/Bookmark";
import JobDetailsScreen from "../screens/JobsDetails";

export type RootStackParamList = {
  JobsScreen: undefined;
  JobDetails: { job: any };
  BookmarksScreen: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const JobsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#42b883" },
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
      animation: "slide_from_right",
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
      animation: "slide_from_right",
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
        tabBarLabelPosition: "beside-icon",
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
        component={BookmarksStack}
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
    position: "sticky",
    bottom: 10,
    height: 40,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
  },
  tabBarLight: {},
  tabBarDark: {},
});

export default AppNavigator;
