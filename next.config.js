/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
				source: "/api/:path*",
                destination: "http://3.36.126.180:8080/api/:path*",
			},
		];
	},
}

module.exports = nextConfig