import RepoCard from "@/Components/RepoCard";
import Authenticated from "@/Layouts/Authenticated";
import { ExtendedRepo, RepositoriesResponse, Repository, Swipe, User } from "@/Types";
import {
  Button,
  Container,
  Grid,
  Heading,
  Link,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Link as InertiaLink } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";
import { Octokit } from "@octokit/rest";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import React from "react";

type DashboardProps = {
  auth: User;
  repos: Repository[];
  swipes: Swipe[];
  leaderboard: ExtendedRepo[];
};

export default function Dashboard(props: DashboardProps) {
  console.log(props.repos);
  return (
    <Authenticated
      auth={props.auth}
    >
      <Head title="Dashboard" />

        
      <Heading my={2} mt={6} as={"h4"} fontSize={"xl"}>Your best repositories</Heading>
      <TableContainer fontSize={"lg"} bg={"white"} p={4} rounded={"lg"}>
        <Table variant={"striped"}>
          <Thead>
            <Tr>
              <Th>Place</Th>
              <Th>Repository</Th>
              <Th>Owner</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(props.leaderboard).slice(0, 5).sort((a, b) => b.score - a.score).map((r, i) => {
              return (
                <Tr>
                  <Td>{i + 1}</Td>
                  <Td>
                    <Link href={r.repo.url}>{r.repo.name}</Link>
                  </Td>
                  <Td>{r.owner.name}</Td>
                  <Td>{r.score}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>


      <Heading my={2} mt={6} as={"h4"} fontSize={"xl"}>Your repositories</Heading>
      <Button my={3} colorScheme={"blue"} as={InertiaLink} method={"post"} href={"/refresh_repos"}>
        {props.repos.length === 0 ? "Load" : "Refresh"} Repositories
      </Button>
      <SimpleGrid minChildWidth={"240px"} spacing={4}>
        {props.repos.map(repo => {
          return <RepoCard repository={repo} />;
        })}
      </SimpleGrid>
    </Authenticated>
  );
}
