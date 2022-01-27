import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";

import RootNavigaor from "./navigation/RootNavigaor";

export default function App() {
  return (
    <NativeBaseProvider>
      <RootNavigaor />
    </NativeBaseProvider>
  );
}
