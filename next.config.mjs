/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  serverExternalPackages: [
    "better-auth",
    "better-auth/react",
    "@better-auth/core",
    "@better-auth/kysely-adapter",
    "kysely",
    "pg",
    "drizzle-orm",
    "@node-rs/argon2",
    "@node-rs/bcrypt",
  ],
}

export default nextConfig
