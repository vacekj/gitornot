import RepoCard from "@/Components/RepoCard";
import Authenticated from "@/Layouts/Authenticated";
import { Repository } from "@/Types";
import {
  Button,
  Container,
  Grid,
  Heading,
  Link,
  List,
  ListItem,
  OrderedList,
  SimpleGrid,
  Table,
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

type User = {
  name: string;
  email: string;
};

type DashboardProps = {
  auth: User;
  repos: { repo: Repository; score: number; owner: User }[];
};

export default function Leaderboard(props: DashboardProps) {
  console.log(Object.values(props.repos));
  return (
    <Authenticated
      auth={props.auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leaderboard</h2>}
    >
      <Head title="Leaderboard" />
      <Heading as={"h1"}>Glboal Leaderboards</Heading>

      <TableContainer fontSize={"lg"}>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Place</Th>
              <Th>Repository</Th>
              <Th>Owner</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(props.repos).sort((a, b) => b.score - a.score).map((r, i) => {
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
    </Authenticated>
  );
}
