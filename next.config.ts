/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://SPARK-backend.vercel.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
