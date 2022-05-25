import RepoCard from "@/Components/RepoCard";
import Authenticated from "@/Layouts/Authenticated";
import { Repository } from "@/Types";
import { Button, Container, Grid, Heading, Link, SimpleGrid, useCounter, VStack } from "@chakra-ui/react";
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

export default function Swipe(props: DashboardProps) {
  const counter = useCounter({
    min: 0,
    max: props.repos.length,
    defaultValue: 0,
    step: 1,
  });



  return (
    <Authenticated
      auth={props.auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Swipe</h2>}
    >
      <Head title="Swipe" />
      <RepoCard
        repository={props.repos[counter.valueAsNumber]}
        onAccept={() => {}}
        onReject={() => {}}
      />
    </Authenticated>
  );
}
