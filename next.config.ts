import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.danielcj.com",
        port: "",
        pathname: "/**",
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
      "*.mp4": {
        type: "asset",
      },
      "*.webm": {
        type: "asset",
      },
    },
  },
};

export default nextConfig;
