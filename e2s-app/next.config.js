/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: { webpack5: true },
  i18n
}

module.exports = nextConfig
