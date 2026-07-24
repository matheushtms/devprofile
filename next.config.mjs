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
  env: {
    // next/image não prefixa automaticamente o basePath quando unoptimized:true
    // (ver components que usam withBasePath em lib/utils.ts) — expor pra runtime do client.
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/devprofile" : "",
  },
}

export default nextConfig
