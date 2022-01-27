export const markers = [
  {
    coordinate: {
      latitude: location.coords.latitude + 0.0001,
      longitude: location.coords.longitude + 0.0001,
    },
    title: "cinema",
    description: "new movies",
    onPress: (e: any) => markerHandler(e.nativeEvent),
    onCalloutPress: (e: any) => marketBannerHandler(e.nativeEvent),
  },
];
