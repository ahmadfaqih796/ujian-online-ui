module.exports = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["localhost", "lh3.googleusercontent.com"],
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_API,
    BASE_IMAGE_URL: process.env.NEXT_PUBLIC_BASE_IMAGE_URL,
    API_KEY: process.env.API_KEY,
    DOMAIN_URI_PROFIX: process.env.DOMAIN_URI_PROFIX,
    ANDROID: process.env.ANDROID,
    IOS: process.env.IOS,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/home",
        permanent: false,
      },
    ];
  },
};
