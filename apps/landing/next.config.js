/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/auth", "@repo/ui", "db"],
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://scheduler-9smh.onrender.com/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig;
