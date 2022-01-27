import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { HStack, Switch, VStack } from "native-base";

export const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();

  if (status === "granted") {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      deferredUpdatesInterval: 200,
      deferredUpdatesDistance: 1,
    });
    return true;
  }
  return false;
};

const AppCheckbox = ({ style, ...rest }: any) => {
  const [checked, setChecked] = useState(false);

  const switchHandler = async () => {
    if (checked) {
      await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
      setChecked(false);
    } else {
      Alert.alert(
        "Location Tracking",
        "We need your location to track nearby fresh events :)",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const res = await requestPermissions();
              res && setChecked(true);
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => setChecked(false),
        }
      );
    }
  };

  return (
    <HStack
      alignItems="center"
      justifyContent={"space-between"}
      style={style}
      {...rest}
    >
      <Text>toggle search state</Text>
      <Switch size="md" isChecked={checked} onToggle={switchHandler} />
    </HStack>
  );
};

export default AppCheckbox;

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations }: any = data;
    // console.log(
    //   `latitude: ${locations[0].coords.latitude}, longitude: ${locations[0].coords.longitude} `
    // );
    // console.log(`date: ${locations[0].timestamp}`);
  }
});

const st = StyleSheet.create({});
