/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "lawyer.test-my-projects.com",
            pathname: "/storage/**",
        }, ],
        formats: ["image/avif", "image/webp"],
        qualities: [60, 70, 75],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },
};

export default nextConfig;