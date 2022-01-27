import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createMaterialBottomTabNavigator();

export const Tabnavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#06b6d4" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="map" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabnavigator;
