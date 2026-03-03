/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/school-project",
  assetPrefix: "/school-project/",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
