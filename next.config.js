/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import nextMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import withPlugins from "next-compose-plugins";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  transpilePackages: ["ui", "utils", "database"],
  webpack: (config /* , { isServer } */) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // if (isServer) {
    //   config.plugins = [...config.plugins, new PrismaPlugin()];
    // }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default withPlugins(
  [
    // [withBundleAnalyzer({ enabled: !!process.env.ANALYZE })],
    // withPWA({
    //   dest: "public",
    //   disable: process.env.NODE_ENV === "development",
    // }),
    withMDX(config),
  ],
  // config,
);
