import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    outDir: "public",
  },
});
