import RepoCard from "@/Components/RepoCard";
import { Repository } from "@/Types";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Welcome(props: { repos: Repository[]; auth: any }) {
  return (
    <>
      <Head title="Welcome to GitOrNot" />
      <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="fixed top-0 right-0 px-6 py-4 sm:block">
          {props.auth.user
            ? (
              <Link href={route("dashboard")} className="text-sm text-gray-700 underline">
                Dashboard
              </Link>
            )
            : (
              <>
                <Button as={"a"} href={"/auth/redirect"} colorScheme={"blackAlpha"} leftIcon={<Icon as={FaGithub} />}>
                  Log in via GitHub
                </Button>
              </>
            )}
        </div>

        <Container maxW={"960px"}>
          <HStack spacing={16}>
            <VStack>
              <Box fontSize={"4xl"} fontWeight={"black"}>
                Ready to put your GitHub to the test?
              </Box>
              <Box fontSize={"lg"}>
                GitOrNot makes it easy to find like-minded developers, make new friends or even find True Love™. Start
                by loggin in with your GitHub in the top right
              </Box>
            </VStack>
            <RepoCard
              repository={props.repos.sort((a, b) => b.stars - a.stars)[0]}
            />
          </HStack>
        </Container>
      </div>
    </>
  );
}
