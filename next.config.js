// TODO: [0] const withExportImages = require('next-export-optimize-images');

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

module.exports = nextConfig; // <- [0] withExportImages(nextConfig);


/**
 * TODO: [0] There is some problem with builded+exported static build - links on images are currupted containing same path 2x like "/_next/static/chunks/images/_next/static/media/"
 */