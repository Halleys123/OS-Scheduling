import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      utils: "/src/utils",
      components: "/src/components",
      logic: "/src/logic",
      layout: "/src/Layout",
      Context: "/src/Context",
      Providers: "/src/Providers",
      hooks: "/src/hooks",
    },
  },
});
