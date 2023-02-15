/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
				source: "/api/:path*",
                destination: "http://15.165.230.7:8080/api/:path*",
			},
		];
	},
}

module.exports = nextConfig