/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@prajwolpakka/antd-extended"],
	async redirects() {
		return [
			{
				source: "/",
				destination: "/login",
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
