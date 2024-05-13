import Reactotron, { networking } from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure({ name: "MovieFinder" })
  .useReactNative()
  .use(reactotronRedux())
  .use(networking())
  .connect();

export default reactotron;
