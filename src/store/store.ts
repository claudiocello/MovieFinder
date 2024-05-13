import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "../reducers/index";
import Reactotron from "../ReactotronConfig";

export type AppState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<AppState> = Reactotron.createEnhancer
  ? createStore(
      persistedReducer,
      composeWithDevTools(Reactotron.createEnhancer())
    )
  : createStore(persistedReducer, composeWithDevTools(applyMiddleware()));

export const persistor = persistStore(store);

export default store;
