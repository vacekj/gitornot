import RepoCard from "@/Components/RepoCard";
import Authenticated from "@/Layouts/Authenticated";
import { Repository } from "@/Types";
import { useCounter } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

type User = {
  name: string;
  email: string;
  id: string;
};

type DashboardProps = {
  auth: User;
  repo: Repository;
};

export default function Swipe(props: DashboardProps) {
  return (
    <Authenticated
      auth={props.auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Swipe</h2>}
    >
      <Head title="Swipe" />
      <RepoCard
        repository={props.repo}
        onAccept={() => {
          Inertia.post("/swipe", {
            user_id: props.auth.id,
            repository_id: props.repo.id,
            value: 1,
          });
        }}
        onReject={() => {
          Inertia.post("/swipe", {
            user_id: props.auth.id,
            repository_id: props.repo.id,
            value: -1,
          });
        }}
      />
    </Authenticated>
  );
}
