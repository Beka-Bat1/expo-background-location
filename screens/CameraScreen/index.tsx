import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, VStack } from "native-base";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    alert(`Success!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <VStack style={st.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={st.absoluteFill}
      />
      {scanned && (
        <VStack flex={0.8} justifyContent={"flex-end"}>
          <Button
            variant="outline"
            colorScheme="info"
            onPress={() => setScanned(false)}
          >
            Success
          </Button>
        </VStack>
      )}
    </VStack>
  );
};

export default CameraScreen;

const st = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});
