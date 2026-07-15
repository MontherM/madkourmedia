/** @type {import('next').NextConfig} */

// The AI Academy lives in its own repo and deployment now. Old
// madkourmedia.com/academy/* URLs stay valid via permanent redirects.
const ACADEMY_URL = process.env.NEXT_PUBLIC_ACADEMY_URL ?? "https://academy.madkourmedia.com"

const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/academy",
        destination: ACADEMY_URL,
        permanent: true,
      },
      {
        source: "/academy/:path*",
        destination: `${ACADEMY_URL}/:path*`,
        permanent: true,
      },
    ]
  },
}

export default nextConfig
