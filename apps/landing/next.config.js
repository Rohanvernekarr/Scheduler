/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/auth", "@repo/ui", "db"],

  async rewrites() {
    const portfolioUrl =
      process.env.PORTFOLIO_URL || "http://localhost:3002";

    return {
      beforeFiles: [
        // Production: rohan.schedulers.app → portfolio deployment
        // Dev:        rohan.localhost:3000  → localhost:3002
        {
          source: "/:path*",
          has: [{ type: "host", value: "rohan.schedulers.app" }],
          destination: `${portfolioUrl}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
