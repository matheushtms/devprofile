const isGithubPages = process.env.GITHUB_PAGES === "true"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? "/devprofile" : "",
  assetPrefix: isGithubPages ? "/devprofile/" : "",
}

export default nextConfig
