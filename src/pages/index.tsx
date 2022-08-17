import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { TbMessageCircle2 } from "react-icons/tb";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Comments from "../../components/Comments";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.sm" borderWidth="1px" borderRadius="lg">
        <Box overflow="hidden">
          <Box p="4">
            <Box display="flex">
              <Avatar
                name="Bhupesh Pradhan"
                src="https://pbs.twimg.com/profile_images/1441399914282426377/6JSnYSXg_400x400.jpg"
              />
              <Flex flexDirection="column" mx="2">
                <HStack>
                  <strong>Bhupesh Pradhan</strong>
                  <Icon as={GoVerified} color="#1A8CD8" w={4} h={4} />
                </HStack>
                <Text color="gray.400">@bhupeshpr25</Text>
              </Flex>
            </Box>

            <Text mt="1" fontSize="2xl" lineHeight="tight" noOfLines={5}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates similique beatae blanditiis odio dicta dolores minima
              repellat qui eos amet dolor consequuntur vel laboriosam illo,
              quibusdam quia et hic numquam.
            </Text>

            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              mt="2"
            >
              4:30 AM &bull; Aug 16, 2022 &bull; Not Twitter
            </Box>
          </Box>

          <Divider />

          <Flex letterSpacing="wide" fontSize="sm" py="2" ml="4">
            <Flex>
              <Text fontWeight="extrabold">1</Text>
              <Text color="gray.500" ml="1">
                Retweet
              </Text>
            </Flex>
            <Flex ml="4">
              <Text fontWeight="extrabold">9</Text>
              <Text color="gray.500" ml="1">
                Quote Tweets
              </Text>
            </Flex>
            <Flex ml="4">
              <Text fontWeight="extrabold">27</Text>
              <Text color="gray.500" ml="1">
                Likes
              </Text>
            </Flex>
          </Flex>

          <Divider />

          <HStack py="2" spacing="10" justify="space-evenly">
            <Icon as={TbMessageCircle2} w={6} h={6} />
            <Icon as={AiOutlineRetweet} w={6} h={6} />
            <Icon as={AiOutlineHeart} w={6} h={6} />
            <Icon as={FiShare} w={6} h={6} />
          </HStack>
        </Box>
        <Divider my="2" />

        {session ? (
          <HStack m="4">
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              onClick={() => signOut()}
            />

            <Input placeholder="Tweet your reply" border="none" />

            <Button borderRadius="3xl" px="6" bg="#1A8CD8">
              Reply
            </Button>
          </HStack>
        ) : (
          <Center my="4">
            <Button
              onClick={() => signIn("twitter")}
              w="container.lg"
              borderRadius="3xl"
              px="6"
              bg="#1A8CD8"
            >
              Login to reply
            </Button>
          </Center>
        )}

        <Divider />

        <Comments />
        <Comments />
        <Comments />
        <Comments />
      </Container>
    </>
  );
};

export default Home;
