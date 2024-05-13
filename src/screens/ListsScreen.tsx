import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavoritesScreen from "./FavoritesScreen";
import WatchlistScreen from "./WatchlistScreen";

const Tab = createMaterialTopTabNavigator();

const ListsScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: "#fff" },
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
    </Tab.Navigator>
  );
};

export default ListsScreen;
