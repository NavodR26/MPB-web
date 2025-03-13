/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          dgram: false,
          dns: false,
          net: false,
          tls: false,
        };
      }
      return config;
    },
  };
  

  
  module.exports = nextConfig;
  

  // module.exports = {
  //   async headers() {
  //     return [
  //       {
  //         source: '/api/:path*',
  //         headers: [
  //           { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //           { key: 'Access-Control-Allow-Origin', value: '*' },
  //           { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
  //           { key: 'Access-Control-Allow-Headers', value: 'Authorization,Content-Type' },
  //         ],
  //       },
  //     ];
  //   },
  // };

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true, // Enforces React best practices
// //   swcMinify: true, // Uses SWC compiler for faster builds and minification
// //   images: {
// //     domains: [], // Add external image domains if needed
// //   },
// //   experimental: {
// //     appDir: true, // Enables Next.js App Router (if required)
// //   },
// //   webpack: (config) => {
// //     config.resolve.fallback = { net: false, tls: false, fs: false }; // Fixes server-side module issues
// //     return config;
// //   },
// // };

// // export default nextConfig;

// next.config.js : 
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
