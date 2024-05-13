import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MovieDetailsScreen from "./src/screens/MovieDetailsScreen";
import ListsScreen from "./src/screens/ListsScreen";
import store from "./src/store/store";
import { persistor } from "./src/store/store";
import "./src/ReactotronConfig";

type RootStackParamList = {
  Home: undefined;
  MovieDetails: undefined;
  Lists: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#000",
              },
              headerTintColor: "#fff",
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="MovieDetails"
              component={MovieDetailsScreen}
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="Lists"
              component={ListsScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
