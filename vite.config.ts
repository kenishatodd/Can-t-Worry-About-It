import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Shape of the context Workbox passes to runtime route matchers
type RouteMatch = {
  url: URL;
  request: { mode: string };
  sameOrigin: boolean;
};

// HTML navigations always try the network first so content never goes stale
const matchNavigation = ({ request }: RouteMatch) => request.mode === "navigate";

// Only same-origin hashed build assets get cached cache-first
const matchSameOriginAsset = ({ url, sameOrigin }: RouteMatch) =>
  sameOrigin && /\/assets\/.*\.(?:js|css|png|jpe?g|svg|webp|woff2?)$/.test(url.pathname);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      filename: "sw.js",
      manifest: false,
      devOptions: { enabled: false },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,webmanifest,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/~oauth/],
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: matchNavigation,
            handler: "NetworkFirst",
            options: {
              cacheName: "cwai-pages",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          {
            urlPattern: matchSameOriginAsset,
            handler: "CacheFirst",
            options: {
              cacheName: "cwai-assets",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
