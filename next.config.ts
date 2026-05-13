import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": [
        {
          condition: {
            query: /^\??(?:.*&)?url(?:&.*)?$/,
          },
          type: "asset",
        },
        {
          condition: {
            not: {
              query: /^\??(?:.*&)?url(?:&.*)?$/,
            },
          },
          loaders: [
            {
              loader: "@svgr/webpack",
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "*.js",
        },
      ],
      "*.{webm|mp4}": {
        as: "*.js",
        loaders: [],
      },
    },
  },
};

export default nextConfig;
