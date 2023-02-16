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
            // !!!
        };
    },
};

module.exports = withExportImages(nextConfig);
