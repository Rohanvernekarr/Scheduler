/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/auth", "@repo/ui", "db"],
};

export default nextConfig;
