/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    domains: ['localhost', 'picsum.photos'], // <== Domain name
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/reactToPDF',
  //       permanent: true,
  //     },
  //   ]
  // },
}
// redirect 相關參考資料 https://nextjs.org/docs/api-reference/next.config.js/redirects
// 例如：首頁直接跳轉到 reactToPDF 頁面
module.exports = nextConfig
