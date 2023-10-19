/** @type {import('next').NextConfig} */

module.exports = {
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            {
              key: "Access-Control-Allow-Origin",
              value: "https://expenso-server.vercel.app",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    },
    images: {
      domains: [
        "res.cloudinary.com",
        "cdn.pixabay.com",
        "vercel.app",
        "localhost",
      ],
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.node$/,
        use: 'file-loader',
      });
  
      if (isServer) {

      }
  
      return config;
    },
  };