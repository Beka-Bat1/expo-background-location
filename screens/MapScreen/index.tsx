import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Modal,
  View,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, LatLng, Marker, Point } from "react-native-maps";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Rating, AirbnbRating } from "react-native-ratings";

import PriceMarker from "../../components/PriceMarker";
import { requestMovies } from "../../store/actions";
import mapStyle from "../../constants/mapStyle";
import {
  Box,
  FlatList,
  TextArea,
  VStack,
  Text,
  HStack,
  Stack,
  Image,
} from "native-base";

import useFetch from "../../hooks/useFetch";
import { randomNumbers } from "../../utils/utils";

const { width, height } = Dimensions.get("window");

const MapScreen = () => {
  const [location, setLocation] = useState(null) as any;
  const [errorMsg, setErrorMsg] = useState("") as any;
  const [selectedMarker, setSelectedMarker] = useState({});
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { response: movies, error, isLoading } = useFetch(requestMovies);

  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: location ? location?.coords?.latitude + 0.00001 : 72.232323,
        longitude: location ? location?.coords?.longitude + 0.00001 : 23.232323,
      },
      title: "cinema",
      description: "new movies",
      onPress: (e: any) => markerHandler(e.nativeEvent),
      onCalloutPress: (e: any) => marketBannerHandler(e.nativeEvent),
    },
  ]);

  const snapPoints = useMemo(() => ["40%"], []);

  const handleClosePress = () => bottomSheetRef.current.close();

  const markerHandler = async ({ coordinate }: any) => {
    setSelectedMarker(coordinate);
    bottomSheetRef?.current?.snapToIndex(0);
    // load images
  };

  const marketBannerHandler = (e) => {
    // do the stuff with coordinates
    // load pictures of new movies
    // check if you are close to event,
    // do you hasve access to this event,
    // open modal for actions
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: (0.0922 * width) / height,
      });

      setMarkers((prev) => [
        ...prev,
        ...new Array(10).fill(null).map((e) => ({
          coordinate: {
            latitude: location.coords.latitude + randomNumbers(0.0001, 0.005),
            longitude: location.coords.longitude + randomNumbers(0.0001, 0.005),
          },
          title: "cinema",
          description: "new movies",
          onPress: (e: any) => markerHandler(e.nativeEvent),
          onCalloutPress: (e: any) => marketBannerHandler(e.nativeEvent),
        })),
      ]);
    })();
  }, []);

  if (errorMsg) {
    return Alert.alert("Please enable activate location permissions.");
  }

  const handleSheetChange = useCallback((index) => {}, []);

  const renderItem = ({ item }) => (
    <Stack direction="column" alignItems="center">
      <Image
        source={{
          uri: item.poster,
        }}
        alt="poster_image"
        size="md"
      />
      <Text> {item.title}</Text>
      <Text> 10 Person(s) Left </Text>
    </Stack>
  );

  const ModalHeader = useCallback(
    () => (
      <VStack m="5" mb="1">
        <HStack justifyContent={"space-between"}>
          <Text fontSize="xs">Name of Place</Text>
          <Text fontSize="xs">8.7/10</Text>
        </HStack>

        <Text fontSize="xs">450m</Text>
        <Text fontSize="xs">2 movies</Text>
        <Text fontSize="xs">10 places left </Text>
      </VStack>
    ),
    []
  );

  return (
    <View style={st.container}>
      <MapView
        style={st.map}
        customMapStyle={mapStyle}
        region={location}
        provider={"google"}
        showsUserLocation={true}
        followsUserLocation={true}
        userLocationPriority={"high"}
        maxZoomLevel={20}
      >
        {markers.map((marker, index) => (
          <Marker key={index} {...marker}>
            <PriceMarker amount={() => Math.round(randomNumbers(8, 60))} />
          </Marker>
        ))}
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        // enablePanDownToClose={true}
      >
        <ModalHeader />

        <Stack height={200} mt="-7">
          <BottomSheetFlatList
            data={movies}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => <Text>Loading ...</Text>}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            contentContainerStyle={st.contentContainer}
          />
        </Stack>
      </BottomSheet>
    </View>
  );
};

export default MapScreen;

const st = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    paddingHorizontal: 28,
    paddingVertical: 48,
    marginBottom: 54,
    height: 200,
  },
});
