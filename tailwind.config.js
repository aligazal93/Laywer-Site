/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "15px",
        },
        screens: {
            sm: "540px",
            md: "767px",
            lg: "990px",
            xl: "1240px",
            "2xl": "1440px",
        },
        fontFamily: {
            sans: ["var(--font-ibm-plex-arabic)", "sans-serif"],
        },
        extend: {
            colors: {
                primary: "#071528",
                secondary: "#BA8632",
                blackGrey: "#5D6465",
                darkBorder: "#044446",
                errorColor: "#F04438",
                warningColor: "#F79009",
                greyColor: "#3E4A5E",
                borderColor: "#E4E7EC",
                highlightColor: "#BCD4FF",
                grey: "#5E6572"
            },
            fontSize: {
                custom10: "10px",
                custom12: "12px",
                custom14: "14px",
                custom18: "18px",
                custom16: "16px",
                custom20: "20px",
                custom24: "24px",
                custom26: "26px",
                custom28: "28px",
                custom30: "30px",
                custom32: "32px",
                custom36: "36px",
                custom40: "40px",
                custom44: "44px",
            },
            keyframes: {
                shimmer: {
                    '100%': {
                        transform: 'translateX(100%)'
                    }
                },
                softBounce: {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(10px)'
                    },
                },
                slideInLeft: {
                    '0%': {
                        transform: 'translateX(-100%)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        opacity: '1'
                    },
                },
                fadeInUp: {
                    '0%': {
                        transform: 'translateY(40px)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    },
                },
            },
            animation: {
                shimmer: "shimmer 1.5s infinite",
                slideInLeft: "slideInLeft 0.9s ease-out",
                fadeInUp: "fadeInUp 0.9s ease-out",
                softBounce: "softBounce 1.5s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};