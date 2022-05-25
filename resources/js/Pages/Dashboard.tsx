import RepoCard from "@/Components/RepoCard";
import Authenticated from "@/Layouts/Authenticated";
import { Repository } from "@/Types";
import { Button, Container, Grid, Heading, Link, SimpleGrid, VStack } from "@chakra-ui/react";
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
  repos: Repository[];
};

export default function Dashboard(props: DashboardProps) {
  console.log(props.repos);
  return (
    <Authenticated
      auth={props.auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <Heading as={"h1"}>Your repositories</Heading>
      <Button as={InertiaLink} method={"post"} href={"/refresh_repos"}>Refresh Repositories</Button>
      <SimpleGrid minChildWidth={"240px"} spacing={4}>
        {props.repos.map(repo => {
          return <RepoCard repository={repo} />;
        })}
      </SimpleGrid>
    </Authenticated>
  );
}
