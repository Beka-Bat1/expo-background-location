import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tabnavigator from "./Tabnavigator";
import EventScreen from "../screens/EventScreen";
import CameraScreen from "../screens/CameraScreen";

const { Navigator, Screen } = createStackNavigator();

const RootNavigaor = () => {
  return (
    <NavigationContainer initialRouteName="Tabs">
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Tabs" component={Tabnavigator} />

        <Screen name="Event" component={EventScreen} />
        <Screen name="Camera" component={CameraScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigaor;
