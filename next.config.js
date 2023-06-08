// const nodeExternals = require('webpack-node-externals');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  reactStrictMode: false,
};

module.exports = {
  ...nextConfig,
  webpack: (config, { isServer }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // if (!isServer) {
    //   config.externals = [nodeExternals()];
    // }
    return config;
  },
};
