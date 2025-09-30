import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import viteReact from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tanstackStart(), netlify(), viteReact()],
});
