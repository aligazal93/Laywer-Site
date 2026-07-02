/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "lawyer.test-my-projects.com",
        }, ],
    },
};

export default nextConfig;