export const proxy = {
  "/api/:path*": {
    target: process.env.BACKEND_URL || "https://rop-tracker.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/api": "/api" },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("Access-Control-Allow-Origin", "*");
      proxyReq.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      proxyReq.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    },
  },
};