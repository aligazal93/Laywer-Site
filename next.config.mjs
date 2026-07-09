/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "admin.alilaw.ae",
            pathname: "/storage/**",
        }, ],
        formats: ["image/avif", "image/webp"],
        qualities: [60, 70, 75],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },
};

export default nextConfig;