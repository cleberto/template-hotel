/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera HTML estático em /out — pronto para Cloudflare Pages.
  output: 'export',
  trailingSlash: true,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
}

export default nextConfig
