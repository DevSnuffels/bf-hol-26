import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/bf-hol-26' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bf-hol-26/' : '',
};

export default nextConfig;
