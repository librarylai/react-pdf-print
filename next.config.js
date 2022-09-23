/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/reactToPDF',
        permanent: true,
      },
    ]
  },
}
// redirect 相關參考資料 https://nextjs.org/docs/api-reference/next.config.js/redirects
// 例如：首頁直接跳轉到 reactToPDF 頁面
module.exports = nextConfig
