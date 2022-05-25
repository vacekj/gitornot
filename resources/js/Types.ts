import { Octokit } from "@octokit/rest";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

const octokit = new Octokit();
export type Repository = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.get>;
