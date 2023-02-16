const withExportImages = require('next-export-optimize-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
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

module.exports = withExportImages(nextConfig);
