// !!! const withExportImages = require('next-export-optimize-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            /*{
                protocol: 'https',
                hostname: 'www.gravatar.com',
                port: '',
                pathname: '/avatar/**',
            },*/
        ],
    },

    async exportPathMap() {
        return {
            '/': { page: '/' },
            '/about': { page: '/about' },
            '/partners': { page: '/partners' },
        };
    },
};

module.exports = nextConfig; // !!! withExportImages(nextConfig);
