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

export type User = {
  name: string;
  email: string;
  id: number;
};

export type Swipe = {
  id: number;
  user_id: number;
  repository_id: number;
  value: -1 | 1;
};

export type ExtendedRepo = { repo: Repository; score: number; owner: User };

export type RepositoriesResponse = ExtendedRepo[];
