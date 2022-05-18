import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head} from '@inertiajs/inertia-react';
import {GetResponseDataTypeFromEndpointMethod} from "@octokit/types";
import {Octokit} from "@octokit/rest";

const octokit = new Octokit();
type Repo = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.get>

type User = {
    name: string;
    email: string;
}

type DashboardProps = {
    auth: User;
    repos: Repo[]
};

export default function Dashboard(props: DashboardProps) {
    return (
        <Authenticated
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">You're logged in!</div>
                        {props.repos.map(r => {
                            return <div>{r.name}</div>
                        })}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
