import { Octokit } from "@octokit/rest";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

const octokit = new Octokit();
export type Repository = {
  id: number;
  user_id: number;
  url: string;
  description?: string;
  stars: number;
  forks: number;
  name: string;
  created_at: string;
};
