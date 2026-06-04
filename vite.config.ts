import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      imagetools({
        defaultDirectives: (url) => {
          // Only auto-process images that opt-in with ?optimize
          if (url.searchParams.has("optimize")) {
            return new URLSearchParams({
              format: "avif;webp",
              quality: "72",
              as: "picture",
            });
          }
          return new URLSearchParams();
        },
      }),
    ],
  },
});
