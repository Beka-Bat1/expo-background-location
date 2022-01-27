import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Center,
  HStack,
  Switch,
  VStack,
  StatusBar,
  Heading,
  FlatList,
  Spacer,
  Avatar,
  Button,
} from "native-base";
import { Rating } from "react-native-ratings";

import AppCheckbox from "../../components/AppCheckbox";

import dummyData from "../../constants/dummyData";
import useFetch from "../../hooks/useFetch";
import { requestMovies } from "../../store/actions";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const {
    response: movies,
    error,
    isLoading,
  } = useFetch(() => requestMovies());
  const navigation = useNavigation();

  return (
    <VStack>
      <StatusBar />
      <HStack>
        <Box flex={1} p={3} bg="primary.500" shadow={2}>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text>NFT Token: 99</Text>
            <Button
              colorScheme="dark"
              _text={{ color: "white" }}
              onPress={() => navigation.navigate("Camera")}
            >
              Scan QR
            </Button>
          </HStack>
          <AppCheckbox />
        </Box>
      </HStack>

      <Heading fontSize="xl" p="4" pb="3">
        Entertainments
      </Heading>
      <FlatList
        data={movies}
        ListEmptyComponent={() => <Text>Loading ...</Text>}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item?.poster,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item?.title}
                </Text>

                <Rating
                  imageSize={20}
                  ratingCount={10}
                  startingValue={item?.rating}
                  style={{
                    paddingVertical: 10,
                  }}
                  tintColor="#F5F8FA"
                  readonly={true}
                />
              </VStack>

              <Spacer />
            </HStack>
          </Box>
        )}
      />
    </VStack>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
