/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { dirs: ["./src"] },
  // nextでimageの最適化を行わない時はtrue
  // https://nextjs.org/docs/api-reference/next/image
  experimental: {
    images: {
      unoptimized: false,
    },
  },

  // consoleを削除する
  // https://nextjs.org/docs/advanced-features/compiler#remove-console
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    emotion: true,
  },
};

module.exports = nextConfig
