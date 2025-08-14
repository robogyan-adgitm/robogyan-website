import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // 1. Set the base path for GitHub Pages.
  // This MUST match your repository name.
  base: "robogyan-website/",

  // 2. We are REMOVING the `root` property to keep things simple.
  // This means Vite will run from your main project folder.

  // 3. Keep your aliases, they are correct.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client","src"), // Adjusted path
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
