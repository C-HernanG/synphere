/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@synphere/analytics",
    "@synphere/config",
    "@synphere/domain",
    "@synphere/ui"
  ]
};

export default nextConfig;
