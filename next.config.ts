import type { NextConfig } from "next";

const isCloudflarePagesBuild = process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  output: isCloudflarePagesBuild ? "export" : undefined,
  trailingSlash: isCloudflarePagesBuild,
  typescript: {
    tsconfigPath: isCloudflarePagesBuild
      ? "tsconfig.pages.json"
      : "tsconfig.json",
  },
};

export default nextConfig;
