import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/voltura-x-mejalism";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  assetPrefix: isGitHubPages ? githubPagesBasePath : undefined,
  trailingSlash: isGitHubPages,
};

export default nextConfig;
