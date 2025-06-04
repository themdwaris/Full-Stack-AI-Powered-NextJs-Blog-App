/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TELLME_API_KEY: process.env.TELLME_API_KEY,
      },
};

export default nextConfig;
